import { Timer } from "@/app/ui/timer/timer";
import {getRawRecipes} from "@/app/lib/recipes/utils";
import {getBrewingRecipeUsingTotalWater, getBrewingRecipeUsingCoffeeAmount} from "@/app/lib/recipes/parser";

export default function Home() {
  return (
    <main>
      <Timer recipe={getBrewingRecipeUsingCoffeeAmount(getRawRecipes().get("Hoffmann - better one cup"), 24)} />
    </main>
  );
}
