import { Timer } from "@/app/ui/timer/timer";
import {getRawRecipes} from "@/app/lib/recipes/utils";
import {getBrewingRecipeUsingTotalWater, getBrewingRecipeUsingCoffeeAmount} from "@/app/lib/recipes/parser";
import {RecipePicker} from "@/app/ui/recipePicker/recipePicker";

export default function Home() {
  return (
    <main>
      <div className="flex items-center text-center space-y-5 justify-center h-screen flex-col">
        <RecipePicker/>
        <Timer recipe={getBrewingRecipeUsingCoffeeAmount(getRawRecipes().get("Hoffmann - ultimate V60 technique"), 24)} />

        {/*</div>*/}
      </div>
    </main>
  );
}
