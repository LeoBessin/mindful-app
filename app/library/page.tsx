'use client';

import { useState, useEffect } from "react"
import { ResourceLibrary } from "@/components/resource-library"
import { BackButton } from "@/components/back-button"
import { useTranslation } from "react-i18next"

export default function LibraryPage() {
  const { t } = useTranslation()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <main className="min-h-screen pb-20">
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-2xl font-medium text-balance">Library</h1>
              <p className="text-sm text-muted-foreground">Wellness resources and techniques</p>
            </div>
          </div>
          <ResourceLibrary />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-medium text-balance">{t('library')}</h1>
            <p className="text-sm text-muted-foreground">{t('wellness_resources')}</p>
          </div>
        </div>
        <ResourceLibrary />
      </div>
    </main>
  )
}
