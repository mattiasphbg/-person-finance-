import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

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

export interface ExportedAppData {
  expenses: Expense[];
  selectedCurrency: string | null;
}

export const exportAppData = async (): Promise<{
  success: boolean;
  uri?: string;
  error?: string;
}> => {
  try {
    const [expenses, selectedCurrency] = await Promise.all([
      getExpenses(),
      getSelectedCurrency(),
    ]);
    const data: ExportedAppData = { expenses, selectedCurrency };
    const json = JSON.stringify(data, null, 2);
    const fileUri = `${FileSystem.documentDirectory}personal-finance-backup.json`;
    await FileSystem.writeAsStringAsync(fileUri, json, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return { success: true, uri: fileUri };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const importAppData = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return { success: false, error: "No file selected." };
    }
    const fileUri = result.assets[0].uri;
    const json = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const data: ExportedAppData = JSON.parse(json);
    if (data.expenses) {
      await saveExpenses(data.expenses);
    }
    if (data.selectedCurrency) {
      await saveSelectedCurrency(data.selectedCurrency);
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
