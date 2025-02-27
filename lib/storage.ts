import { MMKV } from "react-native-mmkv";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
};

let storage: MMKV;

try {
  storage = new MMKV({
    id: "expense-tracker-storage",
  });
} catch (error) {
  console.error("Failed to initialize MMKV storage:", error);
  // Fallback to using memory storage when MMKV fails
  const memoryStorage = new Map<string, string>();
  storage = {
    set: (key: string, value: string) => memoryStorage.set(key, value),
    getString: (key: string) => memoryStorage.get(key) || null,
    delete: (key: string) => memoryStorage.delete(key),
    clearAll: () => memoryStorage.clear(),
  } as unknown as MMKV;
}

export const expensesStorageKey = "expenses";
export const CURRENCY_STORAGE_KEY = "selected_currency";

export const saveExpenses = (expenses: Expense[]): void => {
  try {
    storage.set(expensesStorageKey, JSON.stringify(expenses));
  } catch (error) {
    console.error("Failed to save expenses:", error);
  }
};

export const getExpenses = (): Expense[] => {
  try {
    const data = storage.getString(expensesStorageKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to get expenses:", error);
    return [];
  }
};

export const saveSelectedCurrency = (currencyCode: string): void => {
  try {
    storage.set(CURRENCY_STORAGE_KEY, currencyCode);
  } catch (error) {
    console.error("Failed to save currency:", error);
  }
};

export const getSelectedCurrency = (): string => {
  try {
    return storage.getString(CURRENCY_STORAGE_KEY) || "USD";
  } catch (error) {
    console.error("Failed to get currency:", error);
    return "USD";
  }
};
