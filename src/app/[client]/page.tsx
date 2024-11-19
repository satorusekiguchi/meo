import Image from "next/image";
import Link from "next/link";
import path from "path";
import fs from "fs";
import { ClientConfig } from "./layout";

export default function ClientPage({ params }: { params: { client: string } }) {
  const { client } = params;
  const filePath = path.join(
    process.cwd(),
    "src",
    "config",
    "clients",
    `${client}.json`
  );
  let clientConfig: ClientConfig | null = null;

  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, "utf8");
    clientConfig = JSON.parse(fileContents);
  }

  if (!clientConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center" role="alert">
          <h1 className="text-3xl font-bold mb-4">
            クライアントが見つかりません
          </h1>
          <p className="text-xl">指定されたクライアントIDは無効です。</p>
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
                src={clientConfig.logo}
                alt={`${clientConfig.name}ロゴ`}
                width={200}
                height={100}
                className="hover:scale-110 transition-transform duration-300"
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
                href={`/${client}/survey`}
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
