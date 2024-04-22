import {RecipeSchema} from "@/app/lib/definitions";
import fs from "fs";
import {recipesConfigMap} from "@/app/lib/recipes/recipes";

export const getRawRecipes = (): Map<string, RecipeSchema> => {
  const rawRecipesMap: Map<string, RecipeSchema> = new Map();
  const baseRecipeFolderPath: string = process.cwd() + "/src/app/lib/recipes/config"

  for (const [recipeName, filePath] of recipesConfigMap.entries()) {
    try {
      const jsonData: string = fs.readFileSync(baseRecipeFolderPath + filePath, 'utf8');
      const recipeSchema: RecipeSchema = JSON.parse(jsonData);
      rawRecipesMap.set(recipeName, recipeSchema);
    } catch (error) {
      console.error(`Error loading recipe "${recipeName}":`, error);
    }
  }
  return rawRecipesMap;
}
