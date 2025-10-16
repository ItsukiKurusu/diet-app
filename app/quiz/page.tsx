"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, RotateCcw } from "lucide-react"
import questions from "@/data/questions.json"

type CategoryKey = "fasting" | "lowCarb" | "saladFirst" | "beautySupport" | "portionControl"

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [pressedButton, setPressedButton] = useState<number | null>(null)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate scores
      calculateAndNavigate()
    }
  }

  const calculateAndNavigate = () => {
    const scores: Record<CategoryKey, number> = {
      fasting: 0,
      lowCarb: 0,
      saladFirst: 0,
      beautySupport: 0,
      portionControl: 0,
    }

    // Calculate scores based on answers
    questions.forEach((question, index) => {
      const answerIndex = answers[index]
      if (answerIndex !== undefined) {
        const points = 4 - answerIndex // 4, 3, 2, 1 points
        const category = question.category as CategoryKey
        scores[category] += points
      }
    })

    // Normalize scores to 0-100 scale (max per category is 8 points from 2 questions)
    const normalizedScores = {
      fasting: Math.round((scores.fasting / 8) * 100),
      lowCarb: Math.round((scores.lowCarb / 8) * 100),
      saladFirst: Math.round((scores.saladFirst / 8) * 100),
      beautySupport: Math.round((scores.beautySupport / 8) * 100),
      portionControl: Math.round((scores.portionControl / 8) * 100),
    }

    // Navigate to result page with scores as URL parameters
    const params = new URLSearchParams({
      fasting: normalizedScores.fasting.toString(),
      lowCarb: normalizedScores.lowCarb.toString(),
      saladFirst: normalizedScores.saladFirst.toString(),
      beautySupport: normalizedScores.beautySupport.toString(),
      portionControl: normalizedScores.portionControl.toString(),
    })

    router.push(`/result?${params.toString()}`)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
  }

  const question = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== undefined

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4 sm:py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-balance text-foreground">ダイエットタイプ診断</h1>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            質問 {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2" />

        {/* Question Card */}
        <Card className="border-2 shadow-lg">
          <CardContent className="pt-8 pb-6 space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-balance leading-relaxed">
              {question.question}
            </h2>

            {/* Options */}
            <div className="grid gap-3 sm:gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  onMouseDown={() => setPressedButton(index)}
                  onMouseUp={() => setPressedButton(null)}
                  onMouseLeave={() => setPressedButton(null)}
                  onTouchStart={() => setPressedButton(index)}
                  onTouchEnd={() => setPressedButton(null)}
                  className={`p-4 sm:p-5 rounded-xl border-2 text-left transition-all hover:scale-[1.02] hover:shadow-md ${
                    pressedButton === index
                      ? "bg-gray-300 text-gray-800 border-gray-400 scale-95"
                      : answers[currentQuestion] === index
                        ? "border-gray-400 bg-gray-200 text-gray-900 font-semibold shadow-md"
                        : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors ${
                        pressedButton === index
                          ? "border-gray-600 bg-gray-600 text-white"
                          : answers[currentQuestion] === index
                            ? "border-gray-600 bg-gray-600 text-white"
                            : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm sm:text-base leading-relaxed">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <Button
            onClick={handleRestart}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto order-2 sm:order-1 bg-transparent"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            最初からやり直す
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 order-1 sm:order-2"
          >
            {currentQuestion < questions.length - 1 ? "次へ" : "結果を見る"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}
