"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type CheckIn = {
  mood: "great" | "okay" | "low"
  energy: "high" | "medium" | "low"
  stress: "low" | "medium" | "high"
  timestamp: string
}

type MoodChartProps = {
  checkIns: CheckIn[]
}

const moodToValue = {
  great: 3,
  okay: 2,
  low: 1,
}

export function MoodChart({ checkIns }: MoodChartProps) {
  const chartData = useMemo(() => {
    return checkIns
      .slice(-14)
      .map((checkIn) => ({
        date: new Date(checkIn.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        mood: moodToValue[checkIn.mood],
      }))
      .reverse()
  }, [checkIns])

  const chartConfig = {
    mood: {
      label: "Mood",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
        <YAxis
          domain={[0, 4]}
          ticks={[1, 2, 3]}
          tickFormatter={(value) => {
            if (value === 1) return "Low"
            if (value === 2) return "Okay"
            if (value === 3) return "Great"
            return ""
          }}
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="mood"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          fill="url(#moodGradient)"
          fillOpacity={1}
        />
      </AreaChart>
    </ChartContainer>
  )
}
