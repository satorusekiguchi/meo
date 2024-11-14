import Link from "next/link";
import { ArrowRight, Star, BarChart, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            MEO Survey System
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600"
                >
                  機能
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="text-gray-600 hover:text-blue-600"
                >
                  メリット
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-600 hover:text-blue-600">
                  デモ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-6">
              カスタマーの声を、ビジネスの成長へ
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              AIが生成する最適化されたレビューで、あなたのビジネスのオンライン評価を向上させます。
            </p>
            <Link
              href="#demo"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              無料でデモを試す
            </Link>
          </div>
        </section>

        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">主な機能</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Star className="w-12 h-12 text-yellow-500" />}
                title="カスタマイズ可能なアンケート"
                description="あなたのビジネスに合わせて、質問内容やデザインを自由にカスタマイズできます。"
              />
              <FeatureCard
                icon={<BarChart className="w-12 h-12 text-blue-500" />}
                title="リアルタイム分析"
                description="収集したデータをリアルタイムで分析し、ビジネスインサイトを提供します。"
              />
              <FeatureCard
                icon={<MessageCircle className="w-12 h-12 text-green-500" />}
                title="AI生成レビュー"
                description="アンケート結果を基に、AIが最適化されたレビューを自動生成します。"
              />
            </div>
          </div>
        </section>

        <section id="benefits" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              MEO Survey Systemのメリット
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <BenefitCard
                title="オンライン評価の向上"
                description="AIが生成する最適化されたレビューにより、ビジネスのオンライン評価が向上します。"
              />
              <BenefitCard
                title="顧客満足度の把握"
                description="リアルタイムのフィードバック分析で、顧客満足度を正確に把握できます。"
              />
              <BenefitCard
                title="効率的なマーケティング"
                description="顧客の声を活用し、より効果的なマーケティング戦略を立てられます。"
              />
              <BenefitCard
                title="ビジネス改善の機会"
                description="詳細な分析結果を基に、ビジネスの改善点を明確に特定できます。"
              />
            </div>
          </div>
        </section>

        <section id="demo" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">デモを試す</h2>
            <p className="text-xl text-gray-600 mb-8">
              以下のサンプルビジネスから選んで、MEO Survey
              Systemの機能を体験してください。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <DemoLink href="/client-01" className="bg-blue-600">
                和食レストラン
              </DemoLink>
              <DemoLink href="/client-02" className="bg-green-600">
                ビューティーサロン
              </DemoLink>
              <DemoLink href="/client-03" className="bg-purple-600">
                ファッションストア
              </DemoLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">MEO Survey System</h3>
              <p className="text-gray-400">カスタマーの声をビジネスの成長へ</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">お問い合わせ</h4>
              <p className="text-gray-400">support@meosurvey.com</p>
              <p className="text-gray-400">03-1234-5678</p>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-2">フォローする</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 MEO Survey System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function DemoLink({
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
      className={`inline-flex items-center text-white px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition duration-300 ${className}`}
    >
      {children}
      <ArrowRight className="ml-2 w-5 h-5" />
    </Link>
  );
}
