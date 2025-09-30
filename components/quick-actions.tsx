import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wind, TrendingUp, Library, Settings } from "lucide-react"

export function QuickActions() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground px-1">Quick Actions</h2>
      <div className="grid gap-3">
        <Link href="/exercises" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-transparent" size="lg">
            <Wind className="w-5 h-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-medium">Mindfulness Exercises</div>
              <div className="text-xs text-muted-foreground">Guided breathing and relaxation</div>
            </div>
          </Button>
        </Link>

        <Link href="/progress" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-transparent" size="lg">
            <TrendingUp className="w-5 h-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-medium">View Progress</div>
              <div className="text-xs text-muted-foreground">Track your wellness journey</div>
            </div>
          </Button>
        </Link>

        <Link href="/library" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-transparent" size="lg">
            <Library className="w-5 h-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-medium">Resource Library</div>
              <div className="text-xs text-muted-foreground">Tips and techniques</div>
            </div>
          </Button>
        </Link>

        <Link href="/settings" className="block">
          <Button variant="outline" className="w-full justify-start h-auto py-4 px-4 bg-transparent" size="lg">
            <Settings className="w-5 h-5 mr-3 text-primary" />
            <div className="text-left">
              <div className="font-medium">Settings</div>
              <div className="text-xs text-muted-foreground">Notifications and privacy</div>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  )
}
