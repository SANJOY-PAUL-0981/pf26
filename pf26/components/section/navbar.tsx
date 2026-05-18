"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import rough from "roughjs"
import { Tape } from "@/components/ui/Tape"
import github from "../../public/icons/github.png"
import linkedin from "../../public/icons/linkedin.png"
import x from "../../public/icons/x.png"
import mail from "../../public/icons/mail.png"
import resume from "../../public/icons/resume.png"

type RoughLineStyle = "wavy" | "straight"

const NAV_BOTTOM_LINE_STYLE: RoughLineStyle = "wavy"
const ACTIVE_LINE_STYLE: RoughLineStyle = "straight"

const navItems = [
    { label: "About & Skills", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
]

function getWavyPath(width: number, y: number) {
    return `
    M 0 ${y}
    C ${width * 0.12} ${y - 8}, ${width * 0.22} ${y + 8}, ${width * 0.35} ${y}
    C ${width * 0.48} ${y - 8}, ${width * 0.62} ${y + 8}, ${width * 0.75} ${y}
    C ${width * 0.86} ${y - 7}, ${width * 0.94} ${y + 7}, ${width} ${y}
  `
}

function getSmallWavyPath(width: number, y: number) {
    return `
    M 0 ${y}
    C ${width * 0.25} ${y - 5}, ${width * 0.35} ${y + 5}, ${width * 0.5} ${y}
    C ${width * 0.65} ${y - 5}, ${width * 0.75} ${y + 5}, ${width} ${y}
  `
}

export function Navbar() {
    const headerRef = useRef<HTMLElement | null>(null)
    const bottomSvgRef = useRef<SVGSVGElement | null>(null)

    const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
    const activeSvgRef = useRef<SVGSVGElement | null>(null)
    const navListRef = useRef<HTMLDivElement | null>(null)

    const [activeHref, setActiveHref] = useState("#about")
    const [activeLine, setActiveLine] = useState({
        left: 0,
        width: 0,
    })

    useEffect(() => {
        const header = headerRef.current
        const svg = bottomSvgRef.current
        if (!header || !svg) return

        const draw = () => {
            const rect = header.getBoundingClientRect()
            const width = rect.width
            const height = 18

            svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
            svg.replaceChildren()

            const rc = rough.svg(svg)

            const node =
                NAV_BOTTOM_LINE_STYLE === "wavy"
                    ? rc.path(getWavyPath(width, 9), {
                        seed: 333,
                        stroke: "#111",
                        strokeWidth: 2.2,
                        roughness: 0.5,
                        bowing: 0.9
                    })
                    : rc.line(0, 9, width, 9, {
                        seed: 333,
                        stroke: "#111",
                        strokeWidth: 2.5,
                        roughness: 0.5,
                        bowing: 0.9
                    })

            svg.appendChild(node)
        }

        draw()
        window.addEventListener("resize", draw)

        return () => window.removeEventListener("resize", draw)
    }, [])

    useEffect(() => {
        const sectionIds = navItems.map((item) => item.href.replace("#", ""))

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting)

                if (visibleEntries.length > 0) {
                    const topMost = visibleEntries.sort(
                        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
                    )[0]

                    setActiveHref(`#${topMost.target.id}`)
                }
            },
            {
                root: null,
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0,
            }
        )

        sectionIds.forEach((id) => {
            const section = document.getElementById(id)
            if (section) observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const navList = navListRef.current
        const activeEl = navRefs.current[activeHref]

        if (!navList || !activeEl) return

        const navRect = navList.getBoundingClientRect()
        const activeRect = activeEl.getBoundingClientRect()

        setActiveLine({
            left: activeRect.left - navRect.left,
            width: activeRect.width,
        })
    }, [activeHref])

    useEffect(() => {
        const svg = activeSvgRef.current
        if (!svg || activeLine.width <= 0) return

        const width = activeLine.width
        const height = 14

        svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
        svg.replaceChildren()

        const rc = rough.svg(svg)

        const node =
            ACTIVE_LINE_STYLE === "wavy"
                ? rc.path(getSmallWavyPath(width, 7), {
                    seed: 444,
                    stroke: "#a855f7",
                    strokeWidth: 2.5,
                    roughness: 1.5,
                    bowing: 0.8,
                })
                : rc.line(0, 7, width, 7, {
                    seed: 444,
                    stroke: "#a855f7",
                    strokeWidth: 2.5,
                    roughness: 1.5,
                    bowing: 0.8,
                })

        svg.appendChild(node)
    }, [activeLine])

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 px-44 py-5 bg-[#fffbf2]"
        >
            <nav className="mx-auto flex items-center justify-between">
                <Link href="/" className="relative text-2xl font-black text-black">
                    <Tape
                        variant="purple"
                        tapeStyle="side-torn"
                        width={160}
                        height={33}
                        rotate={-4}
                        className="absolute -left-3 top-1 -z-10"
                    />
                    Sanjoy.dev
                </Link>

                <div
                    ref={navListRef}
                    className="relative hidden items-center gap-8 md:flex pl-16"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            ref={(el) => {
                                navRefs.current[item.href] = el
                            }}
                            href={item.href}
                            className="relative font-bold text-black transition-transform hover:-rotate-2 hover:scale-105"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <svg
                        ref={activeSvgRef}
                        className="pointer-events-none absolute -bottom-4 h-[14px] transition-all duration-300"
                        style={{
                            left: activeLine.left,
                            width: activeLine.width,
                        }}
                        aria-hidden="true"
                    />
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="https://github.com/SANJOY-PAUL-0981"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={github} alt="github logo" className="size-11" />
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/sanjoy-paul-b0053122a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={linkedin} alt="linkedin logo" className="size-10" />
                    </Link>

                    <Link
                        href="https://x.com/Sanj0yX"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={x} alt="x logo" className="size-10" />
                    </Link>

                    <Link
                        href="mailto:paulsanjoy2923@gmail.com"
                        aria-label="Email"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={mail} alt="mail logo" className="size-10" />
                    </Link>

                    <Link
                        href="https://drive.google.com/file/d/1h9bpb-RyMJwvI96Pqz75Tz5lRBEGX_wU/view?usp=sharing"
                        target="_blank"
                        aria-label="Resume"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={resume} alt="resume logo" className="size-10" />
                    </Link>
                </div>
            </nav>

            <svg
                ref={bottomSvgRef}
                className="pointer-events-none absolute bottom-0 left-0 h-[18px] w-full translate-y-1/2"
                aria-hidden="true"
            />
        </header>
    )
}