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
            className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl grid-cols-1 items-center gap-12 py-10 md:grid-cols-[1.1fr_0.9fr]"
        >
            {showToast && (
                <div className="fixed bottom-8 right-8 z-[999] w-[400px]">
                    <ComicToast
                        variant="bubble"
                        pointer="bottom-right"
                        color="paper"
                        width="100%"
                        minHeight={160}
                        padding={40}
                        rotate={-1}
                        dottedShadow={false}
                        contentClassName="flex min-h-[120px] flex-col items-center justify-center text-center"
                    >
                        <p className="text-base font-black leading-snug">
                            Copied to your clipboard!
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-relaxed text-black/70">
                            Paste it in your terminal to see more.
                        </p>
                    </ComicToast>
                </div>
            )}

            <div>
                <p className="mb-4 text-4xl font-black md:text-5xl">
                    Hello World! 👋
                </p>

                <h1 className="text-6xl font-black leading-tight md:text-8xl">
                    Hi I am <span className="text-purple-600">Sanjoy</span> :)
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
                        <p className="text-xl font-semibold leading-relaxed">
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
                        href="/resume.pdf"
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

            <div className="relative mx-auto w-full max-w-md">
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

                    <p className="mt-4 text-center text-2xl font-black">
                        Code. Build. Ship. Repeat ⚡
                    </p>
                </SketchBorder>
            </div>
        </section>
    )
}