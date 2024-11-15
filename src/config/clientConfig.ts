import fs from "fs";
import path from "path";

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

const clientsDirectory = path.join(process.cwd(), "src", "config", "clients");

export const getClientConfig = (clientId: string): ClientConfig | null => {
  try {
    const filePath = path.join(clientsDirectory, `${clientId}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`クライアント設定ファイルが存在しません: ${clientId}.json`);
      return null;
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    const config: ClientConfig = JSON.parse(fileContents);
    return config;
  } catch (error) {
    console.error(
      `クライアント設定の読み込みに失敗しました: ${clientId}`,
      error
    );
    return null;
  }
};

export interface Question {
  id: string;
  question: string;
  options: readonly string[];
  // 他のプロパティがあればここに追加
}
