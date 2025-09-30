"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

type CheckIn = {
  mood: "great" | "okay" | "low"
  energy: "high" | "medium" | "low"
  stress: "low" | "medium" | "high"
  timestamp: string
}

type InsightsCardProps = {
  checkIns: CheckIn[]
}

const moodToValue = { great: 3, okay: 2, low: 1 }

export function InsightsCard({ checkIns }: InsightsCardProps) {
  const insight = useMemo(() => {
    if (checkIns.length < 2) {
      return { text: "Keep checking in to see insights", trend: "neutral" as const }
    }

    const recent = checkIns.slice(-7)
    const previous = checkIns.slice(-14, -7)

    if (previous.length === 0) {
      return { text: "Building your wellness data", trend: "neutral" as const }
    }

    const recentAvg = recent.reduce((sum, c) => sum + moodToValue[c.mood], 0) / recent.length
    const previousAvg = previous.reduce((sum, c) => sum + moodToValue[c.mood], 0) / previous.length

    const diff = recentAvg - previousAvg

    if (diff > 0.3) {
      return { text: "Your mood is improving", trend: "up" as const }
    } else if (diff < -0.3) {
      return { text: "Consider extra self-care", trend: "down" as const }
    } else {
      return { text: "Mood is stable", trend: "neutral" as const }
    }
  }, [checkIns])

  const Icon = insight.trend === "up" ? TrendingUp : insight.trend === "down" ? TrendingDown : Minus

  const colorClass =
    insight.trend === "up"
      ? "text-primary bg-primary/20"
      : insight.trend === "down"
        ? "text-accent-foreground bg-accent/20"
        : "text-muted-foreground bg-muted"

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground">{insight.text}</div>
            <div className="text-sm text-muted-foreground">Based on recent check-ins</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
