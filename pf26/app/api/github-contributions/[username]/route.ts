import { NextResponse } from "next/server"

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql"

type ContributionLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"

interface ContributionDay {
    date: string
    contributionCount: number
    contributionLevel: ContributionLevel
}

interface ContributionWeek {
    contributionDays: ContributionDay[]
}

interface ContributionCalendar {
    weeks: ContributionWeek[]
}

interface ContributionsCollection {
    contributionCalendar: ContributionCalendar
}

interface GitHubUser {
    contributionsCollection: ContributionsCollection
}

interface GitHubGraphQLResponse {
    data?: {
        user?: GitHubUser
    }
    errors?: { message: string }[]
}

interface MappedContributionDay {
    date: string
    count: number
    level: number
}

function mapContributionLevel(level: ContributionLevel): number {
    switch (level) {
        case "FIRST_QUARTILE":
            return 1
        case "SECOND_QUARTILE":
            return 2
        case "THIRD_QUARTILE":
            return 3
        case "FOURTH_QUARTILE":
            return 4
        default:
            return 0
    }
}

export async function GET(
    request: Request,
    context: { params: Promise<{ username?: string }> }
): Promise<NextResponse> {
    const username = (await context.params)?.username

    if (!username) {
        return NextResponse.json({ error: "Username parameter is required" }, { status: 400 })
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
        return NextResponse.json(
            { error: "GITHUB_TOKEN is not configured" },
            { status: 500 }
        )
    }

    const now = new Date()
    const from = new Date(Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0))
    const to = now
    const fromStr = from.toISOString().slice(0, 19) + "Z"
    const toStr = to.toISOString().slice(0, 19) + "Z"

    const query = `query ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }`

    const body = JSON.stringify({
        query,
        variables: { username, from: fromStr, to: toStr },
    })

    try {
        const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body,
        })

        const json: GitHubGraphQLResponse = await response.json()

        if (!response.ok) {
            return NextResponse.json(
                { error: "GitHub API request failed" },
                { status: response.status }
            )
        }

        if (json.errors?.length) {
            return NextResponse.json(
                { error: json.errors[0]?.message ?? "GraphQL error" },
                { status: 502 }
            )
        }

        const user = json?.data?.user
        if (!user?.contributionsCollection?.contributionCalendar?.weeks) {
            return NextResponse.json({ data: [] })
        }

        const weeks: ContributionWeek[] = user.contributionsCollection.contributionCalendar.weeks
        const data: MappedContributionDay[] = weeks.flatMap((week) =>
            (week.contributionDays ?? []).map((day) => ({
                date: day.date,
                count: day.contributionCount ?? 0,
                level: mapContributionLevel(day.contributionLevel ?? "NONE"),
            }))
        )

        const totalContributions = data.reduce((sum, d) => sum + d.count, 0)
        return NextResponse.json({ username, totalContributions, data })
    } catch (error) {
        console.error("GitHub contributions API error:", error)
        return NextResponse.json(
            { error: "Failed to fetch contribution data" },
            { status: 500 }
        )
    }
}