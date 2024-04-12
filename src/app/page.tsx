import { Timer } from "@/app/ui/timer/timer";
import {getRawRecipes} from "@/app/lib/recipes/utils";
import {getBrewingRecipe} from "@/app/lib/recipes/parser";

export default function Home() {
  return (
    <main>
      <Timer steps={getBrewingRecipe(getRawRecipes().get("Hoffmann - better one cup"), 250).brewingSteps} />
    </main>
  );
}
