export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  isVegetarian: boolean
  createdAt?: number
}
export type Status = 'loading' | 'success' | 'error'
export type SortBy = 'name' | 'createdAt' | 'vegetarian'
export type NewRecipe = Omit<Recipe, 'id'>
