"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

type CheckIn = {
  mood: "great" | "okay" | "low"
  energy: "high" | "medium" | "low"
  stress: "low" | "medium" | "high"
  timestamp: string
}

type Tip = {
  title: string
  description: string
  condition?: (checkIns: CheckIn[]) => boolean
}

const tips: Tip[] = [
  // Stress-related tips
  {
    title: "Try box breathing",
    description: "When stress is high, 4-4-4-4 breathing can quickly calm your nervous system.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-3)
      return recent.some((c) => c.stress === "high")
    },
  },
  {
    title: "Take a mindful break",
    description: "Step away for 5 minutes. A short pause can reset your stress response.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-2)
      return recent.some((c) => c.stress === "high" || c.stress === "medium")
    },
  },

  // Energy-related tips
  {
    title: "Gentle movement helps",
    description: "A short walk or light stretching can naturally boost your energy levels.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-2)
      return recent.some((c) => c.energy === "low")
    },
  },
  {
    title: "Check your hydration",
    description: "Low energy often means dehydration. Drink a glass of water mindfully.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-3)
      return recent.filter((c) => c.energy === "low").length >= 2
    },
  },
  {
    title: "Honor your rest needs",
    description: "Consistent low energy is your body asking for rest. Consider an early night.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-5)
      return recent.filter((c) => c.energy === "low").length >= 3
    },
  },

  // Mood-related tips
  {
    title: "Connect with someone",
    description: "Reach out to a friend or loved one. Connection can lift your spirits.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-2)
      return recent.some((c) => c.mood === "low")
    },
  },
  {
    title: "Practice gratitude",
    description: "Write down three small things you appreciate today. It shifts perspective.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-3)
      return recent.filter((c) => c.mood === "low" || c.mood === "okay").length >= 2
    },
  },
  {
    title: "Get outside",
    description: "Natural light and fresh air can improve mood. Even 5 minutes helps.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-2)
      return recent.some((c) => c.mood === "low")
    },
  },

  // Positive reinforcement
  {
    title: "You're doing great",
    description: "Your consistent check-ins show commitment to your well-being. Keep it up!",
    condition: (checkIns) => {
      return checkIns.length >= 5
    },
  },
  {
    title: "Celebrate your progress",
    description: "You've been taking care of yourself. That's something to be proud of.",
    condition: (checkIns) => {
      const recent = checkIns.slice(-3)
      return recent.filter((c) => c.mood === "great").length >= 2
    },
  },

  // General wellness tips
  {
    title: "Take a mindful breath",
    description: "Pause for 3 deep breaths. Inhale for 4 counts, hold for 4, exhale for 6.",
  },
  {
    title: "Step outside",
    description: "Even 5 minutes in fresh air can reset your mind and boost your mood.",
  },
  {
    title: "Stretch your body",
    description: "Gentle stretching releases tension and improves circulation.",
  },
  {
    title: "Write it down",
    description: "Journaling your thoughts can help process emotions and reduce stress.",
  },
  {
    title: "Listen to your body",
    description: "Notice what you need right now. Rest, movement, nourishment, or connection?",
  },
  {
    title: "Set a small intention",
    description: "Choose one kind thing to do for yourself today, no matter how small.",
  },
]

export function TodaysTip() {
  const [tip, setTip] = useState(tips[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const data = localStorage.getItem("checkIns")
    const checkIns: CheckIn[] = data ? JSON.parse(data) : []

    const personalizedTips = tips.filter((t) => !t.condition || t.condition(checkIns))

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setTip(personalizedTips[dayOfYear % personalizedTips.length])
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
      <CardContent className="pt-6 pb-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-foreground">{tip.title}</h3>
            <p className="text-sm text-muted-foreground text-balance leading-relaxed">{tip.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
