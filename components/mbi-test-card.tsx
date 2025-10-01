"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle, RotateCcw, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type MBIResponse = 1 | 2 | 3 | null

interface MBIAnswers {
  q1: MBIResponse
  q2: MBIResponse
  q3: MBIResponse
  q4: MBIResponse
  q5: MBIResponse
  q6: MBIResponse
  q7: MBIResponse
  q8: MBIResponse
  q9: MBIResponse
  q10: MBIResponse
}

type MBILevel = "high" | "medium" | "low"

export function MBITestCard() {
  const { t } = useTranslation()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<MBIAnswers>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
    q9: null,
    q10: null,
  })
  const [completed, setCompleted] = useState(false)
  const [result, setResult] = useState<MBILevel | null>(null)

  const totalQuestions = 10
  const progress = ((currentQuestion - 1) / totalQuestions) * 100

  const handleAnswer = (questionKey: keyof MBIAnswers, value: MBIResponse) => {
    const newAnswers = { ...answers, [questionKey]: value }
    setAnswers(newAnswers)

    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (finalAnswers: MBIAnswers) => {
    const scores = Object.values(finalAnswers).filter(Boolean) as number[]
    const totalScore = scores.reduce((sum, score) => sum + score, 0)
    const averageScore = totalScore / scores.length

    let level: MBILevel
    // Inverser la logique car 1 = excellent, 2 = moyen, 3 = faible
    if (averageScore <= 1.5) {
      level = "high"    // Score faible = Excellent niveau de pleine conscience
    } else if (averageScore <= 2.2) {
      level = "medium"  // Score moyen = Niveau modéré de pleine conscience
    } else {
      level = "low"     // Score élevé = Niveau de base de pleine conscience
    }

    setResult(level)
    setCompleted(true)

    // Save result to localStorage
    const testResult = {
      answers: finalAnswers,
      level,
      timestamp: new Date().toISOString(),
    }

    const existingResults = localStorage.getItem("mbiTestResults")
    const results = existingResults ? JSON.parse(existingResults) : []
    results.push(testResult)
    localStorage.setItem("mbiTestResults", JSON.stringify(results))
  }

  const resetTest = () => {
    setCurrentQuestion(1)
    setAnswers({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
      q9: null,
      q10: null,
    })
    setCompleted(false)
    setResult(null)
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleViewRecommendedExercises = () => {
    // Navigate to exercises page with a query parameter to show recommendations
    router.push('/exercises?recommended=true')
  }

  if (completed && result) {
    return (
      <Card className="border-primary/20 bg-card">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">{t(`mbi_result_${result}`)}</h3>
              <p className="text-muted-foreground text-balance">{t(`mbi_result_${result}_desc`)}</p>
            </div>
            <div className="pt-4 space-y-3">
              <Button onClick={resetTest} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                {t("retake_test")}
              </Button>
              <Button
                onClick={handleViewRecommendedExercises}
                className="w-full"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {t("view_recommended_exercises")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestionKey = `q${currentQuestion}` as keyof MBIAnswers

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl font-medium">{t("mbi_test")}</CardTitle>
          </div>
          <Badge variant="secondary">{currentQuestion}/{totalQuestions}</Badge>
        </div>
        <CardDescription>{t("mbi_test_description")}</CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-relaxed">
            {t(`mbi_question_${currentQuestion}`)}
          </h3>

          <div className="space-y-3">
            {[1, 2, 3].map((value) => (
              <Button
                key={value}
                variant={answers[currentQuestionKey] === value ? "default" : "outline"}
                className="w-full text-left h-auto p-4 justify-start"
                onClick={() => handleAnswer(currentQuestionKey, value as MBIResponse)}
              >
                <span className="text-balance leading-relaxed">
                  {t(`mbi_response_${currentQuestion}_${value}`)}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {currentQuestion > 1 && (
          <div className="flex gap-2">
            <Button
              onClick={goToPreviousQuestion}
              variant="outline"
              size="sm"
            >
              ← {t("previous")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
