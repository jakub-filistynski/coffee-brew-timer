"use client"

import {useState} from "react";
import {RecipePicker} from "@/app/ui/recipePicker/recipePicker";
import {Timer} from "@/app/ui/timer/timer";

export default function Home() {
  const [brewingRecipe, setBrewingRecipe] = useState(undefined);

  return (
    <main>
      <div className="flex items-center text-center space-y-5 justify-center h-screen flex-col">
        <RecipePicker setBrewingRecipe={setBrewingRecipe}/>
        <Timer brewingRecipe={brewingRecipe} />
      </div>
    </main>
  );
}
