import {useState} from "react";
import {ClientUi} from "@/app/ui/clientUi";
import {getRawRecipes} from "@/app/lib/recipes/utils";

export default function Home() {
  let rawRecipesMap = getRawRecipes()
  return (
    <main>
      <ClientUi rawRecipesMap={rawRecipesMap}/>
    </main>
  );
}
