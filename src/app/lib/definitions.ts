export type Settings = {
  baseURL: string
}


export type BrewingStep = {
  message: string
  deadline: number
  stage?: string
  comment?: string
}

export type BrewingRecipe = {
  author: string
  name: string
  source: string
  description: string
  coffeeAmount: number
  waterAmount: number
  brewingSteps: Array<BrewingStep>
}

export type RecipeStep = {
  messageTemplate: string
  duration: number
  amount?: number
  stage?: string
  commentTemplate?: string
}

export type RecipeSchema = {
  author: string
  name: string
  source: string
  description: string
  coffeeGramsPerLiter: number
  recipeSteps: Array<RecipeStep>
}

export type RawRecipesMap = Map<string, RecipeSchema>