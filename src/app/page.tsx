"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  BarChart,
  MessageCircle,
  Users,
  TrendingUp,
  Search,
  MapPin,
  Gift,
  ThumbsUp,
  Globe,
  ShieldCheck,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Head from "next/head";

function useSmooth() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

export default function Component() {
  useSmooth();

  return (
    <>
      <Head>
        <title>エンゲージメントMEO - 新たな顧客との絆</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 text-sm">
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-indigo-600">
                エンゲージメントMEO
              </h1>
            </div>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <a
                    href="#features"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    機能
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    メリット
                  </a>
                </li>
                <li>
                  <a
                    href="#unique-features"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    特徴
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    仕組み
                  </a>
                </li>
                <li>
                  <a
                    href="#case-studies"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    事例
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    デモ
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-700 hover:text-indigo-600 transition duration-300"
                  >
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="text-sm">
          {/* ヒーローセクション */}
          <section className="py-20 text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
            <div className="max-w-[1400px] mx-auto px-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                地図から始まる、新たな顧客との絆
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                エンゲージメントMEOは、Googleマップ上でのビジネスの存在感を飛躍的に高め、実際の顧客エンゲージメントへとつなげるAI駆動型プラットフォームです。質の高い口コミを増やし、ローカルSEOを最適化します。
              </p>
              <a
                href="#demo"
                className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 inline-flex items-center"
              >
                無料デモを体験
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </section>

          {/* 主な機能セクション */}
          <section id="features" className="py-16 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                主な機能
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Star className="w-12 h-12 text-yellow-500" />}
                  title="AIレビュー最適化"
                  description="AIがアンケート結果を解析し、最適なレビューを自動生成します。キーワードを自然に組み込み、ビジネスの強みを際立たせる文章で、Googleマップ上での評価向上に大きく貢献します。"
                />
                <FeatureCard
                  icon={<BarChart className="w-12 h-12 text-blue-500" />}
                  title="リアルタイムMEO分析"
                  description="Googleマップ上でのビジネスパフォーマンスをリアルタイムで分析。競合他社との比較や改善ポイントを一目で確認でき、検索順位、クリック率、顧客行動など詳細なデータを提供します。"
                />
                <FeatureCard
                  icon={<MessageCircle className="w-12 h-12 text-green-500" />}
                  title="カスタマーエンゲージメント"
                  description="顧客とのコミュニケーションを一元管理し、レビューへの返信やフォローアップを効率化。AIによる返信提案機能で、迅速かつ的確な対応をサポートします。"
                />
                <FeatureCard
                  icon={<ShieldCheck className="w-12 h-12 text-indigo-500" />}
                  title="データセキュリティ"
                  description="高度な暗号化技術と多層防御システムで、顧客情報とビジネスデータを強固に保護。GDPRに準拠したデータ管理で、プライバシーを最優先に考えます。"
                />
                <FeatureCard
                  icon={<Globe className="w-12 h-12 text-purple-500" />}
                  title="多言語サポート"
                  description="多言語対応で、グローバルな顧客層へアプローチ。各言語のネイティブスピーカーによる校正で、自然で魅力的なレビューを生成します。"
                />
                <FeatureCard
                  icon={<TrendingUp className="w-12 h-12 text-pink-500" />}
                  title="マーケティング統合"
                  description="Google広告やMeta広告など主要なマーケティングプラットフォームと連携。MEOの効果を他のマーケティング活動と組み合わせ、総合的な集客戦略を実現します。"
                />
              </div>
            </div>
          </section>

          {/* メリットセクション */}
          <section
            id="benefits"
            className="py-16 bg-gradient-to-r from-indigo-100 to-blue-100"
          >
            <div className="max-w-[1400px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                エンゲージメントMEOのメリット
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <BenefitCard
                  icon={<TrendingUp className="w-8 h-8 text-indigo-600" />}
                  title="ローカルSEOの向上"
                  description="Googleマップでの表示順位を上昇させ、より多くの潜在顧客にアプローチ。地域検索で上位表示されることで、実店舗への来店数も増加します。"
                />
                <BenefitCard
                  icon={<Users className="w-8 h-8 text-indigo-600" />}
                  title="顧客満足度の向上"
                  description="顧客の声に素早く対応し、満足度と信頼性を向上。ポジティブな口コミの増加で、新規顧客の獲得にもつながります。"
                />
                <BenefitCard
                  icon={<Search className="w-8 h-8 text-indigo-600" />}
                  title="オンライン視認性の増加"
                  description="最適化されたビジネスプロフィールで、検索結果での露出を拡大。写真、営業時間、サービス内容など詳細な情報を効果的に表示し、クリック率を向上させます。"
                />
                <BenefitCard
                  icon={<BarChart className="w-8 h-8 text-indigo-600" />}
                  title="データ駆動型の意思決定"
                  description="詳細な分析データを活用し、効果的なビジネス戦略を策定。顧客の行動パターンや嗜好を把握し、サービス改善やマーケティング施策に反映できます。"
                />
              </div>
            </div>
          </section>

          {/* 特徴セクション */}
          <section id="unique-features" className="py-16 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                エンゲージメントMEOの特徴
              </h2>
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-8 shadow-lg text-white">
                <div className="flex items-start mb-6">
                  <ThumbsUp className="w-12 h-12 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      順位測定を超えた、本質的なアプローチ
                    </h3>
                    <p>
                      他社のMEOツールは単に順位を測定するだけで、肝心な「なぜ順位が変動したのか？」を解明することが難しいです。
                      エンゲージメントMEOは、順位測定ではなく、順位上昇に不可欠な「自然な口コミ」の獲得に焦点を当てたMEOツールです。
                      私たちは、真の顧客満足度を高め、自然にポジティブな口コミが生まれる環境を創出することに力を入れています。
                    </p>
                  </div>
                </div>
                <div className="pl-16">
                  <h4 className="text-lg font-semibold mb-2">独自アプローチ</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      AIによる高度な感情分析で、顧客フィードバックを詳細に解析
                    </li>
                    <li>
                      ビジネスの特性に合わせた、カスタマイズ可能なレビュー・テンプレート
                    </li>
                    <li>
                      顧客の行動パターンを基に、最適なタイミングでのレビュー依頼を実施
                    </li>
                    <li>競合分析機能で、差別化戦略の立案をサポート</li>
                    <li>地域特性を考慮した、ローカライズされたSEO戦略を提案</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 仕組みセクション */}
          <section
            id="how-it-works"
            className="py-16 bg-gradient-to-r from-indigo-100 to-blue-100"
          >
            <div className="max-w-[1400px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                エンゲージメントMEOの仕組み
              </h2>
              <div className="max-w-3xl mx-auto">
                <ol className="relative border-l border-indigo-300">
                  <TimelineItem
                    number="1"
                    title="顧客アンケートの実施"
                    description="カスタマイズ可能なアンケートで、顧客から詳細なフィードバックを収集。QRコードやメールなど複数の回答方法を提供し、回答率を最大化します。"
                    icon={<MessageCircle className="w-6 h-6 text-white" />}
                  />
                  <TimelineItem
                    number="2"
                    title="AIによるレビュー生成"
                    description="収集したデータを基に、AIが最適なレビューを自動生成。自然言語処理技術で、顧客の声を忠実に反映しつつ、SEOに効果的な文章を作成します。"
                    icon={<Star className="w-6 h-6 text-white" />}
                  />
                  <TimelineItem
                    number="3"
                    title="クーポン発行"
                    description="顧客の満足度に応じて、パーソナライズされたクーポンを自動発行。リピート率向上と新規顧客獲得の両方に効果的なインセンティブを提供します。"
                    icon={<Gift className="w-6 h-6 text-white" />}
                  />
                  <TimelineItem
                    number="4"
                    title="Googleマップへの反映"
                    description="生成されたレビューを顧客の承認を得てGoogleマップに投稿。投稿のタイミングも最適化し、最大の効果を得られるようにします。"
                    icon={<MapPin className="w-6 h-6 text-white" />}
                  />
                  <TimelineItem
                    number="5"
                    title="継続的な分析と最適化"
                    description="パフォーマンスを常時監視し、AIが戦略を継続的に最適化。競合分析、キーワードトレンド、顧客行動の変化を考慮し、最新のMEO戦略を提案します。"
                    icon={<BarChart className="w-6 h-6 text-white" />}
                  />
                </ol>
              </div>
            </div>
          </section>

          {/* 事例セクション */}
          <section id="case-studies" className="py-16 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                成功事例
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <CaseStudyCard
                  title="地域密着型レストラン"
                  description="エンゲージメントMEO導入から3ヶ月で、Googleマップでの表示回数が200%増加。来店客数が30%アップし、売上が大幅に改善しました。"
                  results={[
                    "Googleマップでの表示回数: 200%増",
                    "来店客数: 30%増",
                    "平均評価: 3.8→4.6星",
                    "月間レビュー数: 5件→25件",
                  ]}
                />
                <CaseStudyCard
                  title="美容サロンチェーン"
                  description="10店舗への一括導入で、各店舗のオンライン予約数が平均50%増加。顧客満足度も向上し、リピート率が20%改善されました。"
                  results={[
                    "オンライン予約数: 50%増",
                    "顧客満足度: 15%向上",
                    "リピート率: 20%改善",
                    "新規顧客獲得コスト: 30%削減",
                  ]}
                />
              </div>
            </div>
          </section>

          {/* デモセクション */}
          <section id="demo" className="py-16 bg-indigo-50">
            <div className="max-w-[1400px] mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                無料デモを体験
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                以下のサンプルビジネスから選んで、エンゲージメントMEOの機能を体験してください。
                実際の顧客体験をシミュレーションし、AIによるレビュー生成プロセスを確認できます。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <DemoLink href="/client-01" className="bg-indigo-600">
                  和食レストラン
                </DemoLink>
                <DemoLink href="/client-02" className="bg-indigo-600">
                  ビューティーサロン
                </DemoLink>
                <DemoLink href="/client-03" className="bg-indigo-600">
                  ファッションストア
                </DemoLink>
              </div>
            </div>
          </section>

          {/* お問い合わせセクション */}
          <section id="contact" className="py-16 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                お問い合わせ
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                サービスに関するご質問やデモのご依頼など、お気軽にお問い合わせください。
                専門のコンサルタントが、あなたのビジネスに最適なMEO戦略をご提案します。
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                <ContactInfo
                  icon={<Phone className="w-8 h-8 text-indigo-600" />}
                  title="お電話でのお問い合わせ"
                  info="03-1234-5678"
                />
                <ContactInfo
                  icon={<Mail className="w-8 h-8 text-indigo-600" />}
                  title="メールでのお問い合わせ"
                  info="support@engagement-meo.com"
                />
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-12 text-xs">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  エンゲージメントMEO
                </h3>
                <p className="text-gray-400">
                  地図から始まる、新たな顧客との絆
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">サービス</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      機能一覧
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      仕組み
                    </a>
                  </li>
                  <li>
                    <a
                      href="#demo"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      デモ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">会社情報</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      エス・オー・データ株式会社について
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      プライバシーポリシー
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      利用規約
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
                <p className="text-gray-400 mb-2">support@engagement-meo.com</p>
                <p className="text-gray-400 mb-4">03-1234-5678</p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>
                &copy; 2024 エス・オー・データ株式会社. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
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
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3 text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TimelineItem({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-full -left-4 ring-4 ring-white">
        {icon}
      </span>
      <h3 className="mb-1 text-lg font-semibold text-gray-900">
        {number}. {title}
      </h3>
      <p className="text-base font-normal text-gray-500">{description}</p>
    </li>
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

function ContactInfo({
  icon,
  title,
  info,
}: {
  icon: React.ReactNode;
  title: string;
  info: string;
}) {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h4 className="text-lg font-semibold mb-2 text-gray-800">{title}</h4>
      <p className="text-gray-600">{info}</p>
    </div>
  );
}

function CaseStudyCard({
  title,
  description,
  results,
}: {
  title: string;
  description: string;
  results: string[];
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <h4 className="text-lg font-semibold mb-2 text-gray-800">主な成果</h4>
      <ul className="list-none space-y-2">
        {results.map((result, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}
