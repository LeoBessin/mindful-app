"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

type CheckIn = {
  mood: "great" | "okay" | "low"
  energy: "high" | "medium" | "low"
  stress: "low" | "medium" | "high"
  timestamp: string
}

type Tip = {
  titleKey: string
  descriptionKey: string
  condition?: (checkIns: CheckIn[]) => boolean
}

export function TodaysTip() {
  const { t } = useTranslation()
  const [tip, setTip] = useState<Tip | null>(null)
  const [mounted, setMounted] = useState(false)

  const tips: Tip[] = [
    // Stress-related tips
    {
      titleKey: "try_box_breathing",
      descriptionKey: "box_breathing_description",
      condition: (checkIns) => {
        const recent = checkIns.slice(-3)
        return recent.some((c) => c.stress === "high")
      },
    },
    {
      titleKey: "take_mindful_break",
      descriptionKey: "mindful_break_description",
      condition: (checkIns) => {
        const recent = checkIns.slice(-2)
        return recent.some((c) => c.stress === "high" || c.stress === "medium")
      },
    },

    // Energy-related tips
    {
      titleKey: "gentle_movement_helps",
      descriptionKey: "gentle_movement_description",
      condition: (checkIns) => {
        const recent = checkIns.slice(-2)
        return recent.some((c) => c.energy === "low")
      },
    },
    {
      titleKey: "check_your_hydration",
      descriptionKey: "hydration_description",
      condition: (checkIns) => {
        const recent = checkIns.slice(-3)
        return recent.filter((c) => c.energy === "low").length >= 2
      },
    },
    {
      titleKey: "honor_rest_needs",
      descriptionKey: "rest_needs_description",
      condition: (checkIns) => {
        const recent = checkIns.slice(-5)
        return recent.filter((c) => c.energy === "low").length >= 3
      },
    },

    // Mood-related tips
    {
      titleKey: "connect_with_someone",
      descriptionKey: "connect_description",
      condition: (checkIns) => {
        const recent = checkIns.slice(-2)
        return recent.some((c) => c.mood === "low")
      },
    },
    {
      titleKey: "practice_gratitude",
      descriptionKey: "gratitude_description",
      condition: (checkIns) => {
        const recent = checkIns.slice(-3)
        return recent.filter((c) => c.mood === "low" || c.mood === "okay").length >= 2
      },
    },

    // General tips
    {
      titleKey: "gentle_self_compassion",
      descriptionKey: "self_compassion_description",
    },
    {
      titleKey: "celebrate_small_wins",
      descriptionKey: "small_wins_description",
    },
    {
      titleKey: "listen_to_your_body",
      descriptionKey: "listen_body_description",
    },
  ]

  useEffect(() => {
    setMounted(true)

    // Get stored check-ins
    const storedCheckIns = localStorage.getItem("checkIns")
    const checkIns: CheckIn[] = storedCheckIns ? JSON.parse(storedCheckIns) : []

    // Find applicable tips based on recent check-ins
    const applicableTips = tips.filter((tip) => !tip.condition || tip.condition(checkIns))

    // Select a random tip from applicable tips
    const selectedTip = applicableTips[Math.floor(Math.random() * applicableTips.length)]
    setTip(selectedTip)
  }, [])

  if (!mounted || !tip) {
    return null
  }

  return (
    <Card className="border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{t('todays_tip')}</h3>
            <h4 className="font-medium text-foreground">{t(tip.titleKey)}</h4>
            <p className="text-sm text-muted-foreground text-balance leading-relaxed">
              {t(tip.descriptionKey)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
