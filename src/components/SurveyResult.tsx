import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"

interface SurveyResultProps {
  generatedReview: string;
}

export default function SurveyResult({ generatedReview }: SurveyResultProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReview)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">アンケートが完了しました</h2>
        <p className="text-gray-600 mb-6">ご協力ありがとうございます。以下に生成された口コミを表示しています。</p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">生成された口コミ：</h3>
            <Textarea
              readOnly
              value={generatedReview}
              className="w-full h-32 p-2 border rounded"
            />
          </div>
          <Button onClick={handleCopy}>
            {copySuccess ? 'コピーしました！' : '口コミをコピー'}
          </Button>
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-4">
        <p className="text-sm text-gray-500">
          この口コミは自動生成されたものです。必要に応じて編集してからご使用ください。
        </p>
      </div>
    </div>
  )
}