'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wind, TrendingUp, Library, Settings, Star } from "lucide-react"
import { useTranslation } from "react-i18next"

type MBILevel = "high" | "medium" | "low"

export function QuickActions() {
  const { t } = useTranslation()
  const [hasRecommendations, setHasRecommendations] = useState(false)
  const [mbiLevel, setMbiLevel] = useState<MBILevel | null>(null)

  useEffect(() => {
    // Check if user has MBI test results and get the latest level
    const storedResults = localStorage.getItem("mbiTestResults")
    if (storedResults) {
      const results = JSON.parse(storedResults)
      if (results.length > 0) {
        const latestResult = results[results.length - 1]
        setHasRecommendations(true)
        setMbiLevel(latestResult.level)
      }
    }
  }, [])

  const getRecommendationDescription = (level: MBILevel) => {
    switch (level) {
      case "low":
        return t('recommendations_for_beginners')
      case "medium":
        return t('recommendations_for_intermediate')
      case "high":
        return t('recommendations_for_advanced')
      default:
        return t('recommendations_for_beginners')
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground px-1">{t('quick_actions')}</h2>
      <div className="grid gap-3">
        {hasRecommendations && mbiLevel && (
          <Link href="/exercises?recommended=true" className="block">
            <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-gradient-to-r from-primary/5 to-transparent border-primary/20" size="lg">
              <Star className="w-5 h-5 mr-3 text-primary fill-current" />
              <div className="text-left">
                <div className="font-medium">{t('personalized_recommendations')}</div>
                <div className="text-xs text-muted-foreground">{getRecommendationDescription(mbiLevel)}</div>
              </div>
            </Button>
          </Link>
        )}

        <Link href="/exercises" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-transparent" size="lg">
            <Wind className="w-5 h-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-medium">{t('mindfulness_exercises')}</div>
              <div className="text-xs text-muted-foreground">{t('guided_breathing_relaxation')}</div>
            </div>
          </Button>
        </Link>

        <Link href="/progress" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-transparent" size="lg">
            <TrendingUp className="w-5 h-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-medium">{t('view_progress')}</div>
              <div className="text-xs text-muted-foreground">{t('track_wellness_journey')}</div>
            </div>
          </Button>
        </Link>

        <Link href="/library" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-transparent" size="lg">
            <Library className="w-5 h-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-medium">{t('resource_library')}</div>
              <div className="text-xs text-muted-foreground">{t('tips_and_techniques')}</div>
            </div>
          </Button>
        </Link>

        <Link href="/settings" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-transparent" size="lg">
            <Settings className="w-5 h-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-medium">{t('settings')}</div>
              <div className="text-xs text-muted-foreground">{t('notifications_and_privacy')}</div>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  )
}
