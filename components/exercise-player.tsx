"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, Play, Pause, RotateCcw, Check } from "lucide-react"

type Exercise = {
  id: string
  title: string
  description: string
  duration: number
  category: string
  icon: any
  steps: string[]
}

type ExercisePlayerProps = {
  exercise: Exercise
  onClose: () => void
}

export function ExercisePlayer({ exercise, onClose }: ExercisePlayerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const stepDuration = (exercise.duration * 60 * 1000) / exercise.steps.length

  useEffect(() => {
    if (!isPlaying || isComplete) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / stepDuration) * 100
        if (newProgress >= 100) {
          if (currentStep < exercise.steps.length - 1) {
            setCurrentStep((s) => s + 1)
            return 0
          } else {
            setIsComplete(true)
            setIsPlaying(false)
            return 100
          }
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, currentStep, exercise.steps.length, stepDuration, isComplete])

  const handleReset = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(false)
    setIsComplete(false)
  }

  const handleNext = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep((s) => s + 1)
      setProgress(0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl font-medium text-balance">{exercise.title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isComplete ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">Exercise Complete</h3>
                <p className="text-muted-foreground text-balance">Great work! Take a moment to notice how you feel.</p>
              </div>
              <div className="flex gap-3 justify-center pt-4">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>
                <Button onClick={onClose}>Done</Button>
              </div>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Step {currentStep + 1} of {exercise.steps.length}
                  </span>
                  <span className="text-muted-foreground">{exercise.duration} min total</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Current Step */}
              <div className="bg-muted/30 rounded-lg p-6 min-h-[160px] flex items-center justify-center">
                <p className="text-lg text-center text-balance leading-relaxed">{exercise.steps[currentStep]}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentStep === 0}>
                  <RotateCcw className="w-4 h-4" />
                  <span className="sr-only">Previous step</span>
                </Button>

                <Button size="lg" className="px-8" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      {progress > 0 ? "Resume" : "Start"}
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  disabled={currentStep === exercise.steps.length - 1}
                >
                  <Play className="w-4 h-4 rotate-180 scale-x-[-1]" />
                  <span className="sr-only">Next step</span>
                </Button>
              </div>

              {/* All Steps Preview */}
              <div className="space-y-2 pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground">All Steps</h4>
                <ol className="space-y-2">
                  {exercise.steps.map((step, index) => (
                    <li
                      key={index}
                      className={`text-sm flex gap-2 ${
                        index === currentStep
                          ? "text-foreground font-medium"
                          : index < currentStep
                            ? "text-muted-foreground line-through"
                            : "text-muted-foreground"
                      }`}
                    >
                      <span className="flex-shrink-0">{index + 1}.</span>
                      <span className="text-balance leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
