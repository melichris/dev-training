import type { Recipe } from '@/types/types'

const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = ONE_HOUR * 24
const TWO_DAYS = ONE_DAY * 2
const THREE_DAYS = ONE_DAY * 3

export const mockRecipes: Record<number, Recipe> = {
  1: {
    id: 1,
    name: 'Spaghetti',
    ingredients: ['cube', 'salt', 'water'],
    isVegetarian: true,
    createdAt: Date.now() - ONE_DAY,
  },
  2: {
    id: 2,
    name: 'Avocado Salad',
    ingredients: ['palm oil', 'salt', 'water'],
    isVegetarian: false,
    createdAt: Date.now() - TWO_DAYS,
  },
  3: {
    id: 3,
    name: 'Vegetable Soup',
    ingredients: ['corn', 'flour', 'water'],
    isVegetarian: true,
    createdAt: Date.now() - THREE_DAYS,
  },
  4: {
    id: 4,
    name: 'Chicken Rice',
    ingredients: ['fish', 'oil', 'pepper'],
    isVegetarian: false,
    createdAt: Date.now(),
  },
}
