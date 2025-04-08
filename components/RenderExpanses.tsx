import { View, TouchableOpacity, FlatList, Modal } from "react-native";
import { Text } from "./ui/text";
import { useExpenseStore } from "@/stores/useExpenseStore";
import { useEffect } from "react";
import React from "react";
import { TextInput } from "react-native";

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
  isModalVisible: (visible: boolean) => void;
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
    isModalVisible,
    showModal,
    hideModal,
    fetchExpenses,
    newExpenseForm,
    updateNewExpenseForm,
    addExpense,
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

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-5 w-4/5 shadow-lg">
            <Text className="text-xl font-bold mb-5 text-center">
              Add New Expense
            </Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-lg mb-3 px-4 text-base"
              placeholder="Description"
              value={newExpenseForm.description}
              onChangeText={(text) =>
                updateNewExpenseForm({ description: text })
              }
            />
            <TextInput
              className="h-12 border border-gray-300 rounded-lg mb-3 px-4 text-base"
              placeholder="Amount"
              keyboardType="numeric"
              value={newExpenseForm.amount}
              onChangeText={(text) => updateNewExpenseForm({ amount: text })}
            />
            <TouchableOpacity
              className="bg-indigo-600 p-3 rounded-lg items-center mt-2"
              onPress={() =>
                addExpense({
                  description: newExpenseForm.description,
                  amount: Number(newExpenseForm.amount),
                  date: new Date().toISOString(),
                  currency: currentCurrency.code,
                })
              }
            >
              <Text className="text-white font-bold text-base">Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 p-3 rounded-lg items-center mt-2"
              onPress={hideModal}
            >
              <Text className="text-white font-bold text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
          onPress={() => showModal()}
        >
          <Text className="text-white font-bold text-base">Add Expense</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RenderExpenses;
