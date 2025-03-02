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

// Generate sample expenses for the current month with fixed dates
export function generateSampleExpenses(currency: string = "USD"): Expense[] {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Create a date formatter function for the current month
  const createDateForCurrentMonth = (day: number) => {
    return new Date(currentYear, currentMonth, day).toISOString().split("T")[0];
  };

  // Sample data with fixed dates within current month
  const sampleData = [
    {
      description: "Grocery shopping",
      amount: 78.45,
      date: createDateForCurrentMonth(5), // 5th of current month
    },
    {
      description: "Restaurant dinner",
      amount: 42.5,
      date: createDateForCurrentMonth(12), // 12th of current month
    },
    {
      description: "Monthly subscription",
      amount: 9.99,
      date: createDateForCurrentMonth(1), // 1st of current month
    },
    {
      description: "Transportation",
      amount: 25.0,
      date: createDateForCurrentMonth(8), // 8th of current month
    },
    {
      description: "Coffee shop",
      amount: 4.75,
      date: createDateForCurrentMonth(15), // 15th of current month
    },
  ];

  // Convert to Expense objects with IDs
  return sampleData.map((item) => ({
    id: `sample-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    description: item.description,
    amount: item.amount,
    date: item.date,
    currency: currency,
  }));
}
