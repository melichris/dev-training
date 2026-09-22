export interface Expense {
  id: number
  amount: number
  description: string
  category: Category
  paid?: boolean
}

export type Category = 'food' | 'transport' | 'bills' | 'others' | 'wife'

export type NewExpense = Omit<Expense, 'id'>

export type Status = 'loading' | 'success' | 'error'
