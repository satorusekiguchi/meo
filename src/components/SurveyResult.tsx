'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, ExternalLink, Check } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import Image from 'next/image'

interface SurveyResultProps {
generatedReview: string;
}

export default function SurveyResult({ generatedReview }: SurveyResultProps) {
const [isCopied, setIsCopied] = useState(false);
const { toast } = useToast();

const reviewUrls = {
google: 'https://g.page/r/YOUR_GOOGLE_REVIEW_ID/review',
tabelog: 'https://tabelog.com/YOUR_RESTAURANT_ID/review/',
gurunavi: 'https://www.gnavi.co.jp/YOUR_RESTAURANT_ID/review/',
hotpepper: 'https://beauty.hotpepper.jp/CSP/bt/reserve/review/BCSTOP/YOUR_SALON_ID/'
};

const socialUrls = {
instagram: 'https://www.instagram.com/YOUR_INSTAGRAM_HANDLE/',
line: 'https://line.me/R/ti/p/@YOUR_LINE_ID',
x: 'https://twitter.com/YOUR_TWITTER_HANDLE'
};

const copyToClipboard = async () => {
try {
await navigator.clipboard.writeText(generatedReview);
setIsCopied(true);
toast({
title: "コピー成功",
description: "レビューがクリップボードにコピーされました。",
});
setTimeout(() => setIsCopied(false), 2000);
} catch (err) {
console.error('Failed to copy text: ', err);
toast({
title: "コピー失敗",
description: "コピーに失敗しました。もう一度お試しください。",
variant: "destructive",
});
}
};

const copyAndRedirect = (url: string) => async () => {
await copyToClipboard();
window.open(url, '_blank', 'noopener,noreferrer');
};

return (
<>
<div className="container mx-auto px-4 py-8">
<Card className="w-full max-w-2xl mx-auto">
<CardHeader>
<CardTitle className="text-2xl font-bold text-center">ありがとうございました！</CardTitle>
</CardHeader>
<CardContent className="space-y-6">
<div>
<h3 className="text-lg font-semibold mb-2">あなたの回答から生成されたレビューです</h3>
<div className="bg-muted p-4 rounded-md shadow-inner">
<p className="text-lg">{generatedReview}</p>
</div>
</div>
<div className="space-y-4">
<Button 
onClick={copyToClipboard} 
className="w-full transition-all duration-200 ease-in-out"
variant={isCopied ? "outline" : "default"}
>
{isCopied ? (
<>
<Check className="mr-2 h-4 w-4" />
コピーしました！
</>
) : (
<>
<Copy className="mr-2 h-4 w-4" />
レビューをコピー
</>
)}
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
<div className="w-full max-w-[450px] mx-auto aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md">
<Image
src="/images/common/postcss.svg"
alt="クーポン"
width={450}
height={450}
className="object-contain w-full h-full"
/>
</div>
<div className="mt-6">
<h3 className="text-center font-semibold mb-2">Follow Me!</h3>
<div className="grid grid-cols-3 gap-2">
<Link href={socialUrls.instagram} target="_blank" rel="noopener noreferrer" className="w-full">
<Button 
className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
>
Instagram
</Button>
</Link>
<Link href={socialUrls.line} target="_blank" rel="noopener noreferrer" className="w-full">
<Button 
className="w-full bg-[#00B900] hover:bg-[#00A000] text-white"
>
LINE
</Button>
</Link>
<Link href={socialUrls.x} target="_blank" rel="noopener noreferrer" className="w-full">
<Button 
className="w-full bg-black hover:bg-gray-800 text-white"
>
X
</Button>
</Link>
</div>
</div>
<p className="text-xs text-muted-foreground mt-4 text-center">
※ このレビューはAIによって生成されています。内容の正確性や適切性については、ご自身でご確認ください。
</p>
</CardContent>
</Card>
</div>
<Toaster />
</>
)
}