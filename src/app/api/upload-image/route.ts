import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json(
        { error: "ファイルが提供されていません" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueFileName = `${type}_${uuidv4()}${path.extname(file.name)}`;
    const tempPath = `/tmp/${uniqueFileName}`;

    // ファイルを一時ディレクトリに保存
    fs.writeFileSync(tempPath, buffer);

    const publicPath = `/uploads/${uniqueFileName}`;

    return NextResponse.json(
      { message: "画像が正常にアップロードされました", path: publicPath },
      { status: 200 }
    );
  } catch (error) {
    console.error("画像のアップロード中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "画像のアップロード中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
