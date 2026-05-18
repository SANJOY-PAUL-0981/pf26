"use client"

import Image from "next/image"
import { Send } from "lucide-react"
import { SketchBorder } from "@/components/ui/SketchBorder"
import { Tape } from "@/components/ui/Tape"
import { Button } from "@/components/ui/Button"
import { SectionTitle } from "@/components/ui/SectionTitle"
import paperPlane from "@/public/doodles/paper-plane.png"
import smileyFace from "@/public/doodles/smile.png"

export function Contact() {
    return (
        <section id="contact" className="mx-auto max-w-6xl overflow-visible px-6 py-16">
            <div className="relative inline-block">
                <SectionTitle
                    variant="pink"
                    width={220}
                    height={58}
                    rotate={-1}
                    roughOptions={{
                        hachureGap: 0.75
                    }}
                    titleClassName="text-3xl"
                >
                    Contact
                </SectionTitle>
            </div>

            <div className="mt-10 flex justify-center overflow-visible relative">
                <Image
                    src={paperPlane}
                    alt="Paper plane doodle"
                    width={200}
                    height={200}
                    className="pointer-events-none absolute -left-10 -top-12 z-30 rotate-[-12deg] object-contain"
                />

                <Image
                    src={smileyFace}
                    alt="Smiley face doodle"
                    width={250}
                    height={250}
                    className="pointer-events-none absolute -bottom-10 -right-10 z-30 rotate-[10deg] object-contain"
                />
                <div className="relative w-full max-w-3xl overflow-visible">
                    <Tape
                        variant="yellow"
                        tapeStyle="side-torn"
                        width={130}
                        height={55}
                        rotate={35}
                        className="absolute -right-7 top-2 z-40"
                    />

                    <SketchBorder
                        shape="rounded-rectangle"
                        radius={26}
                        borderStyle="dashed"
                        transparent={false}
                        fillColor="#fffbf2"
                        borderColor="#111"
                        width="100%"
                        minHeight={430}
                        padding={30}
                        roughOptions={{
                            roughness: 1,
                            bowing: 0.7,
                            strokeWidth: 1.8,
                            fillStyle: "solid",
                            hachureGap: 10,
                            hachureAngle: -10,
                        }}
                        className="relative z-10 w-full"
                    >
                        <div className="mx-auto max-w-2xl">
                            <div className="mb-7">
                                <h3 className="text-3xl font-black text-black">
                                    Let&apos;s build something cool.
                                </h3>

                                <p className="mt-2 text-sm font-semibold leading-relaxed text-black/60 md:text-base">
                                    Have an idea, project, or opportunity? Drop a message and I&apos;ll
                                    get back to you.
                                </p>
                            </div>

                            <form
                                className="space-y-5"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-black text-black">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            className="w-full rounded-xl border-2 border-black bg-white/70 px-4 py-3 text-sm font-semibold text-black outline-none transition-transform duration-150 placeholder:text-black/35 focus:-rotate-1 focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-black text-black">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="your@email.com"
                                            className="w-full rounded-xl border-2 border-black bg-white/70 px-4 py-3 text-sm font-semibold text-black outline-none transition-transform duration-150 placeholder:text-black/35 focus:rotate-1 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-black text-black">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        placeholder="Write your message..."
                                        className="w-full resize-none rounded-xl border-2 border-black bg-white/70 px-4 py-3 text-sm font-semibold leading-relaxed text-black outline-none transition-transform duration-150 placeholder:text-black/35 focus:-rotate-1 focus:bg-white"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        variant="green"
                                        width={150}
                                        height={44}
                                        fontSize={25}
                                        paddingX={14}
                                        enable3D
                                        depth={12}
                                        depthFill="#fffbf2"
                                        roughOptions={{
                                            roughness: 1.2,
                                            bowing: 0.7,
                                            hachureGap: 5,
                                            hoverHachureGap: 0.75,
                                            fillStyle: "hachure",
                                        }}
                                    >
                                        <div className="inline-flex items-center gap-2 mb-4">
                                            Send
                                            <Send size={16} />
                                        </div>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </SketchBorder>
                </div>
            </div>
        </section>
    )
}