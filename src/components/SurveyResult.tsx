'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react';

interface SurveyResultProps {
generatedReview: string;
}

const SurveyResult: React.FC<SurveyResultProps> = ({ generatedReview }) => {
const [isCopied, setIsCopied] = useState(false);

const showToast = (message: string) => {
alert(message);
};

const reviewUrls = {
google: 'https://g.page/r/YOUR_GOOGLE_REVIEW_ID/review',
tabelog: 'https://tabelog.com/YOUR_RESTAURANT_ID/review/',
gurunavi: 'https://www.gnavi.co.jp/YOUR_RESTAURANT_ID/review/',
hotpepper: 'https://beauty.hotpepper.jp/CSP/bt/reserve/review/BCSTOP/YOUR_SALON_ID/'
};

const socialUrls = {
instagram: 'https://www.instagram.com/YOUR_INSTAGRAM_HANDLE/',
line: 'https://line.me/R/ti/p/@YOUR_LINE_ID'
};

const copyToClipboard = async () => {
try {
await navigator.clipboard.writeText(generatedReview);
setIsCopied(true);
showToast("レビューがクリップボードにコピーされました。");
setTimeout(() => setIsCopied(false), 2000);
} catch (err) {
console.error('Failed to copy text: ', err);
showToast("コピーに失敗しました。もう一度お試しください。");
}
};

const copyAndRedirect = (url: string) => async () => {
await copyToClipboard();
window.open(url, '_blank', 'noopener,noreferrer');
};

return (
<Card className="w-full max-w-2xl mx-auto mt-8">
<CardHeader>
<CardTitle className="text-2xl font-bold text-center">ありがとうございました！</CardTitle>
</CardHeader>
<CardContent>
<p className="mb-4">あなたの回答から生成されたレビューです：</p>
<p className="text-lg bg-muted p-4 rounded-md mb-4">{generatedReview}</p>
<div className="space-y-4">
<Button onClick={copyToClipboard} className="w-full">
<Copy className="mr-2 h-4 w-4" />
{isCopied ? 'コピーしました！' : 'レビューをコピー'}
</Button>
<div className="grid grid-cols-2 gap-2">
<Button onClick={copyAndRedirect(reviewUrls.google)} className="w-full">
<ExternalLink className="mr-2 h-4 w-4" />
Googleに投稿
</Button>
<Button onClick={copyAndRedirect(reviewUrls.tabelog)} className="w-full">
<ExternalLink className="mr-2 h-4 w-4" />
食べログに投稿
</Button>
<Button onClick={copyAndRedirect(reviewUrls.gurunavi)} className="w-full">
<ExternalLink className="mr-2 h-4 w-4" />
ぐるなびに投稿
</Button>
<Button onClick={copyAndRedirect(reviewUrls.hotpepper)} className="w-full">
<ExternalLink className="mr-2 h-4 w-4" />
ホットペッパーに投稿
</Button>
</div>
</div>
<div className="mt-6">
<p className="text-center font-semibold mb-2">Follow Me!</p>
<div className="flex justify-center space-x-4">
<Link href={socialUrls.instagram} target="_blank" rel="noopener noreferrer">
<Button 
className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
>
Instagram
</Button>
</Link>
<Link href={socialUrls.line} target="_blank" rel="noopener noreferrer">
<Button 
className="bg-[#00B900] hover:bg-[#00A000] text-white"
>
LINE
</Button>
</Link>
</div>
</div>
<p className="text-sm text-muted-foreground mt-4">
※ 各ボタンをクリックすると、レビューがコピーされ、該当のレビューページが新しいタブで開きます。
</p>
</CardContent>
<CardFooter>
<Link href="/">
<Button variant="outline">
<ArrowLeft className="mr-2 h-4 w-4" />
新しいアンケートを開始
</Button>
</Link>
</CardFooter>
</Card>
)
}

export default SurveyResult;