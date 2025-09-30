'use client';

import { ProgressTracker } from "@/components/progress-tracker"
import { BackButton } from "@/components/back-button"
import { useTranslation } from "react-i18next"

export default function ProgressPage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-medium text-balance">{t('progress')}</h1>
            <p className="text-sm text-muted-foreground">{t('your_wellness_insights')}</p>
          </div>
        </div>
        <ProgressTracker />
      </div>
    </main>
  )
}
