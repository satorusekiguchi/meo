import { Metadata } from "next";
import { getClientConfig, ClientId } from "@/config/clientConfig";

export async function generateMetadata({
  params,
}: {
  params: { client: string };
}): Promise<Metadata> {
  const clientConfig = getClientConfig(params.client as ClientId);
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
