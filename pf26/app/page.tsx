import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f3e7] p-20">
      <div className="flex gap-6">
        <Button 
        href="https://sanjoydev.com" 
        variant="purple"
        roughOptions={{
          seed: 10,
          strokeWidth: 2,
          hachureGap: 1.25,
          fillStyle: "hachure",
          hachureAngle: 45,
          bowing:-.5
        }}>
          Resume</Button>
      </div>
    </main>
  );
}
