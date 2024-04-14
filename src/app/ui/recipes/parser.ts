import {BrewingRecipe, Recipe} from "@/app/lib/definitions";


export const getBrewingRecipeUsingTotalWater = (rawRecipe: Recipe, totalWaterAmount: number): BrewingRecipe => {
  let coffeeAmount = (rawRecipe.coffeeGramsPerLiter * totalWaterAmount) / 1000
  return getBrewingRecipe(rawRecipe, totalWaterAmount, coffeeAmount)
}

export const getBrewingRecipeUsingCoffeeAmount = (rawRecipe: Recipe, coffeeAmount: number): BrewingRecipe => {
  let totalWaterAmount = (coffeeAmount * 1000) / rawRecipe.coffeeGramsPerLiter
  return getBrewingRecipe(rawRecipe, totalWaterAmount, coffeeAmount)
}


const evalRecipeSchemaTemplateString = (templateString: string | undefined, stepWaterAmount: number): string => {
  if (templateString == null) {
    return ""
  }
  let templateToEval = "`" + templateString.replaceAll("{", "${") + "`"
  return eval(templateToEval)
}


const getBrewingRecipe = (rawRecipe: Recipe, totalWaterAmount: number, coffeeAmount: number): BrewingRecipe => {

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
      coffeeAmount: coffeeAmount,
      waterAmount: totalWaterAmount,
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