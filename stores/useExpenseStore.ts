import { create } from "zustand";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
}

interface Currency {
  code: string;
  symbol: string;
}

interface ExpenseStore {
  expenses: Expense[];
  currentCurrency: Currency;
  currentDate: Date;
  isLoading: boolean;
  addExpense: (expense: Omit<Expense, "id">) => void;
  removeExpense: (id: string) => void;
  setCurrentCurrency: (currency: Currency) => void;
  setCurrentDate: (date: Date) => void;
  fetchExpenses: () => Promise<void>;
}

export const useExpenseStore = create<ExpenseStore>()((set) => ({
  expenses: [],
  currentCurrency: { code: "USD", symbol: "$" },
  currentDate: new Date(),
  isLoading: false,

  addExpense: (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    set((state) => ({
      expenses: [...state.expenses, newExpense],
    }));
  },

  removeExpense: (id) => {
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));
  },

  setCurrentCurrency: (currency) => {
    set({ currentCurrency: currency });
  },

  setCurrentDate: (date) => {
    set({ currentDate: date });
  },

  fetchExpenses: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockData = [
        {
          id: "1",
          description: "Groceries",
          amount: 85.75,
          date: new Date().toISOString(),
          currency: "USD",
        },
        {
          id: "2",
          description: "Dinner",
          amount: 42.5,
          date: new Date().toISOString(),
          currency: "USD",
        },
      ];
      set({ expenses: mockData });
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
