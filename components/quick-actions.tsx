'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wind, TrendingUp, Library, Settings } from "lucide-react"
import { useTranslation } from "react-i18next"

export function QuickActions() {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground px-1">{t('quick_actions')}</h2>
      <div className="grid gap-3">
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
