"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, Check } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { ClientConfig } from "@/config/types";

interface SurveyResultProps {
  generatedReview: string | null;
  clientConfig: ClientConfig;
}

export default function SurveyResult({
  generatedReview,
  clientConfig,
}: SurveyResultProps) {
  console.log("SurveyResult rendering with review:", generatedReview);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedReview || "");
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

  const { couponImage, socialUrls, reviewUrls, customReviewUrls } =
    clientConfig;

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
                    {generatedReview
                      ? generatedReview
                      : "レビューがまだ生成されていません。"}
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
                  {Object.entries(reviewUrls).map(([key, { url, show }]) =>
                    show ? (
                      <Button
                        key={key}
                        onClick={copyAndRedirect(url)}
                        className="w-full text-sm"
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        {getReviewSiteLabel(key)}
                      </Button>
                    ) : null
                  )}
                  {customReviewUrls &&
                    customReviewUrls.map((custom, index) => (
                      <Button
                        key={`custom-${index}`}
                        onClick={copyAndRedirect(custom.url)}
                        className="w-full text-sm"
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        {custom.label}
                      </Button>
                    ))}
                </div>
              </div>
              <div className="w-full mx-auto aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={couponImage.url}
                  alt={couponImage.alt}
                  width={couponImage.width}
                  height={couponImage.height}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-center font-semibold mb-2">
                  フォローしてください！
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(socialUrls).map(([key, { url, show }]) =>
                    show ? (
                      <Link
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          className={`w-full ${getSocialButtonStyle(
                            key
                          )} text-lg`}
                        >
                          {getSocialLabel(key)}
                        </Button>
                      </Link>
                    ) : null
                  )}
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
function getReviewSiteLabel(key: string): string {
  const labels: { [key: string]: string } = {
    google: "Googleに投稿",
    tabelog: "食べログに投稿",
    gurunavi: "ぐるなびに投稿",
    hotpepper: "ホットペッパーに投稿",
    // カスタムサイトの場合はデフォルトでキーを使用
  };
  return labels[key] || `${key}に投稿`;
}

function getSocialLabel(key: string): string {
  const labels: { [key: string]: string } = {
    instagram: "Instagram",
    line: "LINE",
    x: "X",
  };
  return labels[key] || key;
}

function getSocialButtonStyle(key: string): string {
  const styles: { [key: string]: string } = {
    instagram:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    line: "bg-[#00B900] hover:bg-[#00A000] text-white",
    x: "bg-black hover:bg-gray-800 text-white",
  };
  return styles[key] || "bg-gray-300";
}
