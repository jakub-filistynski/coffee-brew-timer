"use client"


import { Timer } from "@/app/ui/timer/timer";
import {RecipePicker} from "@/app/ui/recipePicker/recipePicker";
import {useState} from "react";
import {RecipeSchema} from "@/app/lib/definitions";


type Props = {
  rawRecipesMap: Map<string, RecipeSchema>
}



export function ClientUi({ rawRecipesMap } : Props) {
  const [brewingRecipe, setBrewingRecipe] = useState(undefined);
  return (
    <div className="flex items-center text-center space-y-5 justify-center h-screen flex-col">
      <RecipePicker setBrewingRecipe={setBrewingRecipe} rawRecipesMap={rawRecipesMap}/>
      <Timer brewingRecipe={brewingRecipe} />
    </div>
  );
}
