"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Trash2, Globe } from "lucide-react"

export function SettingsPanel() {
  const { t, i18n } = useTranslation()
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

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language)
    localStorage.setItem("selectedLanguage", language)
  }

  const handleClearData = () => {
    if (confirm(t('confirm_clear_data'))) {
      localStorage.removeItem("checkIns")
      alert(t('data_cleared'))
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
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium">{t('language')}</CardTitle>
              <CardDescription className="text-balance">
                {t('choose_preferred_language')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="language" className="text-sm font-normal">
              {t('language')}
            </Label>
            <Select value={i18n.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('english')}</SelectItem>
                <SelectItem value="fr">{t('french')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium">{t('notifications')}</CardTitle>
              <CardDescription className="text-balance">
                {t('gentle_reminders')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-sm font-normal">
              {t('enable_daily_reminders')}
            </Label>
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
          </div>
          <p className="text-xs text-muted-foreground text-balance leading-relaxed">
            {t('notification_description')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">{t('privacy')}</CardTitle>
          <CardDescription className="text-balance">{t('data_stored_locally')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-balance leading-relaxed">
            {t('privacy_description')}
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
              <CardTitle className="text-lg font-medium">{t('data_management')}</CardTitle>
              <CardDescription className="text-balance">{t('clear_checkin_history')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleClearData} className="w-full">
            {t('clear_all_data')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
