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
  brewingSteps: Array<BrewingStep>
}

export type RecipeStep = {
  messageTemplate: string
  duration: number
  amount?: number
  stage?: string
  commentTemplate?: string
}

export type Recipe = {
  author: string
  name: string
  source: string
  description: string
  recipeSteps: Array<RecipeStep>
}