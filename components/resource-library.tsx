"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Brain, Moon, Users, Lightbulb } from "lucide-react"

type Resource = {
  titleKey: string
  descriptionKey: string
  icon: typeof Heart
  tipKeys: string[]
}

const resourcesConfig: Record<string, Resource[]> = {
  stress: [
    {
      titleKey: "understanding_stress",
      descriptionKey: "understanding_stress_desc",
      icon: Brain,
      tipKeys: ["stress_tip_1", "stress_tip_2", "stress_tip_3", "stress_tip_4"],
    },
    {
      titleKey: "quick_stress_relief",
      descriptionKey: "quick_stress_relief_desc",
      icon: Lightbulb,
      tipKeys: ["stress_relief_tip_1", "stress_relief_tip_2", "stress_relief_tip_3", "stress_relief_tip_4"],
    },
  ],
  burnout: [
    {
      titleKey: "recognizing_burnout",
      descriptionKey: "recognizing_burnout_desc",
      icon: Moon,
      tipKeys: ["burnout_tip_1", "burnout_tip_2", "burnout_tip_3", "burnout_tip_4", "burnout_tip_5"],
    },
    {
      titleKey: "preventing_burnout",
      descriptionKey: "preventing_burnout_desc",
      icon: Heart,
      tipKeys: ["prevent_burnout_tip_1", "prevent_burnout_tip_2", "prevent_burnout_tip_3", "prevent_burnout_tip_4", "prevent_burnout_tip_5", "prevent_burnout_tip_6"],
    },
  ],
  mindfulness: [
    {
      titleKey: "daily_mindfulness",
      descriptionKey: "daily_mindfulness_desc",
      icon: Brain,
      tipKeys: ["daily_mindfulness_tip_1", "daily_mindfulness_tip_2", "daily_mindfulness_tip_3", "daily_mindfulness_tip_4", "daily_mindfulness_tip_5"],
    },
    {
      titleKey: "meditation_basics",
      descriptionKey: "meditation_basics_desc",
      icon: Moon,
      tipKeys: ["meditation_tip_1", "meditation_tip_2", "meditation_tip_3", "meditation_tip_4", "meditation_tip_5"],
    },
  ],
  connection: [
    {
      titleKey: "social_wellness",
      descriptionKey: "social_wellness_desc",
      icon: Users,
      tipKeys: ["social_tip_1", "social_tip_2", "social_tip_3", "social_tip_4", "social_tip_5"],
    },
    {
      titleKey: "self_compassion",
      descriptionKey: "self_compassion_desc",
      icon: Heart,
      tipKeys: ["self_compassion_tip_1", "self_compassion_tip_2", "self_compassion_tip_3", "self_compassion_tip_4", "self_compassion_tip_5"],
    },
  ],
}

export function ResourceLibrary() {
  const { t } = useTranslation()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <Tabs defaultValue="stress" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stress">Stress</TabsTrigger>
          <TabsTrigger value="burnout">Burnout</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
          <TabsTrigger value="connection">Connection</TabsTrigger>
        </TabsList>
        <div className="text-center text-muted-foreground">Loading resources...</div>
      </Tabs>
    )
  }

  return (
    <Tabs defaultValue="stress" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="stress">{t('stress')}</TabsTrigger>
        <TabsTrigger value="burnout">{t('burnout')}</TabsTrigger>
        <TabsTrigger value="mindfulness">{t('mindfulness')}</TabsTrigger>
        <TabsTrigger value="connection">{t('connection')}</TabsTrigger>
      </TabsList>

      {Object.entries(resourcesConfig).map(([category, items]) => (
        <TabsContent key={category} value={category} className="space-y-4">
          {items.map((resource, index) => {
            const Icon = resource.icon
            return (
              <Card key={index} className="border-border/50">
                <CardHeader>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-medium">{t(resource.titleKey)}</CardTitle>
                      <CardDescription className="text-balance">{t(resource.descriptionKey)}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {resource.tipKeys.map((tipKey, tipIndex) => (
                      <li key={tipIndex} className="flex gap-3 text-sm leading-relaxed">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-balance text-foreground/90">{t(tipKey)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      ))}
    </Tabs>
  )
}
