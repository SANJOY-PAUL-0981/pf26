import Image from "next/image"
import {
    Heart,
    SportShoe,
    Lightbulb,
    Rocket
} from "lucide-react"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"
import { Tape } from "@/components/ui/Tape"
import { SketchBorder } from "../ui/SketchBorder"

import coffee from "@/public/doodles/coffee.png"
import ts from "@/public/icons/TypeScript.png"
import js from "@/public/icons/JavaScript.png"
import docker from "@/public/icons/docker.png"
import ex from "@/public/icons/express.png"
import git from "@/public/icons/git.png"
import hono from "@/public/icons/hono.png"
import linux from "@/public/icons/linux.png"
import mongo from "@/public/icons/mongo.png"
import nextjs from "@/public/icons/nextjs.png"
import pg from "@/public/icons/pgsql.png"
import prisma from "@/public/icons/prisma.png"
import react from "@/public/icons/react.png"
import tailwind from "@/public/icons/tailwind.png"
import node from "@/public/icons/node.png"
import star from "@/public/doodles/star.png"
import bulb from "@/public/doodles/bulb.png"


const skills = [
    { name: "JavaScript", icon: js, variant: "yellow", borderColour: "#FFEA00" },
    { name: "TypeScript", icon: ts, variant: "blue", borderColour: "#0095FF" },
    { name: "React", icon: react, variant: "sky", borderColour: "#5CD0FF" },
    { name: "Next.js", icon: nextjs, variant: "gray", borderColour: "gray" },
    { name: "Node.js", icon: node, variant: "green", borderColour: "#22c55e" },
    { name: "Express.js", icon: ex, variant: "gray", borderColour: "gray" },
    { name: "MongoDB", icon: mongo, variant: "green", borderColour: "#22c55e" },
    { name: "PostgreSQL", icon: pg, variant: "blue", borderColour: "#0095FF" },
    { name: "Prisma", icon: prisma, variant: "green", borderColour: "#22c55e" },
    { name: "Tailwind CSS", icon: tailwind, variant: "sky", borderColour: "#5CD0FF" },
    { name: "Git", icon: git, variant: "orange", borderColour: "orange" },
    { name: "Docker", icon: docker, variant: "blue", borderColour: "#0095FF" },
    { name: "HonoJs", icon: hono, variant: "orange", borderColour: "orange" },
    { name: "Linux", icon: linux, variant: "gray", borderColour: "gray" },
] as const

const widthMap: Record<string, number> = {
    JavaScript: 135,
    TypeScript: 135,
    React: 115,
    "Next.js": 120,
    "Node.js": 125,
    "Express.js": 145,
    MongoDB: 130,
    PostgreSQL: 145,
    Prisma: 120,
    "Tailwind CSS": 160,
    Git: 105,
    Docker: 130,
    HonoJs: 125,
    Linux: 120
}

export function AboutSkills() {
    return (
        <section
            id="about"
            className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-2"
        >
            {/* ABOUT */}
            <div className="relative">
                <div className="relative inline-block top-10 left-5 z-30">
                    <Tape
                        variant="yellow"
                        tapeStyle="side-torn"
                        width={65}
                        height={30}
                        rotate={-45}
                        className="absolute top-2 -left-5 -bottom-5 z-20"
                    />
                    <SectionTitle
                        variant="green"
                        width={180}
                        height={54}
                        rotate={-5}
                        icon={
                            <Image
                                src={bulb}
                                alt="bulb"
                                width={40}
                                height={40}
                                priority
                                className="object-contain scale-150"
                            />
                        }
                        roughOptions={{
                            hachureGap: 0.5
                        }}
                        titleClassName="text-3xl"
                    >
                        About
                    </SectionTitle>
                </div>

                <div className="relative w-fit overflow-visible mt-5">
                    <Image
                        src={coffee}
                        alt="Coffee cup"
                        width={350}
                        height={350}
                        className="absolute -left-50 top-45 z-20 -translate-y-1/2 rotate-[-8deg] object-contain"
                    />

                    <SketchBorder
                        shape="rounded-rectangle"
                        radius={20}
                        fillColor="#fffbf2"
                        transparent={false}
                        borderStyle="dashed"
                        minHeight={280}
                        padding={26}
                        width={525}
                        roughOptions={{
                            roughness: 0.75,
                            bowing: 0.7,
                            strokeWidth: 2,
                        }}
                        contentClassName="pl-10"
                    >
                        <div>
                            <p className="text-base font-semibold leading-relaxed text-black md:text-lg">
                                I&apos;m Sanjoy Paul a Computer Science undergrad who loves turning ideas into
                                reality through code.
                            </p>

                            <ul className="mt-5 list-disc space-y-1.5 pl-8 text-sm font-medium leading-relaxed md:text-base">

                                <li>
                                    <span>
                                        Currently i&apos;m in my pre-final year of my college, with proficiency in Full-Stack Development with
                                        beginner level experience in DevOps.
                                    </span>
                                </li>

                                <li>
                                    <span>
                                        I&apos;m also an Applied AI & ML enthusiast.
                                    </span>
                                </li>

                                <li>
                                    <span>
                                        I&apos;m always learning new things and exploring technologies.
                                    </span>
                                </li>

                                <li>
                                    <span>
                                        I enjoy solving problems and building meaningful products.
                                    </span>
                                </li>

                                <li>
                                    <span>
                                        When i&apos;m not coding you will find me playing football or listening to music
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </SketchBorder>
                </div>
            </div>

            {/* SKILLS */}
            <div id="skills" className="relative">
                <div className="relative inline-block top-10 left-5 z-30">
                    <Tape
                        variant="yellow"
                        tapeStyle="side-torn"
                        width={55}
                        height={32}
                        rotate={-45}
                        className="absolute -top-4 left-38 -bottom-5 z-20"
                    />
                    <SectionTitle
                        variant="purple"
                        width={180}
                        height={54}
                        rotate={-5}
                        icon={
                            <Image
                                src={star}
                                alt="star"
                                width={50}
                                height={50}
                                priority
                                className="object-contain scale-150"
                            />
                        }
                        roughOptions={{
                            hachureGap: 0.5
                        }}
                        titleClassName="text-3xl"
                    >
                        Skills
                    </SectionTitle>
                </div>

                <div className="mt-5">
                    <SketchBorder
                        shape="rounded-rectangle"
                        radius={20}
                        fillColor="#fffbf2"
                        transparent={false}
                        borderStyle="dashed"
                        minHeight={280}
                        padding={26}
                        width={525}
                        roughOptions={{
                            roughness: 0.75,
                            bowing: 0.7,
                            strokeWidth: 2,
                        }}
                    >
                        <p className="mb-5 text-base font-semibold text-black md:text-lg">
                            Here are some technologies I work with:
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <Badge
                                    key={skill.name}
                                    variant={skill.variant}
                                    shape="rounded-rectangle"
                                    width={widthMap[skill.name] ?? 140}
                                    borderColor={skill.borderColour}
                                    height={35}
                                    fontSize={14}
                                    paddingX={12}
                                    radius={17}
                                    roughOptions={{
                                        roughness: 0.75,
                                        bowing: 0.6,
                                        strokeWidth: 2,
                                        fillStyle: "solid",
                                    }}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Image
                                            src={skill.icon}
                                            alt={`${skill.name} icon`}
                                            width={25}
                                            height={25}
                                            className="object-contain scale-150"
                                        />

                                        <span className="font-bold leading-none">
                                            {skill.name}
                                        </span>
                                    </div>
                                </Badge>
                            ))}
                        </div>
                    </SketchBorder>
                </div>
            </div>
        </section>
    )
}