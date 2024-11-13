import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import OpenAI from 'openai';

interface EnvironmentVariables {
GOOGLE_PRIVATE_KEY: string;
GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
GOOGLE_SHEET_ID: string;
OPENAI_API_KEY: string;
}

function validateEnvironmentVariables(): EnvironmentVariables {
const variables: EnvironmentVariables = {
GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.trim() || '',
GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || '',
GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID?.trim() || '',
OPENAI_API_KEY: process.env.OPENAI_API_KEY?.trim() || '',
};
// ... 残りのコードは変更なし
return variables;
}


export async function POST(req: Request) {
console.log('API route started');
try {
const { answers } = await req.json();
console.log('Received answers:', answers);

if (!answers || !Array.isArray(answers) || answers.length !== 5) {
console.error('Invalid answers format');
return NextResponse.json({ success: false, error: '無効な回答フォーマット' }, { status: 400 });
}

const review = await generateReview(answers);
await saveToGoogleSheet(answers, review);

console.log('Review generated and saved successfully');
return NextResponse.json({ success: true, review });
} catch (error) {
console.error('Error in API route:', error);
return NextResponse.json({
success: false,
error: '内部サーバーエラー',
details: error instanceof Error ? error.message : '不明なエラー',
}, { status: 500 });
}
}

async function generateReview(answers: string[]): Promise<string> {
console.log('Generating review...');
const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

try {
const response = await openai.chat.completions.create({
model: 'gpt-3.5-turbo',
messages: [
{ role: 'system', content: 'あなたは顧客の声を自然な口コミに変換する専門家です。' },
{ role: 'user', content: `以下のエンゲージメントアンケート結果から、自然な口コミを生成してください：\n\n${answers.join('\n')}` },
],
max_tokens: 200,
temperature: 0.7,
});

console.log('Review generated successfully');
return response.choices[0].message?.content?.trim() || '';
} catch (error) {
console.error('OpenAI APIでのレビュー生成中にエラーが発生しました:', error);
throw new Error('OpenAI APIを使用したレビューの生成に失敗しました: ' + (error instanceof Error ? error.message : '不明なエラー'));
}
}

async function saveToGoogleSheet(answers: string[], review: string): Promise<void> {
console.log('Saving to Google Sheet...');
try {
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const jwt = new JWT({
email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
key: privateKey,
scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, jwt);
await doc.loadInfo();
console.log('スプレッドシート情報が読み込まれました。');

let sheet = doc.sheetsByIndex[0];
if (!sheet) {
console.log('シートが見つかりません。新しいシートを作成します。');
sheet = await doc.addSheet({ title: 'アンケート回答' });
}
console.log('シートにアクセスしました。');

const newRow = {
'日時': new Date().toLocaleString('ja-JP'),
'満足度': answers[0],
'スタッフの対応': answers[1],
'清潔さ': answers[2],
'総合評価': answers[3],
'再利用意向': answers[4],
'生成されたレビュー': review,
};

await sheet.addRow(newRow);
console.log('Data saved to Google Sheet successfully');
} catch (error) {
console.error('Error saving to Google Sheet:', error);
throw new Error('Google シートへの保存に失敗しました');
}
}