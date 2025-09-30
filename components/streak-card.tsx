"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

type CheckIn = {
  mood: "great" | "okay" | "low"
  energy: "high" | "medium" | "low"
  stress: "low" | "medium" | "high"
  timestamp: string
}

type StreakCardProps = {
  checkIns: CheckIn[]
}

export function StreakCard({ checkIns }: StreakCardProps) {
  const streak = useMemo(() => {
    if (checkIns.length === 0) return 0

    const sortedCheckIns = [...checkIns].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )

    let currentStreak = 0
    let lastDate = new Date()
    lastDate.setHours(0, 0, 0, 0)

    for (const checkIn of sortedCheckIns) {
      const checkInDate = new Date(checkIn.timestamp)
      checkInDate.setHours(0, 0, 0, 0)

      const diffDays = Math.floor((lastDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === 0 || diffDays === 1) {
        currentStreak++
        lastDate = checkInDate
      } else {
        break
      }
    }

    return currentStreak
  }, [checkIns])

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-semibold text-foreground">{streak}</div>
            <div className="text-sm text-muted-foreground">Day streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
