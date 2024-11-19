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

    const filename = `${type}_${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(filePath, buffer);

    const publicPath = `/uploads/${filename}`;

    const fileContent = await file.arrayBuffer();

    const uniqueFileName = `logo_${uuidv4()}.png`;
    const tempPath = `/tmp/${uniqueFileName}`;

    // ファイルを一時ディレクトリに保存
    const bufferContent = Buffer.from(fileContent);
    fs.writeFileSync(tempPath, bufferContent);

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
