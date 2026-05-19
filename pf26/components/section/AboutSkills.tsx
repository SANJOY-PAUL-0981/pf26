import Image from "next/image"

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
    Linux: 120,
}

export function AboutSkills() {
    return (
        <section
            id="about"
            className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-2 max-md:gap-8 max-md:px-5 max-md:py-6"
        >
            <div className="relative">
                <div className="relative font-family-gaegu left-5 top-10 z-30 inline-block max-md:left-2 max-md:top-7">
                    <Tape
                        variant="yellow"
                        tapeStyle="side-torn"
                        width={65}
                        height={30}
                        rotate={-45}
                        className="absolute -bottom-5 -left-5 top-2 z-20 max-md:scale-90"
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
                            hachureGap: 0.5,
                        }}
                        titleClassName="text-4xl max-md:text-3xl"
                    >
                        About
                    </SectionTitle>
                </div>

                <div className="relative mt-5 w-full max-w-[525px] overflow-visible max-lg:mx-auto">
                    <Image
                        src={coffee}
                        alt="Coffee cup"
                        width={350}
                        height={350}
                        className="max-lg:hidden absolute -left-50 top-45 z-20 -translate-y-1/2 rotate-[-8deg] object-contain max-xl:-left-32 max-lg:-left-24 max-md:-left-8 max-md:top-10 max-md:w-24 max-sm:-left-4 max-sm:w-20"
                    />

                    <SketchBorder
                        shape="rounded-rectangle"
                        radius={20}
                        fillColor="#fffbf2"
                        transparent={false}
                        borderStyle="dashed"
                        minHeight={280}
                        padding={26}
                        width="100%"
                        roughOptions={{
                            seed: 10,
                            roughness: 0.75,
                            bowing: 0.7,
                            strokeWidth: 2,
                        }}
                        contentClassName="pl-10 max-md:pl-5 max-md:pr-5 max-md:py-5"
                    >
                        <div className="font-family-hand">
                            <p className="text-base font-semibold leading-relaxed text-black md:text-xl max-md:text-[17px">
                                I&apos;m Sanjoy Paul a Computer Science undergrad who loves turning ideas into
                                reality through code.
                            </p>

                            <ul className="mt-5 list-disc space-y-1.5 pl-8 font-medium leading-relaxed md:text-[17.75px] max-md:pl-5 max-md:text-[16px]">
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

            <div id="skills" className="relative">
                <div className="relative left-5 font-family-gaegu top-10 z-30 inline-block max-md:left-2 max-md:top-7">
                    <Tape
                        variant="yellow"
                        tapeStyle="side-torn"
                        width={55}
                        height={32}
                        rotate={-45}
                        className="absolute -bottom-5 -top-4 left-38 z-20 max-md:left-32 max-md:scale-90"
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
                            hachureGap: 0.5,
                        }}
                        titleClassName="text-4xl max-md:text-3xl"
                    >
                        Skills
                    </SectionTitle>
                </div>

                <div className="mt-5 w-full max-w-[525px] max-lg:mx-auto font-family-hand">
                    <SketchBorder
                        shape="rounded-rectangle"
                        radius={20}
                        fillColor="#fffbf2"
                        transparent={false}
                        borderStyle="dashed"
                        minHeight={280}
                        padding={26}
                        width="100%"
                        roughOptions={{
                            roughness: 0.75,
                            bowing: 0.7,
                            strokeWidth: 2,
                        }}
                        contentClassName="max-md:p-5"
                    >
                        <p className="mb-5 text-base font-semibold text-black md:text-xl max-md:text-[17px]">
                            Here are some technologies I work with:
                        </p>

                        <div className="flex flex-wrap gap-3 max-md:gap-2 max-md:justify-between">
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

                                        <span className="font-bold leading-none md:text-[17.75px] max-md:text-[16px]">
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