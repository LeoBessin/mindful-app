"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Meh, Frown, Battery, BatteryMedium, BatteryLow, Cloud, CloudRain, Sun } from "lucide-react"

type MoodLevel = "great" | "okay" | "low" | null
type EnergyLevel = "high" | "medium" | "low" | null
type StressLevel = "low" | "medium" | "high" | null

export function CheckInCard() {
  const { t } = useTranslation()
  const [mood, setMood] = useState<MoodLevel>(null)
  const [energy, setEnergy] = useState<EnergyLevel>(null)
  const [stress, setStress] = useState<StressLevel>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (mood && energy && stress) {
      // Store check-in data
      const checkIn = {
        mood,
        energy,
        stress,
        timestamp: new Date().toISOString(),
      }

      // Save to localStorage for now
      const existingData = localStorage.getItem("checkIns")
      const checkIns = existingData ? JSON.parse(existingData) : []
      checkIns.push(checkIn)
      localStorage.setItem("checkIns", JSON.stringify(checkIns))

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setMood(null)
        setEnergy(null)
        setStress(null)
      }, 3000)
    }
  }

  if (submitted) {
    return (
      <Card className="border-primary/20 bg-card animate-in fade-in duration-300">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Smile className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">{t('thank_you_checking_in')}</h3>
          <p className="text-muted-foreground text-balance">{t('wellbeing_matters')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-medium">{t('daily_checkin')}</CardTitle>
        <CardDescription>{t('take_moment_reflect')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mood Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">{t('hows_your_mood')}</label>
          <div className="flex gap-3">
            <Button
              variant={mood === "great" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setMood("great")}
            >
              <Smile className="w-6 h-6" />
              <span className="text-xs">{t('great')}</span>
            </Button>
            <Button
              variant={mood === "okay" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setMood("okay")}
            >
              <Meh className="w-6 h-6" />
              <span className="text-xs">{t('okay')}</span>
            </Button>
            <Button
              variant={mood === "low" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setMood("low")}
            >
              <Frown className="w-6 h-6" />
              <span className="text-xs">{t('low')}</span>
            </Button>
          </div>
        </div>

        {/* Energy Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">{t('energy_level')}</label>
          <div className="flex gap-3">
            <Button
              variant={energy === "high" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setEnergy("high")}
            >
              <Battery className="w-6 h-6" />
              <span className="text-xs">{t('high')}</span>
            </Button>
            <Button
              variant={energy === "medium" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setEnergy("medium")}
            >
              <BatteryMedium className="w-6 h-6" />
              <span className="text-xs">{t('medium')}</span>
            </Button>
            <Button
              variant={energy === "low" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setEnergy("low")}
            >
              <BatteryLow className="w-6 h-6" />
              <span className="text-xs">{t('low')}</span>
            </Button>
          </div>
        </div>

        {/* Stress Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">{t('stress_level')}</label>
          <div className="flex gap-3">
            <Button
              variant={stress === "low" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setStress("low")}
            >
              <Sun className="w-6 h-6" />
              <span className="text-xs">{t('low')}</span>
            </Button>
            <Button
              variant={stress === "medium" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setStress("medium")}
            >
              <Cloud className="w-6 h-6" />
              <span className="text-xs">{t('medium')}</span>
            </Button>
            <Button
              variant={stress === "high" ? "default" : "outline"}
              size="lg"
              className="flex-1 h-auto py-4 flex-col gap-2"
              onClick={() => setStress("high")}
            >
              <CloudRain className="w-6 h-6" />
              <span className="text-xs">{t('high')}</span>
            </Button>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={handleSubmit} disabled={!mood || !energy || !stress}>
          {t('complete_checkin')}
        </Button>
      </CardContent>
    </Card>
  )
}
