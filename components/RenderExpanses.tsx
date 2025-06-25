import {
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  Button,
  SafeAreaView,
} from "react-native";
import { Text } from "./ui/text";
import { useExpenseStore } from "@/stores/useExpenseStore";
import React from "react";
import ExpenseList from "./expanses/ExpenseList";
import MonthNavigator from "./expanses/MonthNavigator";
import AddExpenseModal from "./expanses/AddExpenseModal";
import ExpenseSummary from "./expanses/ExpenseSummary";

import ImportExport from "./expanses/importExport";

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
    newExpenseForm,
    updateNewExpenseForm,
    addExpense,
    setCurrentCurrency,
  } = useExpenseStore();

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
    { code: "SEK", symbol: "kr" },
  ];

  const [isCurrencyModalVisible, setCurrencyModalVisible] =
    React.useState(false);

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

      <Modal
        visible={isCurrencyModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-xl p-4 w-80 shadow-lg">
            <Text className="text-xl font-bold mb-4 text-center">
              Select Currency
            </Text>
            <View className="flex-row flex-wrap justify-center">
              {currencies.map((currency) => (
                <TouchableOpacity
                  key={currency.code}
                  className={`m-2 p-3 rounded-lg ${
                    currentCurrency.code === currency.code
                      ? "bg-indigo-600"
                      : "bg-gray-100"
                  }`}
                  onPress={() => {
                    setCurrentCurrency(currency);
                    setCurrencyModalVisible(false);
                  }}
                >
                  <Text
                    className={`text-base font-medium ${
                      currentCurrency.code === currency.code
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {currency.code} ({currency.symbol})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              className="mt-4 p-3 bg-gray-100 rounded-lg"
              onPress={() => setCurrencyModalVisible(false)}
            >
              <Text className="text-center text-gray-800 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="flex-1 p-5">
        <Text className="text-2xl mt-2 font-bold mb-4 text-center">
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
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            className="bg-indigo-600 p-4 rounded-xl flex-1 mr-2 items-center"
            onPress={() => showModal()}
          >
            <Text className="text-white font-bold text-base">Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-indigo-100 p-4 rounded-xl flex-1 ml-2 items-center"
            onPress={() => setCurrencyModalVisible(true)}
          >
            <Text className="text-indigo-600 font-bold text-base">
              {currentCurrency.code} ({currentCurrency.symbol})
            </Text>
          </TouchableOpacity>
        </View>

        <ImportExport />
      </View>
    </>
  );
};

export default RenderExpenses;
