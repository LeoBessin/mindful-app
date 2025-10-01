"use client"

import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

type CheckIn = {
  mood: "great" | "okay" | "low"
  energy: "high" | "medium" | "low"
  stress: "low" | "medium" | "high"
  timestamp: string
}

type MBIResult = {
  level: "high" | "medium" | "low"
  timestamp: string
  answers: Record<string, number>
}

type StreakCardProps = {
  checkIns: CheckIn[]
  mbiResults?: MBIResult[]
}

export function StreakCard({ checkIns, mbiResults = [] }: StreakCardProps) {
  const { t } = useTranslation()

  const streak = useMemo(() => {
    // Combine all activities (check-ins and MBI tests) and sort by date
    const allActivities = [
      ...checkIns.map(c => ({ timestamp: c.timestamp, type: 'checkin' })),
      ...mbiResults.map(m => ({ timestamp: m.timestamp, type: 'mbi' }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    if (allActivities.length === 0) return 0

    let currentStreak = 0
    let lastDate = new Date()
    lastDate.setHours(0, 0, 0, 0)

    const seenDates = new Set<string>()

    for (const activity of allActivities) {
      const activityDate = new Date(activity.timestamp)
      activityDate.setHours(0, 0, 0, 0)
      const dateKey = activityDate.toDateString()

      // Skip if we already counted this date
      if (seenDates.has(dateKey)) continue
      seenDates.add(dateKey)

      const diffDays = Math.floor((lastDate.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === 0 || diffDays === 1) {
        currentStreak++
        lastDate = activityDate
      } else {
        break
      }
    }

    return currentStreak
  }, [checkIns, mbiResults])

  const totalActivities = checkIns.length + mbiResults.length

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-semibold text-foreground">{streak}</div>
            <div className="text-sm text-muted-foreground">
              {streak === 1 ? t('day_streak') : t('days_streak')}
            </div>
            {totalActivities > 0 && (
              <div className="text-xs text-muted-foreground mt-1">
                {totalActivities} {totalActivities === 1 ? t('activity_completed') : t('activities_completed')}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
