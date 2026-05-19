import Image from "next/image";
import { Navbar } from "@/components/section/navbar";
import { Hero } from "@/components/section/Hero";
import { AboutSkills } from "@/components/section/AboutSkills";
import { Projects } from "@/components/section/Projects";
import { GithubContributions } from "@/components/section/GithubContributions";
import { Footer } from "@/components/section/Footer";
import { Contact } from "@/components/section/Contact";
import { NotebookBackground } from "@/components/layout/NotebookBackground"
import { DoodleGridBackground } from "@/components/layout/DoodleGridBackground";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <NotebookBackground>
        <Navbar />
        <Hero />
        <AboutSkills />
        <Projects />
        <GithubContributions />
        <Contact />
        <Footer />
      </NotebookBackground>
    </main>
  )
}
