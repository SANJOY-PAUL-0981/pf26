import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tape } from "@/components/ui/Tape"
import { Paper } from "@/components/ui/Paper";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f3e7] p-10">
      <div className="grid grid-cols-3 gap-8">
        {/* Paper with tape */}
        <div className="relative">
          <Tape
            tapeStyle="torn"
            variant="pink"
            width={120}
            height={40}
            rotate={-6}
            className="absolute -top-3 left-10 z-20"
          />

          <Paper minHeight={180} rotate={-1}>
            <h2 className="text-2xl font-bold">Paper Note</h2>
            <p className="mt-3">
              This is a bottom-smudge paper with torn tape.
            </p>
          </Paper>
        </div>

        {/* Card with smooth tape */}
        <div className="relative">
          <Tape
            tapeStyle="smooth"
            variant="green"
            width={110}
            height={35}
            rotate={-12}
            className="absolute -top-2 left-8 z-30"
          />

          <Card
            variant="paper"
            borderStyle="project-corner"
            minHeight={180}
          >
            <h2 className="text-2xl font-bold">Project Card</h2>
            <p className="mt-3">Card with folded corner and smooth tape.</p>
          </Card>
        </div>

        {/* Card with torn tape */}
        <div className="relative">
          <Tape
            tapeStyle="side-torn"
            variant="yellow"
            width={115}
            height={45}
            rotate={8}
            className="absolute -top-3 right-10 z-30"
          />

          <Card
            variant="blue"
            borderStyle="rough"
            minHeight={180}
          >
            <h2 className="text-2xl font-bold">About Card</h2>
            <p className="mt-3">Rough card with torn tape.</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
