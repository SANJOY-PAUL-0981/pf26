"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import rough from "roughjs"
import { Menu, X } from "lucide-react"

import github from "../../public/icons/github.png"
import linkedin from "../../public/icons/linkedin.png"
import x from "../../public/icons/x.png"
import mail from "../../public/icons/mail.png"
import resume from "../../public/icons/resume.png"
import logo from "@/public/doodles/logo.png"

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

    const [isOpen, setIsOpen] = useState(false)

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
                        bowing: 0.9,
                    })
                    : rc.line(0, 9, width, 9, {
                        seed: 333,
                        stroke: "#111",
                        strokeWidth: 2.5,
                        roughness: 0.5,
                        bowing: 0.9,
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
            className="sticky top-0 z-50 bg-[#fffbf2] px-44 py-5 max-xl:px-20 max-lg:px-8 max-md:px-4 max-md:py-3 font-family-hand"
        >
            <nav className="mx-auto flex items-center justify-between">
                <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="relative flex h-12 w-[180px] items-center overflow-visible pt-5 max-md:w-[135px] max-md:pt-3"
                >
                    <Image
                        src={logo}
                        alt="logo sanjoydev"
                        className="h-12 w-auto scale-[2.75] origin-left object-contain max-md:scale-[2.15]"
                        priority
                    />
                </Link>

                <div
                    ref={navListRef}
                    className="relative hidden items-center gap-8 pl-16 md:flex max-lg:gap-5 max-lg:pl-6 max-md:hidden"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            ref={(el) => {
                                navRefs.current[item.href] = el
                            }}
                            href={item.href}
                            className="relative font-bold text-black transition-transform hover:-rotate-2 hover:scale-105 max-lg:text-sm"
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

                <div className="hidden items-center gap-3 md:flex max-lg:gap-2 max-md:hidden">
                    <Link
                        href="https://github.com/SANJOY-PAUL-0981"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={github} alt="github logo" className="size-11 max-lg:size-9" />
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/sanjoy-paul-b0053122a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={linkedin} alt="linkedin logo" className="size-10 max-lg:size-8" />
                    </Link>

                    <Link
                        href="https://x.com/Sanj0yX"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={x} alt="x logo" className="size-10 max-lg:size-8" />
                    </Link>

                    <Link
                        href="mailto:paulsanjoy2923@gmail.com"
                        aria-label="Email"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={mail} alt="mail logo" className="size-10 max-lg:size-8" />
                    </Link>

                    <Link
                        href="https://drive.google.com/file/d/1h9bpb-RyMJwvI96Pqz75Tz5lRBEGX_wU/view?usp=sharing"
                        target="_blank"
                        aria-label="Resume"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={resume} alt="resume logo" className="size-10 max-lg:size-8" />
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="hidden rounded-xl border-2 border-black bg-white/70 p-2 text-black shadow-[3px_3px_0_#111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none max-md:inline-flex"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {isOpen && (
                <div className="mt-4 hidden rounded-2xl border-2 border-black bg-[#fffbf2] p-4 shadow-[5px_5px_0_#111] max-md:block">
                    <div className="grid gap-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-xl border-2 border-black bg-white px-4 py-3 text-center font-black text-black transition-transform active:scale-95"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-4">
                        <Link
                            href="https://github.com/SANJOY-PAUL-0981"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            onClick={() => setIsOpen(false)}
                        >
                            <Image src={github} alt="github logo" className="size-10" />
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/sanjoy-paul-b0053122a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            onClick={() => setIsOpen(false)}
                        >
                            <Image src={linkedin} alt="linkedin logo" className="size-9" />
                        </Link>

                        <Link
                            href="https://x.com/Sanj0yX"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X"
                            onClick={() => setIsOpen(false)}
                        >
                            <Image src={x} alt="x logo" className="size-9" />
                        </Link>

                        <Link
                            href="mailto:paulsanjoy2923@gmail.com"
                            aria-label="Email"
                            onClick={() => setIsOpen(false)}
                        >
                            <Image src={mail} alt="mail logo" className="size-9" />
                        </Link>

                        <Link
                            href="https://drive.google.com/file/d/1h9bpb-RyMJwvI96Pqz75Tz5lRBEGX_wU/view?usp=sharing"
                            target="_blank"
                            aria-label="Resume"
                            onClick={() => setIsOpen(false)}
                        >
                            <Image src={resume} alt="resume logo" className="size-9" />
                        </Link>
                    </div>
                </div>
            )}

            <svg
                ref={bottomSvgRef}
                className="pointer-events-none absolute bottom-0 left-0 h-[18px] w-full translate-y-1/2"
                aria-hidden="true"
            />
        </header>
    )
}