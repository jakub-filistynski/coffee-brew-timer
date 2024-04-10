import { Timer } from "@/app/ui/timer/timer";
import { getHoffmanBetterOneCupMethodSteps } from "@/app/lib/recipies/drip/hoffman";

export default function Home() {
  return (
    <main>
      <Timer steps={getHoffmanBetterOneCupMethodSteps(250)} />
    </main>
  );
}
