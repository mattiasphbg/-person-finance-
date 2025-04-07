import { View, TouchableOpacity, FlatList } from "react-native";
import { Text } from "./ui/text";
import { useExpenseStore } from "@/stores/useExpenseStore";
import { useEffect } from "react";

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

interface RenderExpensesProps {
  expenses: Expense[];
  currentDate: Date;
  currentCurrency: Currency;
  setModalVisible: (visible: boolean) => void;
  removeExpense: (id: string) => void;
  changeMonth: (delta: number) => void;
  openDatePicker: () => void;
  setCurrencyPickerVisible: (visible: boolean) => void;
}

const RenderExpenses = () => {
  const {
    expenses,
    currentDate,
    currentCurrency,
    removeExpense,
    setCurrentDate,
    setCurrentCurrency,
    isLoading,
    fetchExpenses,
    addExpense,
    setNewExpense,
  } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filterExpensesByMonth = (date: Date) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === date.getMonth() &&
        expenseDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const currentMonthExpenses = filterExpensesByMonth(currentDate);
  const currentCurrencyExpenses = currentMonthExpenses.filter(
    (expense) => expense.currency === currentCurrency.code
  );

  const totalExpenses = currentCurrencyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-base text-gray-500">Loading expenses...</Text>
      </View>
    );
  }

  const renderExpenseItem = ({ item }: { item: Expense }) => {
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

  const addExpense = async () => {
    if (
      newExpense.description.trim() === "" ||
      newExpense.amount.trim() === ""
    ) {
      return;
    }

    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount)) {
      return;
    }

    const expenseItem = {
      description: newExpense.description,
      amount: amount,
      date: currentDate.toISOString(),
      currency: currentCurrency.code,
    };

    try {
      await useExpenseStore.getState().addExpense(expenseItem);
      setNewExpense({ description: "", amount: "" });
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding expense:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-4 text-center">
        Monthly Expenses
      </Text>
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={() => changeMonth(-1)} activeOpacity={0.7}>
          <Text className="text-indigo-600 text-base">← Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-lg font-semibold text-indigo-600">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMonth(1)} activeOpacity={0.7}>
          <Text className="text-indigo-600 text-base">Next →</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-lg font-bold text-gray-800">
          Total: {currentCurrency.symbol}
          {totalExpenses.toFixed(2)}
        </Text>
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

export default RenderExpenses;
