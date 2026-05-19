import { ExternalLink, FolderGit2 } from "lucide-react"
import Link from "next/link"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Tape } from "@/components/ui/Tape"
import Image from "next/image"
import cloud from "@/public/doodles/cloud.png"

const projects = [
    {
        name: "OuraCode",
        description:
            "A collaborative online code editor where users can write, run, and share code in real time.",
        tech: ["React", "Node.js", "WebSocket", "MongoDB", "Express.js", "Docker"],
        link: "https://github.com/SANJOY-PAUL-0981/OuraCode",
        variant: "green",
    },
    {
        name: "UniVibe",
        description:
            "A random video calling platform for college students to chat with strangers of their vibe.",
        tech: ["Next.js", "HonoJs", "WebRTC", "PostgreSQL", "Prisma"],
        link: "https://github.com/SANJOY-PAUL-0981/UniVibe",
        variant: "purple",
    },
    {
        name: "LearnAI",
        description:
            "LearnAI is a smart chatbot that lets users have AI-powered conversations based on YouTube videos. ",
        tech: ["React", "Express.js", "MongoDB", "Tailwind", "GeminiAPI"],
        link: "https://github.com/SANJOY-PAUL-0981/LearnAI",
        variant: "pink",
    },
    {
        name: "Tsukifetch",
        description:
            "Tsukifetch is a CLI based System Information tool like neofetch written in C as my first project",
        tech: ["C"],
        link: "https://github.com/SANJOY-PAUL-0981/Tsukifetch",
        variant: "pink",
    },
    {
        name: "Clipr",
        description:
            "Clipr is a URL shortener tool available as both a browser extension and a website.",
        tech: ["React", "Express.js", "MongoDB", "Tailwind"],
        link: "https://github.com/SANJOY-PAUL-0981/Clipr",
        variant: "yellow",
    },
    {
        name: "Student Management App",
        description:
            "This is a students management app with both android and ios support.",
        tech: ["React", "MongoDB", "Express.js", "JavaScript"],
        link: "https://github.com/SANJOY-PAUL-0981/Cross-Platform-Student-Management-App",
        variant: "blue",
    },
] as const

const tagVariantMap: Record<string, any> = {
    React: "blue",
    "Next.js": "gray",
    C: "blue",
    TypeScript: "blue",
    RoughJS: "yellow",
    Tailwind: "sky",
    "Node.js": "green",
    MongoDB: "green",
    "HonoJs": "orange",
    PostgreSQL: "blue",
    Prisma: "green",
    "Express.js": "silver",
    "Socket.io": "purple",
    Python: "yellow",
    AI: "purple",
    APIs: "pink",
    Docker: "blue",
    Charts: "orange",
    "UI/UX": "pink",
    Auth: "gray",
}

export function Projects() {
    return (
        <section id="projects" className="mx-auto max-w-6xl px-6 py-14">
            <div className="relative inline-block font-family-gaegu">
                <Tape
                    variant="yellow"
                    tapeStyle="side-torn"
                    width={64}
                    height={30}
                    rotate={-42}
                    className="absolute top-1 -left-5 -bottom-5 z-20"
                />

                <SectionTitle
                    variant="pink"
                    width={220}
                    height={58}
                    rotate={-1}
                    roughOptions={{
                        hachureGap: 0.75
                    }}
                    icon={<FolderGit2 size={28} />}
                    titleClassName="gap-3 text-4xl max-md:text-3xl"
                >
                    Projects
                </SectionTitle>
            </div>

            <div className="relative mt-8">
                <Image
                    src={cloud}
                    alt=""
                    width={250}
                    height={250}
                    className="max-lg:hidden pointer-events-none absolute -right-46 top-1/2 z-20 -translate-y-1/2 rotate-6 object-contain" />

                <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project, index) => (
                        <Link
                            key={project.name}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group block transition-transform duration-200 hover:-translate-y-2 ${index % 2 === 0 ? "hover:-rotate-2" : "hover:rotate-2"
                                }`}
                            aria-label={`Open ${project.name} project`}
                        >
                            <Card
                                variant={project.variant}
                                shape="rounded-rectangle"
                                radius={22}
                                borderStyle={index % 2 === 0 ? "dashed" : "project-corner"}
                                minHeight={310}
                                padding={22}
                                roughOptions={{
                                    seed: 100 + index * 20,
                                    roughness: 1.2,
                                    bowing: 0.7,
                                    strokeWidth: 1.6,
                                    fillStyle: "hachure",
                                    hachureGap: 5,
                                    hachureAngle: -12,
                                }}
                                className="h-full cursor-pointer"
                            >
                                <div className="flex h-full min-h-[260px] flex-col">
                                    {/* top title */}
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <h3 className="text-2xl font-family-hand font-black leading-none text-black">
                                            {project.name}
                                        </h3>

                                        <span className="text-xl transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125">
                                            ✦
                                        </span>
                                    </div>

                                    {/* description */}
                                    <p className="text-sm font-family-hand font-semibold leading-relaxed text-black/80 md:text-base">
                                        {project.description}
                                    </p>

                                    {/* tech badges */}
                                    <div className="mt-5 font-family-gaegu flex flex-wrap gap-2">
                                        {project.tech.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant={tagVariantMap[tag] ?? "yellow"}
                                                shape="rounded-rectangle"
                                                width={tag.length > 8 ? 100 : 82}
                                                height={25}
                                                fontSize={15}
                                                paddingX={8}
                                                radius={40}
                                                roughOptions={{
                                                    roughness: 0.5,
                                                    bowing: 0.5,
                                                    strokeWidth: 1.1,
                                                    fillStyle: "solid",
                                                }}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* bottom hint */}
                                    <div className="mt-auto font-family-gaegu pt-6 text-lg font-black text-black/70">
                                        Click to view →
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}