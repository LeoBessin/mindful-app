"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wind, Heart, Brain, Sparkles, Play } from "lucide-react"
import { ExercisePlayer } from "@/components/exercise-player"

type Exercise = {
  id: string
  title: string
  description: string
  duration: number
  category: "breathing" | "meditation" | "relaxation" | "mindfulness"
  icon: typeof Wind
  steps: string[]
}

const exercises: Exercise[] = [
  {
    id: "box-breathing",
    title: "Box Breathing",
    description: "A calming technique used by athletes and professionals to reduce stress",
    duration: 4,
    category: "breathing",
    icon: Wind,
    steps: [
      "Find a comfortable seated position",
      "Inhale slowly through your nose for 4 counts",
      "Hold your breath for 4 counts",
      "Exhale slowly through your mouth for 4 counts",
      "Hold empty for 4 counts",
      "Repeat this cycle 4-5 times",
    ],
  },
  {
    id: "body-scan",
    title: "Body Scan Meditation",
    description: "Release tension by bringing awareness to each part of your body",
    duration: 10,
    category: "meditation",
    icon: Heart,
    steps: [
      "Lie down or sit comfortably",
      "Close your eyes and take three deep breaths",
      "Bring attention to your toes, notice any sensations",
      "Slowly move awareness up through your feet, legs, torso",
      "Continue through your arms, neck, and head",
      "Notice areas of tension and consciously relax them",
      "Take a few moments to feel your whole body",
      "Gently open your eyes when ready",
    ],
  },
  {
    id: "progressive-relaxation",
    title: "Progressive Muscle Relaxation",
    description: "Systematically tense and release muscle groups to reduce physical stress",
    duration: 8,
    category: "relaxation",
    icon: Sparkles,
    steps: [
      "Sit or lie in a comfortable position",
      "Take a few deep, calming breaths",
      "Tense your feet muscles for 5 seconds, then release",
      "Move to your calves, tense and release",
      "Continue up through legs, abdomen, chest, arms",
      "Tense your shoulders up to your ears, then drop",
      "Finish with your face - scrunch, then relax",
      "Notice the feeling of relaxation throughout your body",
    ],
  },
  {
    id: "mindful-observation",
    title: "Mindful Observation",
    description: "Practice present-moment awareness by observing your surroundings",
    duration: 5,
    category: "mindfulness",
    icon: Brain,
    steps: [
      "Choose an object in your environment",
      "Observe it as if seeing it for the first time",
      "Notice its colors, textures, and shapes",
      "If your mind wanders, gently return focus to the object",
      "Expand awareness to sounds around you",
      "Notice any scents in the air",
      "Feel the sensations of your body in space",
      "Take a deep breath and return to your day",
    ],
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    description: "A natural tranquilizer for the nervous system, perfect before sleep",
    duration: 3,
    category: "breathing",
    icon: Wind,
    steps: [
      "Sit with your back straight",
      "Place the tip of your tongue behind your upper front teeth",
      "Exhale completely through your mouth, making a whoosh sound",
      "Close your mouth and inhale quietly through your nose for 4 counts",
      "Hold your breath for 7 counts",
      "Exhale completely through your mouth for 8 counts",
      "Repeat the cycle 3-4 times",
    ],
  },
  {
    id: "gratitude-reflection",
    title: "Gratitude Reflection",
    description: "Shift your mindset by focusing on things you appreciate",
    duration: 5,
    category: "mindfulness",
    icon: Heart,
    steps: [
      "Find a quiet, comfortable space",
      "Take three deep, centering breaths",
      "Think of one thing you're grateful for today",
      "Notice how it makes you feel in your body",
      "Think of a person you appreciate",
      "Reflect on a simple pleasure you enjoyed recently",
      "Consider a challenge that helped you grow",
      "Take a moment to feel appreciation for yourself",
    ],
  },
]

const categoryColors = {
  breathing: "bg-primary/10 text-primary border-primary/20",
  meditation: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  relaxation: "bg-accent/10 text-accent-foreground border-accent/20",
  mindfulness: "bg-chart-4/10 text-chart-4 border-chart-4/20",
}

export function ExerciseLibrary() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  if (selectedExercise) {
    return <ExercisePlayer exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => {
        const Icon = exercise.icon
        return (
          <Card key={exercise.id} className="border-border/50 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg font-medium">{exercise.title}</CardTitle>
                    <CardDescription className="text-balance leading-relaxed">{exercise.description}</CardDescription>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="outline" className={categoryColors[exercise.category]}>
                  {exercise.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{exercise.duration} min</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setSelectedExercise(exercise)}>
                <Play className="w-4 h-4 mr-2" />
                Start Exercise
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
