'use client';

import { SettingsPanel } from "@/components/settings-panel"
import { BackButton } from "@/components/back-button"
import { useTranslation } from "react-i18next"

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-medium text-balance">{t('settings')}</h1>
            <p className="text-sm text-muted-foreground">{t('customize_your_wellness_experience')}</p>
          </div>
        </div>
        <SettingsPanel />
      </div>
    </main>
  )
}
