import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { filename, content } = await request.json()

    if (!filename || !content) {
      return NextResponse.json({ error: 'ファイル名とコンテンツが必要です' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'src', 'config', 'clients', filename)

    await fs.writeFile(filePath, content, 'utf-8')

    return NextResponse.json({ message: 'JSONファイルが正常に保存されました' }, { status: 200 })
  } catch (error) {
    console.error('JSONファイルの保存中にエラーが発生しました:', error)
    return NextResponse.json({ error: 'JSONファイルの保存中にエラーが発生しました' }, { status: 500 })
  }
}