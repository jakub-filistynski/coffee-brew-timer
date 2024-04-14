"use client";

import { useState, useEffect } from "react";
import {recipesConfigMap} from "@/app/lib/recipes/recipes";


type Props = {
};


export function RecipePicker({  } : Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);


  return (
    <>
      <div className="w-full">
        <select
          name="RecipeSelect"
          id="RecipeSelect"
          className="mt-1.5 w-1/3 rounded-lg border-black border-2 text-gray-700 sm:text-1xl h-8 sm:h-10"
          onChange={(event) => console.log(event.target.value)}
        >
          <option value="">Pick recipe</option>
          {[...recipesConfigMap.keys()].map(key => {
            return <option value={key}>{key}</option>
          })}
        </select>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="text-1xl sm:text-3xl">
          <span>Water</span>
        </div>
        <label
          htmlFor="WaterCoffeeCondition"
          className="relative h-8 w-14 cursor-pointer rounded-full bg-blue-500 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-orange-900"
        >
          <input type="checkbox" id="WaterCoffeeCondition" className="peer sr-only"/>

          <span
            className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"
          ></span>
        </label>
        <div className="text-1xl sm:text-3xl">
          <span>Coffee</span>
        </div>
      </div>
      <label
        htmlFor="ResourceAmount"
        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <span className="text-xs font-medium text-gray-700">Todo depending on state</span>
        <input
          type="number"
          id="ResourceAmount"
          placeholder=""
          className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />
      </label>


      <button
        className="rounded border border-black px-12 py-3 text-sm font-medium text-black hover:bg-black hover:text-white focus:outline-none focus:ring active:bg-slate-600 w-1/6"
        onClick={() => {console.log("Update btn clicked")}}
      >
        Update
      </button>

    </>
  );
}
