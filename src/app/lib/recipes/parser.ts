import {BrewingRecipe, RecipeSchema} from "@/app/lib/definitions";
import {roundAndTruncate} from "@/app/ui/utils";


export const getBrewingRecipeUsingTotalWater = (rawRecipe: RecipeSchema, totalWaterAmount: number): BrewingRecipe => {
  const coffeeAmount: number = (rawRecipe.coffeeGramsPerLiter * totalWaterAmount) / 1000
  return getBrewingRecipe(rawRecipe, totalWaterAmount, coffeeAmount)
}

export const getBrewingRecipeUsingCoffeeAmount = (rawRecipe: RecipeSchema, coffeeAmount: number): BrewingRecipe => {
  const totalWaterAmount: number = (coffeeAmount * 1000) / rawRecipe.coffeeGramsPerLiter
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const flowRate: number = roundAndTruncate(stepWaterAmountRaw / stepDuration, 1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stepWaterAmount: number = roundAndTruncate(stepWaterAmountRaw, 1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const waterAccumulator: number = roundAndTruncate(waterAccumulatorRaw, 1)

  const templateToEval: string = "`" + templateString.replaceAll("{", "${") + "`"
  return eval(templateToEval)
}


const getBrewingRecipe = (rawRecipe: RecipeSchema, totalWaterAmount: number, coffeeAmount: number): BrewingRecipe => {

  try {
    const totalWaterPortions: number = rawRecipe.recipeSteps.reduce(
      (acc, {amount}) => acc + (amount ?? 0), 0
    )
    const portionMultiplier: number = totalWaterAmount / totalWaterPortions
    let timeAccumulator: number = 0
    let waterAccumulator: number = 0

    return {
      author: rawRecipe.author,
      name: rawRecipe.name,
      source: rawRecipe.source,
      description: rawRecipe.description,
      coffeeAmount: coffeeAmount,
      waterAmount: totalWaterAmount,
      brewingSteps: rawRecipe.recipeSteps.map((recipeStep) => {
        const stepWaterAmount: number = recipeStep.amount ? recipeStep.amount * portionMultiplier : 0
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