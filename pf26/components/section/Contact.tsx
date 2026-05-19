"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Send } from "lucide-react"

import { SketchBorder } from "@/components/ui/SketchBorder"
import { Tape } from "@/components/ui/Tape"
import { Button } from "@/components/ui/Button"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { ComicToast } from "@/components/ui/ComicToast"

import paperPlane from "@/public/doodles/paper-plane.png"
import smileyFace from "@/public/doodles/smile.png"

type ToastState = {
    type: "success" | "error"
    title: string
    message: string
} | null

export function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState<ToastState>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (loading) return

        const trimmedName = name.trim()
        const trimmedEmail = email.trim()
        const trimmedMessage = message.trim()

        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            setToast({
                type: "error",
                title: "Missing details!",
                message: "Please fill name, email, and message.",
            })
            return
        }

        if (trimmedMessage.length < 10) {
            setToast({
                type: "error",
                title: "Message too short!",
                message: "Please write at least 10 characters.",
            })
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    message: trimmedMessage,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message.")
            }

            setToast({
                type: "success",
                title: "Message sent!",
                message: "Thanks for reaching out. I will reply soon.",
            })

            setName("")
            setEmail("")
            setMessage("")
        } catch (error) {
            setToast({
                type: "error",
                title: "Message failed!",
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Try again later.",
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!toast) return

        const timer = window.setTimeout(() => {
            setToast(null)
        }, 5000)

        return () => window.clearTimeout(timer)
    }, [toast])

    return (
        <section
            id="contact"
            className="mx-auto max-w-6xl overflow-visible px-6 py-16"
        >
            {toast && (
                <div className="fixed bottom-8 right-8 font-family-gaegu z-[999] w-[390px] max-w-[calc(100vw-2rem)] max-md:left-70 max-md:bottom-5 max-md:w-[300px] max-md:-translate-x-1/2 max-sm:w-[280px]">
                    <ComicToast
                        variant="thought"
                        pointer="bottom-right"
                        color="paper"
                        width="100%"
                        minHeight={160}
                        padding={40}
                        rotate={-1}
                        dottedShadow={false}
                        contentClassName="flex min-h-[120px] flex-col items-center justify-center text-center max-md:min-h-[88px] max-md:p-5 max-sm:min-h-[78px] max-sm:p-4"
                    >
                        <div className="pr-2 max-md:pr-0">
                            <p className="font-black leading-snug text-black text-2xl max-md:text-sm max-sm:text-[16px]">
                                {toast.title}
                            </p>

                            <p className="mt-1 text-[16px] max-md:text-sm max-sm:text-[12px] font-semibold leading-relaxed text-black/70">
                                {toast.message}
                            </p>

                            <button
                                type="button"
                                onClick={() => setToast(null)}
                                className="mt-3 text-xs font-black text-black/60 underline decoration-wavy underline-offset-4 transition hover:text-black max-md:mt-2 max-sm:text-[10px]"
                            >
                                close
                            </button>
                        </div>
                    </ComicToast>
                </div>
            )}

            <div className="relative inline-block font-family-gaegu">
                <SectionTitle
                    variant="pink"
                    width={220}
                    height={58}
                    rotate={-1}
                    roughOptions={{
                        hachureGap: 0.75,
                    }}
                    titleClassName="text-4xl max-md:text-3xl"
                >
                    Contact
                </SectionTitle>
            </div>

            <div className="relative mt-10 flex justify-center overflow-visible">
                <Image
                    src={paperPlane}
                    alt="Paper plane doodle"
                    width={200}
                    height={200}
                    className="max-md:hidden pointer-events-none absolute -left-10 -top-12 z-30 rotate-[-12deg] object-contain"
                />

                <Image
                    src={smileyFace}
                    alt="Smiley face doodle"
                    width={250}
                    height={250}
                    className="max-md:hidden pointer-events-none absolute -bottom-10 -right-10 z-30 rotate-[10deg] object-contain"
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
                        padding={25}
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
                            <div className="mb-7 max-md:mb-2 font-family-hand">
                                <h3 className="text-3xl font-black text-black">
                                    Let&apos;s build something cool.
                                </h3>

                                <p className="mt-2 max-sm:mt-0 text-lg max-md:text-sm font-semibold leading-relaxed text-black/60 md:text-base">
                                    Have an idea, project, or opportunity? Drop a message and
                                    I&apos;ll get back to you.
                                </p>
                            </div>

                            <form className="space-y-5 max-md:space-y-2" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-md:gap-2">
                                    <div>
                                        <label className="mb-2 block text-lg font-black text-black font-family-hand">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            required
                                            placeholder="Your name"
                                            className="w-full rounded-xl font-family-gaegu text-lg border-2 border-black bg-white/70 px-4 py-3 max-md:text-[16px] font-semibold text-black outline-none transition-transform duration-150 placeholder:text-black/35 focus:-rotate-1 focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-lg font-black text-black font-family-hand">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                            placeholder="your@email.com"
                                            className="w-full rounded-xl font-family-gaegu text-lg border-2 border-black bg-white/70 px-4 py-3 max-md:text-[16px] font-semibold text-black outline-none transition-transform duration-150 placeholder:text-black/35 focus:rotate-1 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-lg font-black text-black font-family-hand">
                                        Message
                                    </label>

                                    <textarea
                                        name="message"
                                        rows={6}
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        required
                                        placeholder="Write your message..."
                                        className="w-full resize-none rounded-xl font-family-gaegu text-lg border-2 border-black bg-white/70 px-4 py-3 max-md:text-[16px] font-semibold leading-relaxed text-black outline-none transition-transform duration-150 placeholder:text-black/35 focus:-rotate-1 focus:bg-white"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        variant="green"
                                        width={170}
                                        height={48}
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
                                        <div className="inline-flex  font-family-hand items-center gap-2">
                                            {loading ? "Sending..." : "Send"}
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