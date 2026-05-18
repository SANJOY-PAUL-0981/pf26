"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import rough from "roughjs"
import { Heart, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

type FooterProps = {
    className?: string
}

export function Footer({ className }: FooterProps) {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const wrapperRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const svg = svgRef.current
        const wrapper = wrapperRef.current

        if (!svg || !wrapper) return

        const rect = wrapper.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        if (width <= 0 || height <= 0) return

        svg.replaceChildren()

        const rc = rough.svg(svg)

        const waveHeight = 28

        const path = `
      M 0 ${waveHeight}
      C ${width * 0.12} ${waveHeight - 26}, ${width * 0.22} ${waveHeight + 22}, ${width * 0.35} ${waveHeight}
      C ${width * 0.48} ${waveHeight - 22}, ${width * 0.62} ${waveHeight + 24}, ${width * 0.75} ${waveHeight}
      C ${width * 0.86} ${waveHeight - 18}, ${width * 0.94} ${waveHeight + 14}, ${width} ${waveHeight}
      L ${width} ${height}
      L 0 ${height}
      Z
    `

        const footerShape = rc.path(path, {
            seed: 777,
            stroke: "#111",
            strokeWidth: 1.8,
            fill: "#fef3c7",
            fillStyle: "hachure",
            hachureGap: 9,
            hachureAngle: -12,
            roughness: 1.4,
            bowing: 0.8,
        })

        svg.appendChild(footerShape)
    }, [])

    return (
        <footer
            ref={wrapperRef}
            className={cn(
                "relative mt-20 min-h-[170px] overflow-visible mb-18",
                className
            )}
        >
            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto flex min-h-[170px] max-w-6xl flex-col items-center justify-center gap-4 px-6 pt-10 text-center">
                <p className="text-sm font-bold text-black/60">
                    © {new Date().getFullYear()} Sanjoy Paul. All rights reserved.
                </p>

                <p className="flex flex-wrap items-center justify-center gap-2 text-base font-black text-black">
                    Made with
                    <Heart
                        size={18}
                        className="fill-pink-400 text-pink-400"
                    />
                    by{" "}
                    <span className="rounded-md bg-purple-200 px-2 py-0.5">
                        @Sanj0yx
                    </span>
                </p>

                <Link
                    href="#home"
                    className="group mt-1 inline-flex items-center gap-2 text-sm font-black text-black underline decoration-wavy underline-offset-4 transition-transform duration-150 hover:-translate-y-1"
                >
                    Back to home
                    <ArrowUp
                        size={16}
                        className="transition-transform duration-150 group-hover:-translate-y-1"
                    />
                </Link>
            </div>
        </footer>
    )
}