// stores/expenseStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Expense,
  saveExpenses,
  getExpenses,
  saveSelectedCurrency,
  getSelectedCurrency,
} from "@/lib/storage";

interface Currency {
  code: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
];

interface ExpenseState {
  expenses: Expense[];
  currentCurrency: Currency;
  currentDate: Date;
  tempDate: Date;
  modalVisible: boolean;
  datePickerVisible: boolean;
  currencyPickerVisible: boolean;
  newExpense: { description: string; amount: string };
  isLoading: boolean;

  setModalVisible: (visible: boolean) => void;
  setDatePickerVisible: (visible: boolean) => void;
  setCurrencyPickerVisible: (visible: boolean) => void;
  setNewExpense: (expense: { description: string; amount: string }) => void;
  setCurrentDate: (date: Date) => void;
  setTempDate: (date: Date) => void;
  addExpense: () => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  selectCurrency: (currency: Currency) => Promise<void>;
  changeMonth: (increment: number) => void;
  initializeStore: () => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  currentCurrency: currencies[0],
  currentDate: new Date(),
  tempDate: new Date(),
  modalVisible: false,
  datePickerVisible: false,
  currencyPickerVisible: false,
  newExpense: { description: "", amount: "" },
  isLoading: true,

  setModalVisible: (visible) => set({ modalVisible: visible }),
  setDatePickerVisible: (visible) => set({ datePickerVisible: visible }),
  setCurrencyPickerVisible: (visible) =>
    set({ currencyPickerVisible: visible }),
  setNewExpense: (expense) => set({ newExpense: expense }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setTempDate: (date) => set({ tempDate: date }),

  addExpense: async () => {
    const { newExpense, expenses, currentDate, currentCurrency } = get();

    if (newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
        date: currentDate.toISOString().split("T")[0],
        currency: currentCurrency.code,
      };

      const updatedExpenses = [expense, ...expenses];
      set({
        expenses: updatedExpenses,
        newExpense: { description: "", amount: "" },
        modalVisible: false,
      });

      await saveExpenses(updatedExpenses);
    }
  },

  removeExpense: async (id) => {
    const { expenses } = get();
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    set({ expenses: updatedExpenses });
    await saveExpenses(updatedExpenses);
  },

  selectCurrency: async (currency) => {
    set({ currentCurrency: currency, currencyPickerVisible: false });
    await saveSelectedCurrency(currency.code);
  },

  changeMonth: (increment) => {
    const { currentDate } = get();
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    set({ currentDate: newDate });
  },

  initializeStore: async () => {
    set({ isLoading: true });
    try {
      // Load saved expenses
      const savedExpenses = await getExpenses();

      if (savedExpenses.length > 0) {
        set({ expenses: savedExpenses });
      } else {
        // Sample data
        const sampleExpenses: Expense[] = [
          {
            id: "1",
            description: "Groceries",
            amount: 50.0,
            date: "2025-02-24",
            currency: "USD",
          },
          {
            id: "2",
            description: "Gas",
            amount: 30.0,
            date: "2025-02-23",
            currency: "USD",
          },
          {
            id: "3",
            description: "Movie tickets",
            amount: 25.0,
            date: "2025-02-22",
            currency: "USD",
          },
          {
            id: "4",
            description: "Dinner",
            amount: 40.0,
            date: "2024-01-15",
            currency: "USD",
          },
          {
            id: "5",
            description: "Books",
            amount: 35.0,
            date: "2025-03-05",
            currency: "USD",
          },
        ];
        set({ expenses: sampleExpenses });
        await saveExpenses(sampleExpenses);
      }

      // Load saved currency preference
      const savedCurrencyCode = await getSelectedCurrency();
      if (savedCurrencyCode) {
        const savedCurrency =
          currencies.find((c) => c.code === savedCurrencyCode) || currencies[0];
        set({ currentCurrency: savedCurrency });
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
