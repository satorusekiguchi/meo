"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, Check } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

interface SurveyResultProps {
  generatedReview: string;
}

export default function SurveyResult({ generatedReview }: SurveyResultProps) {
  console.log("SurveyResult rendering with review:", generatedReview);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const reviewUrls = {
    google: "https://g.page/r/YOUR_GOOGLE_REVIEW_ID/review",
    tabelog: "https://tabelog.com/YOUR_RESTAURANT_ID/review/",
    gurunavi: "https://www.gnavi.co.jp/YOUR_RESTAURANT_ID/review/",
    hotpepper:
      "https://beauty.hotpepper.jp/CSP/bt/reserve/review/BCSTOP/YOUR_SALON_ID/",
  };

  const socialUrls = {
    instagram: "https://www.instagram.com/YOUR_INSTAGRAM_HANDLE/",
    line: "https://line.me/R/ti/p/@YOUR_LINE_ID",
    x: "https://twitter.com/YOUR_TWITTER_HANDLE",
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
      console.error("Failed to copy text: ", err);
      toast({
        title: "コピー失敗",
        description: "コピーに失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    }
  };

  const copyAndRedirect = (url: string) => async () => {
    await copyToClipboard();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="min-h-screen flex items-start justify-center sm:px-6">
        <div className="w-full max-w-2xl mx-auto py-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                ありがとうございました&#x1f647;
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-3xl font-semibold mb-3">
                  あなたの回答から生成されたレビューです&#x1f4ac;
                </h3>
                <div className="bg-gray-100 p-5 rounded-md shadow-inner">
                  <p className="text-lg leading-relaxed">
                    {generatedReview || "レビューがまだ生成されていません。"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <Button
                  onClick={copyToClipboard}
                  className="w-full transition-all duration-200 ease-in-out text-lg"
                  variant={isCopied ? "outline" : "default"}
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      コピーしました！
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-5 w-5" />
                      レビューをコピー
                    </>
                  )}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={copyAndRedirect(reviewUrls.google)}
                    className="w-full text-sm"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Googleに投稿
                  </Button>
                  <Button
                    onClick={copyAndRedirect(reviewUrls.tabelog)}
                    className="w-full text-sm"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    食べログに投稿
                  </Button>
                  <Button
                    onClick={copyAndRedirect(reviewUrls.gurunavi)}
                    className="w-full text-sm"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    ぐるなびに投稿
                  </Button>
                  <Button
                    onClick={copyAndRedirect(reviewUrls.hotpepper)}
                    className="w-full text-sm"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    ホットペッパーに投稿
                  </Button>
                </div>
              </div>
              <div className="w-full mx-auto aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/common/postcss.svg"
                  alt="クーポン"
                  width={450}
                  height={450}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-center font-semibold mb-2">
                  フォローしてください！
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href={socialUrls.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg">
                      Instagram
                    </Button>
                  </Link>
                  <Link
                    href={socialUrls.line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-[#00B900] hover:bg-[#00A000] text-white text-lg">
                      LINE
                    </Button>
                  </Link>
                  <Link
                    href={socialUrls.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-black hover:bg-gray-800 text-white text-lg">
                      X
                    </Button>
                  </Link>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                ※
                このレビューはAIによって生成されています。内容の正確性や適切性については、ご自身でご確認ください。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  );
}
