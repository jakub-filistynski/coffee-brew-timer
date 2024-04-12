import { Timer } from "@/app/ui/timer/timer";
import {getRawRecipes} from "@/app/lib/recipes/utils";
import {getBrewingRecipe} from "@/app/lib/recipes/parser";

export default function Home() {
  return (
    <main>
      {/*<Timer steps={getHoffmanBetterOneCupMethodSteps(50)} />*/}
      <Timer steps={getBrewingRecipe(getRawRecipes().get("Hoffman - better one cup"), 100).brewingSteps} />
    </main>
  );
}
