"use client"

import { useEffect, useRef, useState } from "react"
import rough from "roughjs"
import Link from "next/link"
import { cn } from "@/lib/utils"

type RoughButtonOptions = {
  seed?: number
  stroke?: string
  strokeWidth?: number
  fillStyle?:
    | "solid"
    | "hachure"
    | "zigzag"
    | "cross-hatch"
    | "dots"
    | "dashed"
    | "zigzag-line"
  hachureGap?: number
  hoverHachureGap?: number
  hachureAngle?: number
  roughness?: number
  hoverRoughness?: number
  bowing?: number
}

type ButtonVariant = "yellow" | "purple" | "green"

type ButtonProps = {
  children: React.ReactNode
  href?: string
  external?: boolean
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
  textClassName?: string
  roughOptions?: RoughButtonOptions

  width?: number
  height?: number
  x?: number
  y?: number
  fontSize?: number
  paddingX?: number
  fontWeight?: "normal" | "medium" | "semibold" | "bold"

  hoverSketch?: boolean
}

const colors: Record<ButtonVariant, string> = {
  yellow: "#fde047",
  purple: "#c084fc",
  green: "#86efac",
}

const seedMap: Record<ButtonVariant, number> = {
  yellow: 50,
  purple: 100,
  green: 150,
}

const fontWeightMap = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

export function Button({
  children,
  href,
  external = false,
  onClick,
  variant = "yellow",
  className,
  textClassName,
  roughOptions,

  width = 180,
  height = 48,
  x = 5,
  y = 5,
  fontSize = 18,
  paddingX = 18,
  fontWeight = "bold",

  hoverSketch = true,
}: ButtonProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    svg.replaceChildren()

    const rc = rough.svg(svg)

    const normalHachureGap = roughOptions?.hachureGap ?? 5
    const hoverHachureGap = roughOptions?.hoverHachureGap ?? 0.75

    const normalRoughness = roughOptions?.roughness ?? 1.4
    const hoverRoughness = roughOptions?.hoverRoughness ?? 1.9

    const shape = rc.rectangle(x, y, width, height, {
      seed: roughOptions?.seed ?? seedMap[variant],
      stroke: roughOptions?.stroke ?? "#111",
      strokeWidth: roughOptions?.strokeWidth ?? 1.7,
      fill: colors[variant],
      fillStyle: roughOptions?.fillStyle ?? "hachure",
      hachureGap:
        hoverSketch && isHovered ? hoverHachureGap : normalHachureGap,
      hachureAngle: roughOptions?.hachureAngle ?? -10,
      roughness:
        hoverSketch && isHovered ? hoverRoughness : normalRoughness,
      bowing: roughOptions?.bowing ?? 0.8,
    })

    svg.appendChild(shape)
  }, [variant, width, height, x, y, roughOptions, isHovered, hoverSketch])

  const totalWidth = width + x * 2
  const totalHeight = height + y * 2

  const inner = (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative inline-flex items-center justify-center",
        "text-black transition-transform duration-150 ease-out",
        "hover:-rotate-1 hover:-translate-y-1",
        className
      )}
      style={{
        width: totalWidth,
        height: totalHeight,
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="absolute inset-0 h-full w-full transition-opacity duration-150"
        aria-hidden="true"
      />

      <span
        className={cn("relative z-10", textClassName)}
        style={{
          fontSize,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          fontWeight: fontWeightMap[fontWeight],
        }}
      >
        {children}
      </span>
    </span>
  )

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className="inline-block">
      {inner}
    </button>
  )
}