import Image from "next/image"
import { FileText, Terminal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Paper } from "@/components/ui/Paper"
import { SketchBorder } from "@/components/ui/SketchBorder"
import { Tape } from "@/components/ui/Tape"
import pfLego from "@/public/images/lego-pf.png"

export function Hero() {
    return (
        <section className="mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl grid-cols-1 items-center gap-12 py-10 md:grid-cols-[1.1fr_0.9fr]">
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
                            CS Undergrad and a full stack eveloper who likes to build good looking and scalable web applications for the{" "}
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
                            hoverRoughness: 0.5
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
                        roughOptions={{
                            hoverHachureGap: 0.5,
                            hoverRoughness: 0.5
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