import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "エンゲージメントMEO - 顧客体験から口コミを自然発生",
  description:
    "エンゲージメントMEOは、Googleマップ上でのビジネスの存在感を飛躍的に高め、実際の顧客エンゲージメントへとつなげるAI駆動型プラットフォームです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
