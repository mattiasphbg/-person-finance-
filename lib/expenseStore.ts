// stores/expenseStore.ts
import { create } from "zustand";
import {
  saveExpenses,
  getExpenses,
  saveSelectedCurrency,
  getSelectedCurrency,
  Expense,
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
  // Data
  expenses: Expense[];
  currentCurrency: Currency;
  currentDate: Date;
  tempDate: Date;

  // UI state
  modalVisible: boolean;
  datePickerVisible: boolean;
  currencyPickerVisible: boolean;
  newExpense: { description: string; amount: string };
  isLoading: boolean;

  // Actions
  setExpenses: (expenses: Expense[]) => void;
  addExpense: () => void;
  removeExpense: (id: string) => void;
  setModalVisible: (visible: boolean) => void;
  setDatePickerVisible: (visible: boolean) => void;
  setCurrencyPickerVisible: (visible: boolean) => void;
  setNewExpense: (expense: { description: string; amount: string }) => void;
  setCurrentDate: (date: Date) => void;
  setTempDate: (date: Date) => void;
  selectCurrency: (currency: Currency) => void;
  changeMonth: (increment: number) => void;
  initializeStore: () => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  // Initial state
  expenses: [],
  currentCurrency: currencies[0],
  currentDate: new Date(),
  tempDate: new Date(),
  modalVisible: false,
  datePickerVisible: false,
  currencyPickerVisible: false,
  newExpense: { description: "", amount: "" },
  isLoading: true,

  // Actions
  setExpenses: (expenses) => set({ expenses }),

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

  setModalVisible: (visible) => set({ modalVisible: visible }),
  setDatePickerVisible: (visible) => set({ datePickerVisible: visible }),
  setCurrencyPickerVisible: (visible) =>
    set({ currencyPickerVisible: visible }),
  setNewExpense: (expense) => set({ newExpense: expense }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setTempDate: (date) => set({ tempDate: date }),

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
        // Sample data implementation
        const sampleExpenses: Expense[] = [
          // Your sample data here
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
