"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()} className="flex-shrink-0">
      <ArrowLeft className="w-5 h-5" />
      <span className="sr-only">Go back</span>
    </Button>
  )
}
