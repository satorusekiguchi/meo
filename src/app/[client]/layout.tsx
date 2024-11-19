import { Metadata } from "next";
import path from "path";
import fs from "fs";
import { ClientConfig } from "@/config/clientConfig";

export async function generateMetadata({
  params,
}: {
  params: { client: string };
}): Promise<Metadata> {
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

  return {
    title: clientConfig
      ? `${clientConfig.name} | アンケート`
      : "クライアントアンケート",
    description: clientConfig
      ? `${clientConfig.name}のサービスに関するアンケートにご協力ください。`
      : "サービスに関するアンケートにご協力ください。",
  };
}

export default function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { client: string };
}) {
  console.log("レイアウトパラメータ:", params);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main>{children}</main>
    </div>
  );
}
