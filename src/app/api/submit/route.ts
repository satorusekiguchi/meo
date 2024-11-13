import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import OpenAI from 'openai';

// 環境変数の型定義
type EnvironmentVariables = {
GOOGLE_PRIVATE_KEY: string;
GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
GOOGLE_SHEET_ID: string;
OPENAI_API_KEY: string;
};

// 環境変数の検証
function validateEnvironmentVariables(): EnvironmentVariables {
const variables: EnvironmentVariables = {
GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY || '',
GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID || '',
OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
};

Object.entries(variables).forEach(([key, value]) => {
if (!value) {
console.error(`環境変数 ${key} が設定されていません。`);
throw new Error(`環境変数 ${key} が設定されていません。`);
}
console.log(`${key} is present with length: ${value.length}`);
});

return variables;
}

let env: EnvironmentVariables;
try {
env = validateEnvironmentVariables();
console.log('環境変数の検証が完了しました。');
} catch (error) {
console.error('環境変数の検証に失敗しました:', error);
throw error;
}

const openai = new OpenAI({
apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
console.log('POST リクエストを受信しました。');
try {
const { answers } = await req.json();
console.log('受信した回答:', answers);

if (!answers || !Array.isArray(answers) || answers.length !== 5) {
console.error('無効な回答フォーマット');
return NextResponse.json({ success: false, error: '無効な回答フォーマット' }, { status: 400 });
}

const review = await generateReview(answers);
await saveToGoogleSheet(answers, review);

return NextResponse.json({ success: true, review });
} catch (error) {
console.error('リクエスト処理中にエラーが発生しました:', error);
return NextResponse.json(
{
success: false,
error: '内部サーバーエラー',
details: error instanceof Error ? error.message : '不明なエラー',
},
{ status: 500 }
);
}
}

async function generateReview(answers: string[]): Promise<string> {
console.log('レビューを生成中...');
try {
const prompt = `以下のエンゲージメントアンケート結果から、自然な口コミを生成してください：\n\n${answers.join('\n')}`;

const response = await openai.chat.completions.create({
model: 'gpt-3.5-turbo',
messages: [
{ role: 'system', content: 'あなたは顧客の声を自然な口コミに変換する専門家です。' },
{ role: 'user', content: prompt },
],
max_tokens: 200,
temperature: 0.7,
});

console.log('レビューが正常に生成されました。');
return response.choices[0].message?.content?.trim() || '';
} catch (error) {
console.error('レビュー生成中にエラーが発生しました:', error);
throw new Error(
'レビューの生成に失敗しました: ' + (error instanceof Error ? error.message : '不明なエラー')
);
}
}

async function saveToGoogleSheet(answers: string[], review: string): Promise<void> {
console.log('Google シートに保存中...');
try {
const privateKey = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
console.log('秘密鍵の長さ:', privateKey.length);

const jwt = new JWT({
email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
key: privateKey,
scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log('JWT が正常に作成されました。');

const doc = new GoogleSpreadsheet(env.GOOGLE_SHEET_ID, jwt);
console.log('GoogleSpreadsheet インスタンスが作成されました。');

await doc.loadInfo();
console.log('スプレッドシート情報が読み込まれました。');

const sheet = doc.sheetsByIndex[0];
console.log('シートにアクセスしました。');

// ヘッダー行の設定
const headers = [
'日時',
'満足度',
'スタッフの対応',
'清潔さ',
'総合評価',
'再利用意向',
'生成されたレビュー',
];

// ヘッダー行を無条件に設定
await sheet.setHeaderRow(headers);
console.log('ヘッダー行を設定しました。');

// データの作成
const newRowData = {
'日時': new Date().toLocaleString('ja-JP'),
'満足度': answers[0],
'スタッフの対応': answers[1],
'清潔さ': answers[2],
'総合評価': answers[3],
'再利用意向': answers[4],
'生成されたレビュー': review,
};

// 行を追加
await sheet.addRow(newRowData);
console.log('行が正常に追加されました。');

console.log('Google シートへの保存が完了しました。');
} catch (error) {
console.error('Google シートへの保存中にエラーが発生しました:', error);
if (error instanceof Error && 'response' in error) {
console.error(
'エラーレスポンス:',
JSON.stringify((error as { response?: { data: unknown } }).response?.data, null, 2)
);
} else {
console.error('エラーの詳細:', error);
}
throw new Error(
'Google シートへの保存に失敗しました: ' + (error instanceof Error ? error.message : '不明なエラー')
);
}
}
