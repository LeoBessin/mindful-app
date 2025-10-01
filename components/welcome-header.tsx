"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export function WelcomeHeader() {
  const { t } = useTranslation()
  const [greeting, setGreeting] = useState("hello")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("good_morning")
    else if (hour < 18) setGreeting("good_afternoon")
    else setGreeting("good_evening")
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-light text-foreground">Hello</h1>
        <p className="text-muted-foreground text-balance">How are you feeling today?</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 animate-in fade-in duration-500">
      <h1 className="text-3xl font-light text-foreground text-balance">{t(greeting)}</h1>
      <p className="text-muted-foreground text-balance">{t('how_are_you_feeling_today')}</p>
    </div>
  )
}
