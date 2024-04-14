import {Recipe} from "@/app/lib/definitions";
import fs from "fs";
import {recipesConfigMap} from "@/app/lib/recipes/recipes";

export const getRawRecipes = (): Map<string, Recipe> => {
  const rawRecipesMap: Map<string, Recipe> = new Map();
  const baseRecipeFolderPath = process.cwd() + "/src/app/lib/recipes/config"

  for (const [recipeName, filePath] of recipesConfigMap.entries()) {
    try {
      const jsonData = fs.readFileSync(baseRecipeFolderPath + filePath, 'utf8');
      const recipeData: Recipe = JSON.parse(jsonData);
      rawRecipesMap.set(recipeName, recipeData);
    } catch (error) {
      console.error(`Error loading recipe "${recipeName}":`, error);
    }
  }
  return rawRecipesMap;
}
