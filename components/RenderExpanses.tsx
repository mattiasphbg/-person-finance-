import { View, TouchableOpacity } from "react-native";
import { Text } from "./ui/text";
import { useState } from "react";
import { FlatList } from "react-native";

const filterExpensesByMonth = (date: Date) => {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === date.getMonth() &&
      expenseDate.getFullYear() === date.getFullYear()
    );
  });
};

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
}

// Define Currency type
interface Currency {
  code: string;
  symbol: string;
}

const openDatePicker = () => {
  setTempDate(new Date(currentDate));
  setDatePickerVisible(true);
};

const changeMonth = (delta: number) => {
  const newDate = new Date(currentDate);
  newDate.setMonth(newDate.getMonth() + delta);
  setCurrentDate(newDate);
};
const removeExpense = (id: string) => {
  setExpenses(expenses.filter((expense) => expense.id !== id));
};

const [currentDate, setCurrentDate] = useState<Date>(new Date());
const currentMonthExpenses = filterExpensesByMonth(currentDate);
const [expenses, setExpenses] = useState<Expense[]>([]);
const [currentCurrency, setCurrentCurrency] = useState<Currency>({
  code: "USD",
  symbol: "$",
});
const [tempDate, setTempDate] = useState<Date>(new Date());
const [modalVisible, setModalVisible] = useState(false);
const [datePickerVisible, setDatePickerVisible] = useState(false);
const [currencyPickerVisible, setCurrencyPickerVisible] = useState(false);
const [newExpense, setNewExpense] = useState({
  description: "",
  amount: "",
});
const [isLoading, setIsLoading] = useState(true);
const [activeTab, setActiveTab] = useState("dashboard");

const renderExpenses = () => {
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-base text-gray-500">Loading expenses...</Text>
      </View>
    );
  }
  const currentCurrencyExpenses = currentMonthExpenses.filter(
    (expense: { currency: string }) => expense.currency === currentCurrency.code
  );
  const totalExpenses = currentCurrencyExpenses.reduce(
    (sum: any, expense: { amount: any }) => sum + expense.amount,
    0
  );

  const renderExpenseItem = ({ item }: { item: Expense }) => {
    // Only show expenses in the selected currency
    if (item.currency !== currentCurrency.code) return null;

    return (
      <View className="bg-white p-4 rounded-xl mb-2 flex-row justify-between items-center shadow">
        <View className="flex-1">
          <Text className="text-base font-medium text-gray-800">
            {item.description}
          </Text>
          <Text className="text-sm text-gray-500">
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-base font-semibold text-indigo-600 mr-3">
            {currentCurrency.symbol}
            {item.amount.toFixed(2)}
          </Text>
          <TouchableOpacity
            className="w-6 h-6 rounded-full bg-red-500 justify-center items-center"
            onPress={() => removeExpense(item.id)}
          >
            <Text className="text-white font-bold text-xs">X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-4 text-center">
        Monthly Expenses
      </Text>
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text className="text-indigo-600 text-base">← Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDatePicker}>
          <Text className="text-lg font-semibold text-indigo-600">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text className="text-indigo-600 text-base">Next →</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-lg font-bold text-gray-800">
          Total: {currentCurrency.symbol}
          {totalExpenses.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => setCurrencyPickerVisible(true)}>
          <Text className="text-indigo-600 text-base">
            {currentCurrency.code} ▼
          </Text>
        </TouchableOpacity>
      </View>

      {currentCurrencyExpenses.length > 0 ? (
        <FlatList
          data={currentMonthExpenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
          className="flex-1"
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-base text-gray-500">
            No expenses in {currentCurrency.code} for this month
          </Text>
        </View>
      )}

      <TouchableOpacity
        className="bg-indigo-600 p-4 rounded-xl items-center mt-4"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-bold text-base">Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};
