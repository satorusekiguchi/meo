import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export interface URLConfig {
  url: string;
  visible: boolean;
}

export interface ClientConfig {
  name: string;
  questions: {
    id: string;
    question: string;
    options: readonly string[];
  }[];
  reviewUrls: {
    [key: string]: URLConfig;
  };
  socialUrls: {
    [key: string]: URLConfig;
  };
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName: string;
}

export async function GET(
  request: Request,
  { params }: { params: { clientId: string } }
) {
  const { clientId } = params;

  if (!clientId) {
    return NextResponse.json(
      { error: "クライアントIDが指定されていません。" },
      { status: 400 }
    );
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "config",
    "clients",
    `${clientId}.json`
  );

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: `クライアント設定が見つかりません: ${clientId}` },
      { status: 404 }
    );
  }

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const config: ClientConfig = JSON.parse(fileContents);
    return NextResponse.json(config);
  } catch (error) {
    console.error(
      `クライアント設定の読み込みに失敗しました: ${clientId}`,
      error
    );
    return NextResponse.json(
      { error: "クライアント設定の読み込みに失敗しました。" },
      { status: 500 }
    );
  }
}
