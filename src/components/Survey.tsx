"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Question } from "@/config/clientConfig";

interface SurveyProps {
  questions: readonly Question[];
  onComplete: (review: string) => void;
}

export default function Survey({ questions, onComplete }: SurveyProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("送信する回答:", answers);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: Object.values(answers) }),
      });

      console.log("サーバーレスポンス:", await response.clone().text());

      if (!response.ok) {
        throw new Error("サーバーエラーが発生しました");
      }

      const data = await response.json();
      console.log("レスポンスデータ:", data);
      if (data.success) {
        onComplete(data.review);
      } else {
        throw new Error(data.error || "レビューの生成に失敗しました");
      }
    } catch (error) {
      console.error("エラー:", error);
      alert("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0">
      <Card className="w-full max-w-[500px] mx-auto">
        <CardHeader>
          <CardTitle>お客様アンケート</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <div className="relative pt-1">
            <div className="overflow-hidden h-3 text-xs flex rounded-full bg-purple-200">
              <div
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-in-out rounded-full"
              ></div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">
              {questions[currentQuestion].question}
            </h3>
            <RadioGroup
              onValueChange={(value) =>
                handleAnswer(questions[currentQuestion].id, value)
              }
              value={answers[questions[currentQuestion].id] || ""}
              className="space-y-0"
            >
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option}
                  className={`flex items-center py-4 cursor-pointer transition-all duration-300 ease-in-out`}
                  style={{ borderBottom: "1px solid #e2e8f0" }}
                >
                  <RadioGroupItem
                    value={option}
                    id={option}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={option}
                    className={`flex items-center flex-grow cursor-pointer px-2 ${
                      answers[questions[currentQuestion].id] === option
                        ? "font-bold"
                        : ""
                    }`}
                  >
                    <div className="w-6 h-6 mr-3 flex items-center justify-center overflow-hidden">
                      <Check
                        className={`text-blue-600 transition-all duration-300 ease-in-out ${
                          answers[questions[currentQuestion].id] === option
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                      />
                    </div>
                    <span className="text-base">{option}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col space-y-4">
            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 transition-all duration-200"
              >
                次へ
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    送信中...
                  </>
                ) : (
                  "送信してクーポンGET"
                )}
              </Button>
            )}
            <div className="flex justify-between items-center w-full">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="text-gray-500 hover:text-gray-700"
              >
                前へ
              </Button>
              <span className="text-base text-gray-500">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
