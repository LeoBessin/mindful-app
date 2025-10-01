"use client"

import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Brain } from "lucide-react"

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

type InsightsCardProps = {
  checkIns: CheckIn[]
  mbiResults?: MBIResult[]
}

const moodToValue = { great: 3, okay: 2, low: 1 }
const levelToValue = { high: 3, medium: 2, low: 1 }

export function InsightsCard({ checkIns, mbiResults = [] }: InsightsCardProps) {
  const { t } = useTranslation()

  const insight = useMemo(() => {
    // Prioritize MBI insights if we have MBI data
    if (mbiResults.length >= 2) {
      const recent = mbiResults.slice(-2)[1]
      const previous = mbiResults.slice(-2)[0]

      const recentValue = levelToValue[recent.level]
      const previousValue = levelToValue[previous.level]

      if (recentValue > previousValue) {
        return {
          text: t('mindfulness_improving'),
          trend: "up" as const,
          icon: Brain
        }
      } else if (recentValue < previousValue) {
        return {
          text: t('focus_on_practice'),
          trend: "down" as const,
          icon: Brain
        }
      } else {
        return {
          text: t('mindfulness_stable'),
          trend: "neutral" as const,
          icon: Brain
        }
      }
    }

    // Fall back to mood insights if no MBI data
    if (checkIns.length < 2) {
      return {
        text: t('keep_tracking_for_insights'),
        trend: "neutral" as const,
        icon: Minus
      }
    }

    const recent = checkIns.slice(-7)
    const previous = checkIns.slice(-14, -7)

    if (previous.length === 0) {
      return {
        text: t('building_wellness_data'),
        trend: "neutral" as const,
        icon: Minus
      }
    }

    const recentAvg = recent.reduce((sum, c) => sum + moodToValue[c.mood], 0) / recent.length
    const previousAvg = previous.reduce((sum, c) => sum + moodToValue[c.mood], 0) / previous.length

    const diff = recentAvg - previousAvg

    if (diff > 0.3) {
      return {
        text: t('mood_improving'),
        trend: "up" as const,
        icon: TrendingUp
      }
    } else if (diff < -0.3) {
      return {
        text: t('consider_extra_selfcare'),
        trend: "down" as const,
        icon: TrendingDown
      }
    } else {
      return {
        text: t('mood_stable'),
        trend: "neutral" as const,
        icon: Minus
      }
    }
  }, [checkIns, mbiResults, t])

  const Icon = insight.icon

  const colorClass =
    insight.trend === "up"
      ? "text-primary bg-primary/20"
      : insight.trend === "down"
        ? "text-destructive bg-destructive/20"
        : "text-muted-foreground bg-muted"

  const totalActivities = checkIns.length + mbiResults.length

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground">{insight.text}</div>
            <div className="text-sm text-muted-foreground">
              {mbiResults.length > 0
                ? t('based_on_mbi_progress')
                : t('based_on_recent_checkins')
              }
            </div>
            {totalActivities > 1 && (
              <div className="text-xs text-muted-foreground mt-1">
                {totalActivities} {t('data_points')}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
