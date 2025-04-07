import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

type Currencies = Currency[];

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

const currencies: Currency[] = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
];

export const useExpenseStore = create<ExpenseStore>()((set) => ({
  expenses: [],
  currentCurrency: currencies[0],
  currentDate: new Date(),
  isLoading: false,

  addExpense: async (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };

    try {
      // Get existing expenses from storage
      const storedExpenses = await AsyncStorage.getItem("expenses");
      const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      // Add new expense to the array
      const updatedExpenses = [...parsedExpenses, newExpense];

      // Save to AsyncStorage
      await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      // Update state
      set((state) => ({
        expenses: [...state.expenses, newExpense],
      }));
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  },

  removeExpense: async (id) => {
    try {
      // Get existing expenses from storage
      const storedExpenses = await AsyncStorage.getItem("expenses");
      const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      // Filter out the expense to remove
      const updatedExpenses = parsedExpenses.filter(
        (expense: Expense) => expense.id !== id
      );

      // Save to AsyncStorage
      await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      // Update state
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== id),
      }));
    } catch (error) {
      console.error("Error removing expense:", error);
    }
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
      // Get expenses from AsyncStorage
      const storedExpenses = await AsyncStorage.getItem("expenses");
      const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      set({ expenses: parsedExpenses });
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
