"use client"


import { Timer } from "@/app/ui/timer/timer";
import {RecipePicker} from "@/app/ui/recipePicker/recipePicker";
import {useState} from "react";
import {Recipe} from "@/app/lib/definitions";
import {getBrewingRecipeUsingTotalWater} from "@/app/lib/recipes/parser";


type Props = {
  rawRecipesMap: Map<string, Recipe>
}



export function ClientUi({ rawRecipesMap } : Props) {
  const [brewingRecipe, setBrewingRecipe] = useState(
    getBrewingRecipeUsingTotalWater(rawRecipesMap.values().next().value, 250)
  );
  return (
    <div className="flex items-center text-center space-y-5 justify-center h-screen flex-col">
      <RecipePicker setBrewingRecipe={setBrewingRecipe} rawRecipesMap={rawRecipesMap}/>
      <Timer recipe={brewingRecipe} />
    </div>
  );
}
