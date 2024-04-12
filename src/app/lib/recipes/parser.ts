import {BrewingRecipe, Recipe} from "@/app/lib/definitions";
import {evalRecipeSchemaTemplateString} from "@/app/lib/recipes/utils";


// todo take coffe amount into account!
export const getBrewingRecipe = (rawRecipe: Recipe, totalWaterAmount: number): BrewingRecipe => {
  try {
    const totalWaterPortions = rawRecipe.recipeSteps.reduce(
      (acc, {amount}) => acc + (amount ?? 0), 0
    )
    const portionMultiplier = totalWaterAmount / totalWaterPortions
    let timeAccumulator = 0

    return {
      author: rawRecipe.author,
      name: rawRecipe.name,
      source: rawRecipe.source,
      description: rawRecipe.description,
      brewingSteps: rawRecipe.recipeSteps.map((recipeStep) => {
        const stepWaterAmount = recipeStep.amount * portionMultiplier
        return {
          message: evalRecipeSchemaTemplateString(recipeStep.messageTemplate, stepWaterAmount),
          comment: evalRecipeSchemaTemplateString(recipeStep.commentTemplate, stepWaterAmount),
          deadline: timeAccumulator += recipeStep.duration,
          stage: recipeStep.stage,
        }
      })
    }
  } catch (error) {
    console.error(`Error processing recipe "${rawRecipe.name}":`, error);
  }
}