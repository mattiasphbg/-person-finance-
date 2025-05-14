import { View, TouchableOpacity, FlatList, Modal, Alert } from "react-native";
import { Text } from "./ui/text";
import { useExpenseStore } from "@/stores/useExpenseStore";
import { useEffect } from "react";
import React from "react";
import ExpenseList from "./expanses/ExpenseList";
import MonthNavigator from "./expanses/MonthNavigator";
import AddExpenseModal from "./expanses/AddExpenseModal";
import ExpenseSummary from "./expanses/ExpenseSummary";
import { exportAppData, importAppData } from "@/lib/storage";

const RenderExpenses = () => {
  const {
    expenses,
    currentDate,
    currentCurrency,
    removeExpense,
    setCurrentDate,
    isLoading,
    isModalVisible,
    showModal,
    hideModal,
    fetchExpenses,
    newExpenseForm,
    updateNewExpenseForm,
    addExpense,
  } = useExpenseStore();

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentDate.getMonth() &&
      expenseDate.getFullYear() === currentDate.getFullYear()
    );
  });

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

  return (
    <>
      <AddExpenseModal
        isVisible={isModalVisible}
        hideModal={hideModal}
        newExpenseForm={newExpenseForm}
        updateNewExpenseForm={updateNewExpenseForm}
        addExpense={addExpense}
        currentCurrency={currentCurrency}
      />

      <View className="flex-1 p-5">
        <Text className="text-2xl font-bold mb-4 text-center">
          Monthly Expenses
        </Text>
        <MonthNavigator
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <ExpenseSummary
          totalExpenses={totalExpenses}
          currentCurrency={currentCurrency}
        />
        <ExpenseList
          expenses={currentCurrencyExpenses}
          removeExpense={removeExpense}
          currentCurrency={currentCurrency}
        />
        <TouchableOpacity
          className="bg-indigo-600 p-4 rounded-xl items-center mt-4"
          onPress={() => showModal()}
        >
          <Text className="text-white font-bold text-base">Add Expense</Text>
        </TouchableOpacity>
        {/* Export/Import Buttons */}
        <TouchableOpacity
          className="bg-green-600 p-4 rounded-xl items-center mt-4"
          onPress={async () => {
            const result = await exportAppData();
            if (result.success) {
              Alert.alert("Export Success", `File saved to: ${result.uri}`);
            } else {
              Alert.alert("Export Failed", result.error || "Unknown error");
            }
          }}
        >
          <Text className="text-white font-bold text-base">Export Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-xl items-center mt-4"
          onPress={async () => {
            const result = await importAppData();
            if (result.success) {
              Alert.alert("Import Success", "Data imported successfully!");
              fetchExpenses();
            } else {
              Alert.alert("Import Failed", result.error || "Unknown error");
            }
          }}
        >
          <Text className="text-white font-bold text-base">Import Data</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RenderExpenses;
