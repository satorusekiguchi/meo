import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">ページが見つかりません</h2>
      <p className="mb-4">申し訳ありませんが、お探しのページは存在しません。</p>
      <Button asChild>
        <Link href="/">
          ホームに戻る
        </Link>
      </Button>
    </div>
  )
}