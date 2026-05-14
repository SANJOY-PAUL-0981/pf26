"use client"

import { useEffect, useRef } from "react"
import rough from "roughjs"
import Link from "next/link"
import { cn } from "@/lib/utils"

type RoughButtonOptions = {
  seed?: number
  stroke?: string
  strokeWidth?: number
  fillStyle?: "solid" | "hachure" | "zigzag" | "cross-hatch" | "dots" | "dashed" | "zigzag-line"
  hachureGap?: number
  hachureAngle?: number
  roughness?: number
  bowing?: number
}

type ButtonProps = {
  children: React.ReactNode
  href?: string
  external?: boolean
  onClick?: () => void
  variant?: "yellow" | "purple" | "green"
  className?: string
  roughOptions?: RoughButtonOptions
}

export function Button({
  children,
  href,
  onClick,
  variant = "yellow",
  className,
  roughOptions
}: ButtonProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const colors = {
    yellow: "#fde047",
    purple: "#c084fc",
    green: "#86efac"
  }

  const defaultSeed =
    variant === "yellow" ? 50 :
      variant === "purple" ? 100 :
        150

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    svg.replaceChildren()

    const rc = rough.svg(svg)

    const shape = rc.rectangle(5, 5, 190, 52, {
      seed: roughOptions?.seed ?? defaultSeed,
      stroke: roughOptions?.stroke ?? "#111",
      strokeWidth: roughOptions?.strokeWidth ?? 1.7,
      fill: colors[variant],
      fillStyle: roughOptions?.fillStyle ?? "hachure",
      hachureGap: roughOptions?.hachureGap ?? 5,
      hachureAngle: roughOptions?.hachureAngle ?? -10,
      roughness: roughOptions?.roughness ?? 1.4,
      bowing: roughOptions?.bowing ?? 0.8,
    })

    svg.appendChild(shape)
  }, [variant])

  const inner = (
    <span
      className={cn(
        "relative inline-flex h-[62px] w-[200px] items-center justify-center",
        "font-bold text-black",
        "transition-transform duration-150 hover:-rotate-1 hover:-translate-y-1",
        className
      )}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 200 62"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <span className="relative z-10">{children}</span>
    </span>
  )

  if (href) return <Link href={href}>{inner}</Link>

  return (
    <button type="button" onClick={onClick} className="inline-block">
      {inner}
    </button>
  )
}