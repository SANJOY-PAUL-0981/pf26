"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { FileText, Terminal } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Paper } from "@/components/ui/Paper"
import { SketchBorder } from "@/components/ui/SketchBorder"
import { Tape } from "@/components/ui/Tape"
import { ComicToast } from "@/components/ui/ComicToast"

import pfLego from "@/public/images/lego-pf.png"

export function Hero() {
    const [showToast, setShowToast] = useState(false)

    async function handleCopyCommand() {
        const command = "npx sanjoyxyz"

        try {
            await navigator.clipboard.writeText(command)
            setShowToast(true)
        } catch {
            setShowToast(true)
        }
    }

    useEffect(() => {
        if (!showToast) return

        const timer = setTimeout(() => {
            setShowToast(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [showToast])

    return (
        <section
            id="home"
            className="relative mx-auto min-h-[calc(100vh-96px)] max-w-6xl px-4 py-8 md:px-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-0 lg:py-10 max-md:pt-26"
        >
            {showToast && (
                <div className="fixed bottom-8 font-family-gaegu right-8 z-[999] w-[400px] max-w-[calc(100vw-2rem)] max-md:left-70 max-md:bottom-5 max-md:w-[300px] max-md:-translate-x-1/2 max-sm:w-[280px]">
                    <ComicToast
                        variant="bubble"
                        pointer="bottom-right"
                        color="paper"
                        width="100%"
                        minHeight={160}
                        padding={40}
                        rotate={-1}
                        dottedShadow={false}
                        contentClassName="flex min-h-[120px] flex-col items-center justify-center text-center max-md:min-h-[82px] max-md:p-5 max-sm:min-h-[74px] max-sm:p-4"
                    >
                        <p className="font-black leading-snug text-2xl max-md:text-sm max-sm:text-[16px]">
                            Copied to your clipboard!
                        </p>

                        <p className="mt-1 text-[16px] font-semibold leading-relaxed text-black/70 max-md:text-sm max-sm:text-[12px]">
                            Paste it in your terminal to see more.
                        </p>
                    </ComicToast>
                </div>
            )}

            <div className="font-family-hand grid grid-cols-[1fr_135px] items-center gap-3 sm:grid-cols-[1fr_180px] lg:hidden">
                <div className="min-w-0">
                    <p className="mb-2 text-3xl font-black leading-none sm:text-4xl md:text-5xl">
                        Hello World! 👋
                    </p>

                    <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
                        Hi I am{" "}
                        <span className="text-purple-600 font-family-gaegu">Sanjoy</span> :)
                    </h1>
                </div>

                <div className="relative mx-auto w-full max-w-[135px] sm:max-w-[180px]">
                    <Tape
                        variant="pink"
                        tapeStyle="side-torn"
                        width={70}
                        height={45}
                        rotate={100}
                        className="absolute -top-5 left-1/2 z-30 -translate-x-1/2"
                    />

                    <SketchBorder
                        transparent={false}
                        fillColor="#fef3c7"
                        borderColor="#111"
                        minHeight={170}
                        padding={8}
                        rotate={2}
                        roughOptions={{
                            roughness: 1.6,
                            bowing: 0.9,
                            fillStyle: "hachure",
                            hachureGap: 7,
                            hachureAngle: -15,
                        }}
                    >
                        <div className="relative h-[120px] overflow-hidden sm:h-[160px]">
                            <Image
                                src={pfLego}
                                alt="Sanjoy Paul"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        <p className="mt-2 font-family-lacquer text-center text-[9px] font-black leading-tight sm:text-sm">
                            Code. Build. Ship. Repeat ⚡
                        </p>
                    </SketchBorder>
                </div>
            </div>

            <div className="font-family-hand hidden lg:block">
                <p className="mb-4 text-4xl font-black md:text-5xl">
                    Hello World! 👋
                </p>

                <h1 className="text-6xl font-black leading-tight md:text-8xl">
                    Hi I am <span className="text-purple-600 font-family-gaegu">Sanjoy</span> :)
                </h1>

                <div className="mt-6 max-w-xl">
                    <Paper
                        variant="cream"
                        edgeStyle="folded-corner"
                        minHeight={130}
                        padding={24}
                        rotate={-1}
                        borderColor="#111"
                    >
                        <p className="text-xl font-semibold leading-relaxed max-md:border-2">
                            Nice to meet you all, I am a passionate -
                            <br />
                            CS Undergrad and a full stack developer who likes to build good
                            looking and scalable web applications for the{" "}
                            <span className="bg-green-200 px-2">real problems.</span>
                        </p>
                    </Paper>
                </div>

                <div className="mt-8 flex flex-wrap gap-5">
                    <Button
                        href="https://drive.google.com/file/d/1h9bpb-RyMJwvI96Pqz75Tz5lRBEGX_wU/view"
                        external
                        variant="purple"
                        width={190}
                        height={52}
                        fontSize={18}
                        roughOptions={{
                            seed: 67,
                            hoverHachureGap: 0.5,
                            hoverRoughness: 0.5,
                        }}
                    >
                        <span className="inline-flex items-center gap-2">
                            <FileText size={20} />
                            Resume
                        </span>
                    </Button>

                    <Button
                        variant="yellow"
                        width={210}
                        height={52}
                        fontSize={18}
                        onClick={handleCopyCommand}
                        roughOptions={{
                            hoverHachureGap: 0.5,
                            hoverRoughness: 0.5,
                        }}
                    >
                        <span className="inline-flex items-center gap-2">
                            <Terminal size={20} />
                            npx sanjoyxyz
                        </span>
                    </Button>
                </div>
            </div>

            <div className="mt-6 lg:hidden">
                <div className="mx-auto max-w-xl">
                    <Paper
                        variant="cream"
                        edgeStyle="folded-corner"
                        minHeight={120}
                        padding={18}
                        rotate={-1}
                        borderColor="#111"
                    >
                        <p className="text-base font-family-hand font-semibold leading-relaxed sm:text-lg">
                            Nice to meet you all, I am a passionate - CS Undergrad and a
                            full stack developer who likes to build good looking and scalable
                            web applications for the{" "}
                            <span className="bg-green-200 px-2">real problems.</span>
                        </p>
                    </Paper>
                </div>

                <div className="mt-7 font-family-hand flex justify-center gap-4 max-md:ml-3 max-md:gap-0">
                    <Button
                        href="/resume.pdf"
                        external
                        variant="purple"
                        width={165}
                        height={48}
                        fontSize={16}
                        roughOptions={{
                            seed: 67,
                            hoverHachureGap: 0.5,
                            hoverRoughness: 0.5,
                        }}
                    >
                        <span className="inline-flex items-center gap-2">
                            <FileText size={18} />
                            Resume
                        </span>
                    </Button>

                    <Button
                        variant="yellow"
                        width={190}
                        height={48}
                        fontSize={16}
                        onClick={handleCopyCommand}
                        roughOptions={{
                            hoverHachureGap: 0.5,
                            hoverRoughness: 0.5,
                        }}
                    >
                        <span className="inline-flex items-center gap-2">
                            <Terminal size={18} />
                            npx sanjoyxyz
                        </span>
                    </Button>
                </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-md lg:block">
                <Tape
                    variant="pink"
                    tapeStyle="side-torn"
                    width={120}
                    height={80}
                    rotate={100}
                    className="absolute -top-10 left-1/2 z-30 -translate-x-1/2"
                />

                <SketchBorder
                    transparent={false}
                    fillColor="#fef3c7"
                    borderColor="#111"
                    minHeight={420}
                    padding={18}
                    rotate={2}
                    roughOptions={{
                        roughness: 1.6,
                        bowing: 0.9,
                        fillStyle: "hachure",
                        hachureGap: 7,
                        hachureAngle: -15,
                    }}
                >
                    <div className="relative h-[340px] overflow-hidden">
                        <Image
                            src={pfLego}
                            alt="Sanjoy Paul"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <p className="mt-4 font-family-lacquer text-center text-2xl font-black">
                        Code. Build. Ship. Repeat ⚡
                    </p>
                </SketchBorder>
            </div>
        </section>
    )
}