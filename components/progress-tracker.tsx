"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoodChart } from "@/components/mood-chart"
import { EnergyChart } from "@/components/energy-chart"
import { StressChart } from "@/components/stress-chart"
import { StreakCard } from "@/components/streak-card"
import { InsightsCard } from "@/components/insights-card"

type CheckIn = {
  mood: "great" | "okay" | "low"
  energy: "high" | "medium" | "low"
  stress: "low" | "medium" | "high"
  timestamp: string
}

export function ProgressTracker() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const data = localStorage.getItem("checkIns")
    if (data) {
      setCheckIns(JSON.parse(data))
    }
  }, [])

  if (!mounted) {
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

  if (checkIns.length === 0) {
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
          <h3 className="text-xl font-medium mb-2">No check-ins yet</h3>
          <p className="text-muted-foreground text-balance">
            Complete your first daily check-in to start tracking your wellness journey
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StreakCard checkIns={checkIns} />
        <InsightsCard checkIns={checkIns} />
      </div>

      <Tabs defaultValue="mood" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mood">Mood</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="stress">Stress</TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends</CardTitle>
              <CardDescription>How your mood has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <MoodChart checkIns={checkIns} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Levels</CardTitle>
              <CardDescription>Track your energy patterns throughout your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <EnergyChart checkIns={checkIns} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stress Levels</CardTitle>
              <CardDescription>Monitor your stress patterns and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <StressChart checkIns={checkIns} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
