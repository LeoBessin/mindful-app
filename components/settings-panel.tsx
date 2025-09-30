"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Trash2 } from "lucide-react"

export function SettingsPanel() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("notificationsEnabled")
    if (saved) {
      setNotificationsEnabled(JSON.parse(saved))
    }
  }, [])

  const handleNotificationToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled)
    localStorage.setItem("notificationsEnabled", JSON.stringify(enabled))

    if (enabled && "Notification" in window) {
      Notification.requestPermission()
    }
  }

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all your check-in data? This cannot be undone.")) {
      localStorage.removeItem("checkIns")
      alert("Your data has been cleared.")
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-4">
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium">Notifications</CardTitle>
              <CardDescription className="text-balance">
                Gentle reminders to check in and practice self-care
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-sm font-normal">
              Enable daily reminders
            </Label>
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
          </div>
          <p className="text-xs text-muted-foreground text-balance leading-relaxed">
            We'll send you a gentle reminder once a day to complete your check-in. You can adjust the timing in your
            device settings.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Privacy</CardTitle>
          <CardDescription className="text-balance">Your data is stored locally on your device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-balance leading-relaxed">
            All your check-ins and progress data are stored only on this device. We don't collect or share any personal
            information. Your wellness journey is completely private.
          </p>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium">Data Management</CardTitle>
              <CardDescription className="text-balance">Clear all your check-in history</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleClearData} className="w-full">
            Clear All Data
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
