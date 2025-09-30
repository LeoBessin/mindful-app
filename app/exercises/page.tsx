'use client';

import { ExerciseLibrary } from "@/components/exercise-library"
import { BackButton } from "@/components/back-button"
import { useTranslation } from "react-i18next"

export default function ExercisesPage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-medium text-balance">{t('mindfulness_exercises')}</h1>
            <p className="text-sm text-muted-foreground">{t('guided_practices')}</p>
          </div>
        </div>
        <ExerciseLibrary />
      </div>
    </main>
  )
}
