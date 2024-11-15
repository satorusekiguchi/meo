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
        className="min-h-screen flex items-center justify-center bg-gray-100"
        role="alert"
      >
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-extrabold text-red-600 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-lg text-gray-700">
            クライアント設定が見つかりません:{" "}
            <span className="font-semibold">{params.client}</span>
          </p>
          <p className="mt-4 text-sm text-gray-500">
            デバッグ情報: Client ID = {params.client || "undefined"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Client ID Type: {typeof params.client}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            現在の時刻: {new Date().toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Params: {JSON.stringify(params)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-10">
            <div className="flex justify-center mb-8">
              <Image
                src={clientConfig.logoUrl}
                alt={`${clientConfig.name}ロゴ`}
                width={clientConfig.logoWidth}
                height={clientConfig.logoHeight}
                className={clientConfig.logoClassName}
              />
            </div>
            <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-4">
              {clientConfig.name}へのご来店ありがとうございます。
            </h2>
            <p className="text-center text-gray-700 mb-8">
              当店のサービスについてのアンケートにご協力ください。
            </p>
            <div className="text-center">
              <Link
                href={`/${params.client}/survey`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors duration-300 ease-in-out inline-block"
              >
                アンケートに答えてクーポンをGET
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; 2024 Engagement MEO.</p>
      </footer>
    </div>
  );
}
