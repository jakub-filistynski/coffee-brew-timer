import { Timer } from "@/app/ui/timer/timer";
import { getHoffmanMethoSteps } from "@/app/lib/recipies/drip/hoffman";

export default function Home() {
  return (
    <main>
      <Timer steps={getHoffmanMethoSteps(50)} />
    </main>
  );
}
