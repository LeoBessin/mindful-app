"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Brain, Moon, Users, Lightbulb } from "lucide-react"

type Resource = {
  title: string
  description: string
  icon: typeof Heart
  tips: string[]
}

const resources: Record<string, Resource[]> = {
  stress: [
    {
      title: "Understanding Stress",
      description: "Learn to recognize and manage stress signals",
      icon: Brain,
      tips: [
        "Stress is a natural response, not a weakness",
        "Physical symptoms include tension, rapid heartbeat, and shallow breathing",
        "Chronic stress needs attention - don't ignore persistent symptoms",
        "Small daily practices are more effective than occasional big efforts",
      ],
    },
    {
      title: "Quick Stress Relief",
      description: "Techniques you can use anywhere, anytime",
      icon: Lightbulb,
      tips: [
        "5-4-3-2-1 grounding: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste",
        "Progressive muscle relaxation: Tense and release each muscle group",
        "Cold water on wrists or face activates the calming response",
        "Humming or singing stimulates the vagus nerve, reducing stress",
      ],
    },
  ],
  burnout: [
    {
      title: "Recognizing Burnout",
      description: "Signs that you need to prioritize rest",
      icon: Moon,
      tips: [
        "Emotional exhaustion and feeling drained most days",
        "Cynicism or detachment from work or relationships",
        "Reduced performance despite effort",
        "Physical symptoms like headaches, digestive issues, or insomnia",
        "Loss of motivation or sense of accomplishment",
      ],
    },
    {
      title: "Preventing Burnout",
      description: "Build sustainable habits for long-term wellness",
      icon: Heart,
      tips: [
        "Set clear boundaries between work and personal time",
        "Schedule regular breaks throughout your day",
        "Practice saying no to non-essential commitments",
        "Prioritize sleep - aim for 7-9 hours consistently",
        "Engage in activities purely for enjoyment, not productivity",
        "Connect with supportive people regularly",
      ],
    },
  ],
  mindfulness: [
    {
      title: "Daily Mindfulness",
      description: "Simple practices for present-moment awareness",
      icon: Brain,
      tips: [
        "Start with just 2-3 minutes daily - consistency matters more than duration",
        "Mindful eating: Notice colors, textures, flavors without distraction",
        "Body scan: Check in with physical sensations throughout the day",
        "Mindful walking: Feel each step, notice your surroundings",
        "Single-tasking: Give full attention to one activity at a time",
      ],
    },
    {
      title: "Meditation Basics",
      description: "Getting started with meditation practice",
      icon: Moon,
      tips: [
        "There's no 'perfect' meditation - any practice is beneficial",
        "Wandering mind is normal - gently return focus without judgment",
        "Try different styles: breath focus, body scan, loving-kindness, or guided",
        "Morning practice sets a calm tone for the day",
        "Use apps or timers to build consistency",
      ],
    },
  ],
  connection: [
    {
      title: "Social Wellness",
      description: "The importance of meaningful connections",
      icon: Users,
      tips: [
        "Quality matters more than quantity in relationships",
        "Regular check-ins with loved ones support mental health",
        "Vulnerability strengthens bonds - share how you really feel",
        "Set boundaries with draining relationships",
        "Join groups aligned with your interests or values",
      ],
    },
    {
      title: "Self-Compassion",
      description: "Treating yourself with kindness",
      icon: Heart,
      tips: [
        "Talk to yourself like you would a good friend",
        "Acknowledge difficulties without harsh self-judgment",
        "Remember that everyone struggles - you're not alone",
        "Self-care isn't selfish - it enables you to show up for others",
        "Celebrate small wins and progress, not just big achievements",
      ],
    },
  ],
}

export function ResourceLibrary() {
  return (
    <Tabs defaultValue="stress" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="stress">Stress</TabsTrigger>
        <TabsTrigger value="burnout">Burnout</TabsTrigger>
        <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
        <TabsTrigger value="connection">Connection</TabsTrigger>
      </TabsList>

      {Object.entries(resources).map(([category, items]) => (
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
                      <CardTitle className="text-lg font-medium">{resource.title}</CardTitle>
                      <CardDescription className="text-balance">{resource.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {resource.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex gap-3 text-sm leading-relaxed">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-balance text-foreground/90">{tip}</span>
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
