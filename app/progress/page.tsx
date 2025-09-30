import { ProgressTracker } from "@/components/progress-tracker"
import { BackButton } from "@/components/back-button"

export default function ProgressPage() {
  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-medium text-balance">Your Progress</h1>
            <p className="text-sm text-muted-foreground">Track your wellness journey over time</p>
          </div>
        </div>
        <ProgressTracker />
      </div>
    </main>
  )
}
