"use client"

import { useEffect, useMemo, useState } from "react"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { SketchBorder } from "@/components/ui/SketchBorder"
import { Tape } from "@/components/ui/Tape"

type MappedContributionDay = {
    date: string
    count: number
    level: number
}

type GithubContributionResponse = {
    username: string
    totalContributions: number
    data: MappedContributionDay[]
}

const levelColors: Record<number, string> = {
    0: "#ebedf0",
    1: "#9be9a8",
    2: "#40c463",
    3: "#30a14e",
    4: "#216e39",
}

const CELL_SIZE = 12
const CELL_GAP = 4
const CELL_STEP = CELL_SIZE + CELL_GAP

function chunkIntoWeeks(days: MappedContributionDay[]): MappedContributionDay[][] {
    const weeks: MappedContributionDay[][] = []
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7))
    }
    return weeks
}

/**
 * Returns one label per month transition, with the x-offset (in px) based on
 * which week column the first day of that month falls into.
 */
function getMonthLabels(weeks: MappedContributionDay[][]) {
    const labels: { month: string; weekIndex: number }[] = []
    let prevMonth = ""

    weeks.forEach((week, weekIndex) => {
        const firstDay = week[0]
        if (!firstDay) return

        const date = new Date(firstDay.date + "T00:00:00")
        const month = date.toLocaleString("en-US", { month: "short" })

        if (month !== prevMonth) {
            labels.push({ month, weekIndex })
            prevMonth = month
        }
    })

    return labels
}

function ContributionTooltip({
    day,
    visible,
}: {
    day: MappedContributionDay | null
    visible: boolean
}) {
    if (!visible || !day) return null

    const date = new Date(day.date + "T00:00:00")
    const formatted = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    return (
        <div
            className="pointer-events-none absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-black/15 bg-white px-2 py-1 text-xs font-bold shadow-md"
            style={{ fontFamily: "monospace" }}
        >
            {day.count === 0 ? "No contributions" : `${day.count} contribution${day.count !== 1 ? "s" : ""}`}
            <span className="ml-1 font-normal text-black/50">· {formatted}</span>
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-2">
                    <div className="h-8 w-48 rounded-md bg-black/10" />
                    <div className="h-4 w-32 rounded-md bg-black/10" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-8 rounded bg-black/10" />
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-3 w-3 rounded-sm bg-black/10" />
                    ))}
                    <div className="h-4 w-8 rounded bg-black/10" />
                </div>
            </div>

            <div className="overflow-x-auto pb-2">
                <div className="flex min-w-[760px] gap-[4px]">
                    {Array.from({ length: 53 }).map((_, wi) => (
                        <div key={wi} className="flex flex-col gap-[4px]">
                            {Array.from({ length: 7 }).map((_, di) => (
                                <div
                                    key={di}
                                    className="h-[12px] w-[12px] rounded-[3px] bg-black/10"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function GithubContributions() {
    const [data, setData] = useState<GithubContributionResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [hoveredDay, setHoveredDay] = useState<MappedContributionDay | null>(null)
    const [tooltipVisible, setTooltipVisible] = useState(false)

    const username = "SANJOY-PAUL-0981"

    useEffect(() => {
        async function fetchContributions() {
            try {
                const res = await fetch(`/api/github-contributions/${username}`)
                const json = await res.json()

                if (!res.ok) {
                    throw new Error(json.error ?? "Failed to fetch GitHub data")
                }

                const days: MappedContributionDay[] = json.data ?? []
                setData({
                    username: json.username ?? username,
                    totalContributions:
                        json.totalContributions ??
                        days.reduce((sum: number, d: MappedContributionDay) => sum + d.count, 0),
                    data: days,
                })
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch GitHub contributions"
                )
            } finally {
                setLoading(false)
            }
        }

        fetchContributions()
    }, [])

    const weeks = useMemo(() => {
        if (!data?.data) return []
        return chunkIntoWeeks(data.data)
    }, [data])

    const monthLabels = useMemo(() => {
        if (!weeks.length) return []
        return getMonthLabels(weeks)
    }, [weeks])

    return (
        <section id="github" className="mx-auto max-w-6xl px-6 py-14">
            {/* Section heading */}
            <div className="relative inline-block">
                <SectionTitle
                    variant="green"
                    width={200}
                    height={58}
                    rotate={2}
                    roughOptions={{
                        hachureGap: 0.75
                    }}
                    titleClassName="gap-3 text-3xl"
                >
                    GitHub
                </SectionTitle>
            </div>

            <div className="mt-8 flex justify-center relative">
                <Tape
                    variant="green"
                    tapeStyle="side-torn"
                    width={110}
                    height={46}
                    rotate={-42}
                    className="absolute left-15 -top-2 z-20"
                />

                <Tape
                    variant="green"
                    tapeStyle="side-torn"
                    width={110}
                    height={46}
                    rotate={42}
                    className="absolute left-234 -top-2 z-20"
                />

                <SketchBorder
                    shape="rounded-rectangle"
                    radius={24}
                    borderStyle="dashed"
                    transparent={false}
                    fillColor="#fffbf2"
                    borderColor="#111"
                    width="82%" className="w-full"
                    padding={26}
                    roughOptions={{
                        roughness: 0.9,
                        bowing: 0.6,
                        strokeWidth: 1.8,
                        fillStyle: "hachure",
                        hachureGap: 5,
                        hachureAngle: -10,
                    }}
                >
                    {/* Loading state */}
                    {loading && <LoadingSkeleton />}

                    {/* Error state */}
                    {!loading && error && (
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-base font-black text-red-500">
                                ⚠ Failed to load activity
                            </p>
                            <p className="text-sm font-semibold text-black/50">{error}</p>
                        </div>
                    )}

                    {/* Loaded state */}
                    {!loading && !error && data && (
                        <div>
                            {/* Header row */}
                            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h3 className="text-2xl font-black leading-none text-black">
                                        {data.totalContributions.toLocaleString()}
                                        <span className="ml-2 font-extrabold text-black/40">
                                            contributions
                                        </span>
                                    </h3>
                                    <p className="mt-1 text-sm font-semibold text-black/50">
                                        in the last year · @{data.username}
                                    </p>
                                </div>

                                {/* Legend */}
                                <div className="flex items-center gap-2 text-xs font-bold text-black/50">
                                    <span>Less</span>
                                    <div className="flex items-center gap-[3px]">
                                        {[0, 1, 2, 3, 4].map((level) => (
                                            <span
                                                key={level}
                                                className="inline-block h-[11px] w-[11px] rounded-[3px] border border-black/15"
                                                style={{ backgroundColor: levelColors[level] }}
                                            />
                                        ))}
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>

                            {/* Contribution grid */}
                            <div className="overflow-x-auto pb-2">
                                <div
                                    className="relative"
                                    style={{ minWidth: `${weeks.length * CELL_STEP}px` }}
                                >
                                    {/* Month labels — positioned by weekIndex */}
                                    <div
                                        className="relative mb-[6px] h-[14px]"
                                        style={{ width: `${weeks.length * CELL_STEP}px` }}
                                    >
                                        {monthLabels.map(({ month, weekIndex }) => (
                                            <span
                                                key={`${month}-${weekIndex}`}
                                                className="absolute text-[10px] font-bold uppercase tracking-wide text-black/40"
                                                style={{ left: `${weekIndex * CELL_STEP}px` }}
                                            >
                                                {month}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Grid of weeks × days */}
                                    <div className="flex gap-[4px]">
                                        {weeks.map((week, weekIndex) => (
                                            <div key={weekIndex} className="flex flex-col gap-[4px]">
                                                {/* Pad incomplete first week with empty slots at top */}
                                                {weekIndex === 0 &&
                                                    week.length < 7 &&
                                                    Array.from({ length: 7 - week.length }).map((_, pi) => (
                                                        <div
                                                            key={`pad-${pi}`}
                                                            className="h-[12px] w-[12px]"
                                                        />
                                                    ))}

                                                {week.map((day) => (
                                                    <div
                                                        key={day.date}
                                                        onMouseEnter={() => {
                                                            setHoveredDay(day)
                                                            setTooltipVisible(true)
                                                        }}
                                                        onMouseLeave={() => setTooltipVisible(false)}
                                                        className="relative h-[12px] w-[12px] cursor-default rounded-[3px] border border-black/10 transition-transform duration-100 hover:scale-[1.35] hover:border-black/30"
                                                        style={{
                                                            backgroundColor: levelColors[day.level] ?? levelColors[0],
                                                        }}
                                                    >
                                                        {hoveredDay?.date === day.date && (
                                                            <ContributionTooltip
                                                                day={hoveredDay}
                                                                visible={tooltipVisible}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Day-of-week labels (Mon / Wed / Fri) */}
                                    <div
                                        className="pointer-events-none absolute -left-7 top-[14px] flex flex-col"
                                        style={{ gap: `${CELL_GAP}px` }}
                                        aria-hidden="true"
                                    >
                                        {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center text-[10px] font-bold text-black/30"
                                                style={{ height: `${CELL_SIZE}px` }}
                                            >
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer stats */}
                            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-t border-dashed border-black/15 pt-4">
                                <Stat
                                    label="longest streak"
                                    value={computeLongestStreak(data.data)}
                                    unit="days"
                                />
                                <Stat
                                    label="current streak"
                                    value={computeCurrentStreak(data.data)}
                                    unit="days"
                                />
                                <Stat
                                    label="best day"
                                    value={Math.max(...data.data.map((d) => d.count))}
                                    unit="contributions"
                                />
                            </div>
                        </div>
                    )}
                </SketchBorder>
            </div>
        </section>
    )
}

function Stat({
    label,
    value,
    unit,
}: {
    label: string
    value: number
    unit: string
}) {
    return (
        <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-black">{value}</span>
            <span className="text-xs font-semibold text-black/40">
                {unit} · {label}
            </span>
        </div>
    )
}

function computeLongestStreak(days: MappedContributionDay[]): number {
    let max = 0
    let current = 0
    for (const day of days) {
        if (day.count > 0) {
            current++
            max = Math.max(max, current)
        } else {
            current = 0
        }
    }
    return max
}

function computeCurrentStreak(days: MappedContributionDay[]): number {
    let streak = 0
    for (let i = days.length - 1; i >= 0; i--) {
        if (days[i].count > 0) {
            streak++
        } else {
            break
        }
    }
    return streak
}