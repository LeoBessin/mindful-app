'use client';

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { RecommendedExercises } from "@/components/recommended-exercises"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { Star, Grid3X3 } from "lucide-react"

export default function ExercisesPage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [showRecommended, setShowRecommended] = useState(false)
  const [hasRecommendations, setHasRecommendations] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated first
    setIsHydrated(true)

    // Add a small delay to ensure localStorage is available
    const checkRecommendations = () => {
      try {
        // Check if we should show recommendations by default
        const shouldShowRecommended = searchParams?.get('recommended') === 'true'

        // Check if user has MBI test results
        const storedResults = localStorage.getItem("mbiTestResults")

        let hasResults = false
        if (storedResults) {
          try {
            const results = JSON.parse(storedResults)
            hasResults = Array.isArray(results) && results.length > 0
          } catch (e) {
            hasResults = false
          }
        }

        setHasRecommendations(hasResults)
        setShowRecommended(shouldShowRecommended && hasResults)
        setIsLoading(false)
      } catch (error) {
        setHasRecommendations(false)
        setShowRecommended(false)
        setIsLoading(false)
      }
    }

    // Small delay to ensure component is mounted and language is loaded
    const timeoutId = setTimeout(checkRecommendations, 150)

    return () => clearTimeout(timeoutId)
  }, [searchParams])

  // Don't render translated content until hydration is complete
  if (!isHydrated) {
    return (
      <main className="min-h-screen pb-20">
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
          <div className="flex items-center gap-4">
            <BackButton />
            <div className="flex-1">
              <h1 className="text-2xl font-medium text-balance">Mindfulness Exercises</h1>
              <p className="text-sm text-muted-foreground">Guided practices for calm and clarity</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div className="flex-1">
            <h1 className="text-2xl font-medium text-balance">{t('mindfulness_exercises')}</h1>
            <p className="text-sm text-muted-foreground">{t('guided_practices')}</p>
          </div>
        </div>

        {!isLoading && hasRecommendations && (
          <div className="flex gap-2">
            <Button
              variant={showRecommended ? "default" : "outline"}
              size="sm"
              onClick={() => setShowRecommended(true)}
              className="flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              {t("personalized_recommendations")}
            </Button>
            <Button
              variant={!showRecommended ? "default" : "outline"}
              size="sm"
              onClick={() => setShowRecommended(false)}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              {t("mindfulness_exercises")}
            </Button>
          </div>
        )}

        {!isLoading && (
          <>
            {showRecommended && hasRecommendations ? (
              <RecommendedExercises />
            ) : (
              <RecommendedExercises showAll={true} />
            )}
          </>
        )}
      </div>
    </main>
  )
}
