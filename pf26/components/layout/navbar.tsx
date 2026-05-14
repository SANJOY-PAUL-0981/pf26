import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Tape } from "@/components/ui/Tape"
import Image from "next/image"
import github from "../../public/icons/github.png"
import linkedin from "../../public/icons/linkedin.png"
import x from "../../public/icons/x.png"
import mail from "../../public/icons/mail.png"
import resume from "../../public/icons/resume.png"

const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
]

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 px-6 py-5">
            <nav className="mx-auto flex max-w-6xl items-center justify-between">
                <Link href="/" className="relative text-2xl font-black text-black">
                    <Tape
                        variant="yellow"
                        tapeStyle="side-torn"
                        width={96}
                        height={28}
                        rotate={-4}
                        className="absolute -left-3 top-1 -z-10"
                    />
                    Sanjoy
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="font-bold text-black transition-transform hover:-rotate-2 hover:scale-105"
                        >
                            {item.label}
                        </Link>
                    ))}
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
                        href="https://www.linkedin.com/in/sanjoy-paul-b0053122a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
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
                        href="https://drive.google.com/file/d/1tPP8MuitQjDkfBx7NPQVWNU7NbGNnNPB/view?usp=sharing"
                        target="_blank"
                        aria-label="Resume"
                        className="transition-transform hover:-translate-y-1"
                    >
                        <Image src={resume} alt="resume logo" className="size-10" />
                    </Link>
                </div>
            </nav>
        </header>
    )
}