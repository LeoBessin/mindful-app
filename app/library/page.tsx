import { ResourceLibrary } from "@/components/resource-library"
import { BackButton } from "@/components/back-button"

export default function LibraryPage() {
  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-2xl font-medium text-balance">Resource Library</h1>
            <p className="text-sm text-muted-foreground">Tips and techniques for mental wellness</p>
          </div>
        </div>
        <ResourceLibrary />
      </div>
    </main>
  )
}
