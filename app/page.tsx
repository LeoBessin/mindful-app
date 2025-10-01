import { MBITestCard } from "@/components/mbi-test-card"
import { WelcomeHeader } from "@/components/welcome-header"
import { QuickActions } from "@/components/quick-actions"
import { TodaysTip } from "@/components/todays-tip"

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <WelcomeHeader />
        <MBITestCard />
        <TodaysTip />
        <QuickActions />
      </div>
    </main>
  )
}
