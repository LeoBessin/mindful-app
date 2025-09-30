"use client"

import { useEffect, useState } from "react"

export function WelcomeHeader() {
  const [greeting, setGreeting] = useState("Hello")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
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
      <h1 className="text-3xl font-light text-foreground text-balance">{greeting}</h1>
      <p className="text-muted-foreground text-balance">How are you feeling today?</p>
    </div>
  )
}
