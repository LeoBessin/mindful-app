"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoodChart } from "@/components/mood-chart"
import { EnergyChart } from "@/components/energy-chart"
import { StressChart } from "@/components/stress-chart"
import { StreakCard } from "@/components/streak-card"
import { InsightsCard } from "@/components/insights-card"
import { MBIProgressChart } from "@/components/mbi-progress-chart"

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

export function ProgressTracker() {
  const { t } = useTranslation()
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [mbiResults, setMBIResults] = useState<MBIResult[]>([])
  const [mounted, setMounted] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    setMounted(true)

    // Load check-ins data
    const checkInsData = localStorage.getItem("checkIns")
    if (checkInsData) {
      setCheckIns(JSON.parse(checkInsData))
    }

    // Load MBI test results
    const mbiData = localStorage.getItem("mbiTestResults")
    if (mbiData) {
      try {
        const results = JSON.parse(mbiData)
        if (Array.isArray(results)) {
          setMBIResults(results)
        }
      } catch (error) {
        console.error("Error parsing MBI results:", error)
      }
    }
  }, [])

  if (!isHydrated || !mounted) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="text-center text-muted-foreground">Loading your progress...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const hasCheckIns = checkIns.length > 0
  const hasMBIResults = mbiResults.length > 0
  const hasAnyData = hasCheckIns || hasMBIResults

  if (!hasAnyData) {
    return (
      <Card className="border-border/50">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">{t('no_data_yet')}</h3>
          <p className="text-muted-foreground text-balance">
            {t('complete_activities_to_track_progress')}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StreakCard checkIns={checkIns} mbiResults={mbiResults} />
        <InsightsCard checkIns={checkIns} mbiResults={mbiResults} />
      </div>

      <Tabs defaultValue="mbi" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          {hasMBIResults && <TabsTrigger value="mbi">{t('mindfulness')}</TabsTrigger>}
          {hasCheckIns && <TabsTrigger value="mood">{t('mood')}</TabsTrigger>}
          {hasCheckIns && <TabsTrigger value="energy">{t('energy')}</TabsTrigger>}
          {hasCheckIns && <TabsTrigger value="stress">{t('stress')}</TabsTrigger>}
        </TabsList>

        {hasMBIResults && (
          <TabsContent value="mbi" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('mindfulness_progress')}</CardTitle>
                <CardDescription>{t('your_mindfulness_journey_over_time')}</CardDescription>
              </CardHeader>
              <CardContent>
                <MBIProgressChart mbiResults={mbiResults} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {hasCheckIns && (
          <>
            <TabsContent value="mood" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('mood_trends')}</CardTitle>
                  <CardDescription>{t('how_mood_changed_over_time')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <MoodChart checkIns={checkIns} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="energy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('energy_levels')}</CardTitle>
                  <CardDescription>{t('track_energy_patterns')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <EnergyChart checkIns={checkIns} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('stress_levels')}</CardTitle>
                  <CardDescription>{t('monitor_stress_patterns')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <StressChart checkIns={checkIns} />
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
