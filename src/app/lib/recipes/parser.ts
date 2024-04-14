import {BrewingRecipe, Recipe} from "@/app/lib/definitions";
import {roundAndTruncate} from "@/app/ui/utils";


export const getBrewingRecipeUsingTotalWater = (rawRecipe: Recipe, totalWaterAmount: number): BrewingRecipe => {
  let coffeeAmount = (rawRecipe.coffeeGramsPerLiter * totalWaterAmount) / 1000
  return getBrewingRecipe(rawRecipe, totalWaterAmount, coffeeAmount)
}

export const getBrewingRecipeUsingCoffeeAmount = (rawRecipe: Recipe, coffeeAmount: number): BrewingRecipe => {
  let totalWaterAmount = (coffeeAmount * 1000) / rawRecipe.coffeeGramsPerLiter
  return getBrewingRecipe(rawRecipe, totalWaterAmount, coffeeAmount)
}


const evalRecipeSchemaTemplateString = (
  templateString: string | undefined,
  stepWaterAmountRaw: number,
  waterAccumulatorRaw: number,
  stepDuration: number
): string => {
  if (templateString == null) {
    return ""
  }
  let flowRate = roundAndTruncate(stepWaterAmountRaw / stepDuration, 1)
  let stepWaterAmount = roundAndTruncate(stepWaterAmountRaw, 1)
  let waterAccumulator = roundAndTruncate(waterAccumulatorRaw, 1)

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
    let waterAccumulator = 0

    return {
      author: rawRecipe.author,
      name: rawRecipe.name,
      source: rawRecipe.source,
      description: rawRecipe.description,
      coffeeAmount: coffeeAmount,
      waterAmount: totalWaterAmount,
      brewingSteps: rawRecipe.recipeSteps.map((recipeStep) => {
        const stepWaterAmount = recipeStep.amount ? recipeStep.amount * portionMultiplier : 0
        waterAccumulator += stepWaterAmount
        return {
          message: evalRecipeSchemaTemplateString(recipeStep.messageTemplate, stepWaterAmount, waterAccumulator, recipeStep.duration),
          comment: evalRecipeSchemaTemplateString(recipeStep.commentTemplate, stepWaterAmount, waterAccumulator, recipeStep.duration),
          deadline: timeAccumulator += recipeStep.duration,
          stage: recipeStep.stage,
        }
      })
    }
  } catch (error) {
    console.error(`Error processing recipe "${rawRecipe.name}":`, error);
  }
}