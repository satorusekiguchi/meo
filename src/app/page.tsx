import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          MEO Survey System
        </h1>
        <p className="text-xl text-center mb-12">
          効果的なカスタマーフィードバックを収集し、ビジネスの成長を加速させます。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="簡単な設定"
            description="数分で顧客満足度調査を立ち上げ、すぐにフィードバックの収集を開始できます。"
          />
          <FeatureCard
            title="カスタマイズ可能"
            description="あなたのブランドに合わせて、質問やデザインをカスタマイズできます。"
          />
          <FeatureCard
            title="AIレビュー生成"
            description="収集したデータを基に、AIが自動的に最適化されたレビューを生成します。"
          />
        </div>
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">デモを試す</h2>
          <nav className="space-x-4">
            <ClientLink
              href="/client-01"
              className="bg-blue-500 hover:bg-blue-600"
            >
              クライアント1
            </ClientLink>
            <ClientLink
              href="/client-02"
              className="bg-green-500 hover:bg-green-600"
            >
              クライアント2
            </ClientLink>
            <ClientLink
              href="/client-03"
              className="bg-purple-500 hover:bg-purple-600"
            >
              クライアント3
            </ClientLink>
          </nav>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ClientLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-block text-white px-6 py-2 rounded-lg transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
