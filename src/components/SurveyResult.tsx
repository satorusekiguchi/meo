'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Copy } from 'lucide-react'

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-[800px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">アンケートが完了しました</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-center">
            ご協力ありがとうございます。以下に生成された口コミを表示しています。
          </p>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">生成された口コミ：</h3>
            <Textarea
              readOnly
              value={generatedReview}
              className="w-full min-h-[150px] p-3 border rounded-md resize-none"
            />
          </div>
          <Button 
            onClick={handleCopy} 
            className="w-full flex items-center justify-center"
          >
            {copySuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                コピーしました！
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                口コミをコピー
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="bg-gray-100 text-sm text-gray-500 text-center">
          <p>
            この口コミは自動生成されたものです。必要に応じて編集してからご使用ください。
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}