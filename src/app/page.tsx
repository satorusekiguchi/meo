'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import SurveyResult from '@/components/SurveyResult'

const questions = [
  {
    id: 1,
    question: '今回の体験はいかがでしたか？',
    options: ['とても良かった', '良かった', '普通', '悪かった', 'とても悪かった']
  },
  {
    id: 2,
    question: 'スタッフの対応はいかがでしたか？',
    options: ['とても丁寧', '丁寧', '普通', '不十分', 'とても不十分']
  },
  {
    id: 3,
    question: '施設の清潔さはいかがでしたか？',
    options: ['とても清潔', '清潔', '普通', '不潔', 'とても不潔']
  },
  {
    id: 4,
    question: '価格に対する満足度はいかがですか？',
    options: ['とても満足', '満足', '普通', '不満', 'とても不満']
  },
  {
    id: 5,
    question: 'また利用したいと思いますか？',
    options: ['ぜひ利用したい', '機会があれば利用したい', 'どちらとも言えない', 'あまり利用したくない', '二度と利用しない']
  }
]

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [generatedReview, setGeneratedReview] = useState('')

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (answers[currentQuestion] === '') {
      setError('質問に回答してください。')
      return
    }
    setError(null)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      submitAnswers()
    }
  }

  const submitAnswers = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setGeneratedReview(data.review)
      setIsCompleted(true)
    } catch (error) {
      console.error('Error submitting answers:', error)
      setError('回答の送信中にエラーが発生しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isCompleted) {
    return <SurveyResult generatedReview={generatedReview} />
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => setError(null)}>もう一度試す</Button>
      </div>
    )
  }

  if (isSubmitting) {
    return <div className="text-center mt-10">送信中...</div>
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">エンゲージメントアンケート</h1>
      <div className="mb-6">
        <h2 className="text-xl mb-4">{currentQuestionData.question}</h2>
        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]}>
          {currentQuestionData.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          質問 {currentQuestion + 1} / {questions.length}
        </div>
        <Button onClick={handleNext}>
          {currentQuestion === questions.length - 1 ? '送信' : '次へ'}
        </Button>
      </div>
    </div>
  )
}