import Link from "next/link";
import Image from "next/image";
import { getClientConfig, ClientId } from "@/config/clientConfig";

export default function ClientPage({ params }: { params: { client: string } }) {
  // デバッグ用ログ
  console.log("クライアントページパラメータ:", params);

  // params.clientをClientId型にキャスト
  const clientId = params.client as ClientId;
  const clientConfig = getClientConfig(clientId);

  if (!clientConfig) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white"
        role="alert"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">エラーが発生しました</h1>
          <p className="text-xl">
            クライアント設定が見つかりません: {params.client}
          </p>
          <p className="mt-4">
            デバッグ情報: Client ID = {params.client || "undefined"}
          </p>
          <p className="mt-2">Client ID Type: {typeof params.client}</p>
          <p className="mt-2">現在の時刻: {new Date().toLocaleString()}</p>
          <p className="mt-2">Params: {JSON.stringify(params)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <Image
                src={clientConfig.logoUrl}
                alt={`${clientConfig.name}ロゴ`}
                width={200}
                height={100}
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              {clientConfig.name}へのご来店ありがとうございます。
            </h2>
            <p className="text-center mb-6">
              当店のサービスについてのアンケートにご協力ください。
            </p>
            <div className="text-center">
              <Link
                href={`/${params.client}/survey`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-block"
              >
                アンケートに答えてクーポンをGET
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2024 エンゲージメントMEO. All rights reserved.</p>
      </footer>
    </div>
  );
}
