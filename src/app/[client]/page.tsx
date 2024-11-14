// src/app/[client]/page.tsx

import Link from "next/link";
import { getClientConfig, ClientId } from "@/config/clientConfig";

export default function ClientPage({ params }: { params: { client: string } }) {
  // デバッグ用ログ
  console.log("クライアントページパラメータ:", params);
  console.log("Params in [client]/page.tsx:", params);

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
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          {clientConfig.name}
        </h1>
        <div className="text-center">
          <p className="mb-6">
            当店のサービスについてのアンケートにご協力ください。
          </p>
          <Link
            href={`/${params.client}/survey`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            アンケートに回答する
          </Link>
        </div>
      </div>
    </div>
  );
}
