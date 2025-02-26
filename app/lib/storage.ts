import { MMKV } from "react-native-mmkv";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
};

export const storage = new MMKV({
  id: "expense-tracker-storage",
});

export const expensesStorageKey = "expenses";
export const CURRENCY_STORAGE_KEY = "selected_currency";

export const saveExpenses = (expenses: Expense[]): void => {
  storage.set(expensesStorageKey, JSON.stringify(expenses));
};

export const getExpenses = (): Expense[] => {
  const data = storage.getString(expensesStorageKey);
  return data ? JSON.parse(data) : [];
};

export const saveSelectedCurrency = (currencyCode: string): void => {
  storage.set(CURRENCY_STORAGE_KEY, currencyCode);
};

export const getSelectedCurrency = (): string => {
  return storage.getString(CURRENCY_STORAGE_KEY) || "USD";
};
