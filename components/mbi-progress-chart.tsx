"use client"

import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

type MBIResult = {
  level: "high" | "medium" | "low"
  timestamp: string
  answers: Record<string, number>
}

type MBIProgressChartProps = {
  mbiResults: MBIResult[]
}

const levelToValue = {
  low: 1,
  medium: 2,
  high: 3,
}

const levelToLabel = {
  low: "Basic",
  medium: "Moderate",
  high: "Excellent",
}

export function MBIProgressChart({ mbiResults }: MBIProgressChartProps) {
  const { t } = useTranslation()

  const chartData = useMemo(() => {
    return mbiResults
      .slice(-10) // Show last 10 results
      .map((result, index) => ({
        date: new Date(result.timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          ...(mbiResults.length > 7 ? {} : { year: "2-digit" })
        }),
        level: levelToValue[result.level],
        levelName: levelToLabel[result.level],
        testNumber: index + 1,
      }))
  }, [mbiResults])

  const chartConfig = {
    level: {
      label: t("mindfulness_level"),
      color: "hsl(var(--primary))",
    },
  }

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        {t("no_mbi_data_available")}
      </div>
    )
  }

  if (chartData.length === 1) {
    const singleResult = chartData[0]
    return (
      <div className="h-[300px] flex flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {singleResult.levelName}
          </div>
          <div className="text-muted-foreground">
            {t("first_mbi_result")}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {t("complete_more_tests_to_see_progress")}
          </div>
        </div>
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            domain={[0.5, 3.5]}
            ticks={[1, 2, 3]}
            tickFormatter={(value) => {
              if (value === 1) return t("basic")
              if (value === 2) return t("moderate")
              if (value === 3) return t("excellent")
              return ""
            }}
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {label}
                        </span>
                        <span className="font-bold text-foreground">
                          {t(data.levelName.toLowerCase())} {t("mindfulness_level")}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="level"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{
              fill: "hsl(var(--primary))",
              strokeWidth: 2,
              stroke: "hsl(var(--background))",
              r: 5
            }}
            activeDot={{
              r: 7,
              stroke: "hsl(var(--primary))",
              strokeWidth: 2,
              fill: "hsl(var(--background))"
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
