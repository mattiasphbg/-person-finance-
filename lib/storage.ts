import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  EXPENSES: "@PersonalFinance:expenses",
  SELECTED_CURRENCY: "@PersonalFinance:selectedCurrency",
};

// Define types
export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
}

export const saveExpenses = async (expenses: Expense[]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    return true;
  } catch (error) {
    console.error("Error saving expenses:", error);
    return false;
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.EXPENSES);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Error getting expenses:", error);
    return [];
  }
};

export const saveSelectedCurrency = async (
  currencyCode: string
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CURRENCY, currencyCode);
    return true;
  } catch (error) {
    console.error("Error saving currency:", error);
    return false;
  }
};

export const getSelectedCurrency = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CURRENCY);
  } catch (error) {
    console.error("Error getting currency:", error);
    return null;
  }
};

export const clearAllData = async (): Promise<boolean> => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error("Error clearing data:", error);
    return false;
  }
};
