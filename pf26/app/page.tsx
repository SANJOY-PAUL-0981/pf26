import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/section/Hero";
import { AboutSkills } from "@/components/section/AboutSkills";

export default function Home() {
  return (
    <main className="px-0">
      <Navbar />
      <Hero />
      <AboutSkills />
    </main>
  )
}
