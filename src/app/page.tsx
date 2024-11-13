'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import SurveyResult from '@/components/SurveyResult'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'

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
setError(null)
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

const handlePrevious = () => {
if (currentQuestion > 0) {
setCurrentQuestion(currentQuestion - 1)
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

const currentQuestionData = questions[currentQuestion]

return (
<div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
<Card className="w-full max-w-[800px]">
<CardHeader>
<CardTitle className="text-2xl font-bold text-center">エンゲージメントアンケート</CardTitle>
</CardHeader>
<CardContent>
{error ? (
<div className="text-center py-4">
<div className="text-red-500 mb-4">{error}</div>
<Button 
onClick={() => setError(null)}
variant="outline"
className="hover:bg-primary hover:text-primary-foreground"
>
もう一度試す
</Button>
</div>
) : isSubmitting ? (
<div className="text-center py-8">
<div className="animate-pulse text-lg">送信中...</div>
</div>
) : (
<>
<div className="mb-6">
<div className="bg-gray-200 h-2 rounded-full mb-6">
<div 
className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
/>
</div>
<h2 className="text-xl mb-6">{currentQuestionData.question}</h2>
<RadioGroup 
onValueChange={handleAnswer} 
value={answers[currentQuestion]}
className="space-y-3"
>
{currentQuestionData.options.map((option, index) => (
<div 
key={index} 
className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
onClick={() => handleAnswer(option)}
>
<RadioGroupItem value={option} id={`option-${index}`} />
<Label 
htmlFor={`option-${index}`} 
className="flex-grow cursor-pointer"
>
{option}
</Label>
</div>
))}
</RadioGroup>
</div>
</>
)}
</CardContent>
<CardFooter className="flex justify-between items-center">
<Button
onClick={handlePrevious}
disabled={currentQuestion === 0 || isSubmitting}
variant="outline"
className="transition-all duration-300 ease-in-out transform hover:scale-105"
>
<ArrowLeft className="mr-2 h-4 w-4" />
前へ
</Button>
<div className="text-sm text-muted-foreground">
質問 {currentQuestion + 1} / {questions.length}
</div>
<Button
onClick={handleNext}
disabled={answers[currentQuestion] === '' || isSubmitting}
className="transition-all duration-300 ease-in-out transform hover:scale-105"
>
{currentQuestion === questions.length - 1 ? (
<>
送信
<Send className="ml-2 h-4 w-4" />
</>
) : (
<>
次へ
<ArrowRight className="ml-2 h-4 w-4" />
</>
)}
</Button>
</CardFooter>
</Card>
</div>
)
}