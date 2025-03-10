import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

// Define Expense type
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

const expensePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentCurrency, setCurrentCurrency] = useState<Currency>({
    code: "USD",
    symbol: "$",
  });
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currencyPickerVisible, setCurrencyPickerVisible] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setExpenses([
        {
          id: "1",
          description: "Groceries",
          amount: 85.75,
          date: new Date().toISOString(),
          currency: "USD",
        },
        {
          id: "2",
          description: "Dinner",
          amount: 42.5,
          date: new Date().toISOString(),
          currency: "USD",
        },
        {
          id: "3",
          description: "Movie tickets",
          amount: 24.0,
          date: new Date().toISOString(),
          currency: "USD",
        },
      ]);
      setIsLoading(false);
    }, 1000);
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

  const currentMonthExpenses = filterExpensesByMonth(currentDate);
  const currentCurrencyExpenses = currentMonthExpenses.filter(
    (expense) => expense.currency === currentCurrency.code
  );
  const totalExpenses = currentCurrencyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const addExpense = () => {
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

    const newExpenseItem: Expense = {
      id: Date.now().toString(),
      description: newExpense.description,
      amount: amount,
      date: currentDate.toISOString(),
      currency: currentCurrency.code,
    };

    setExpenses([...expenses, newExpenseItem]);
    setNewExpense({ description: "", amount: "" });
    setModalVisible(false);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const selectCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
    setCurrencyPickerVisible(false);
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const openDatePicker = () => {
    setTempDate(new Date(currentDate));
    setDatePickerVisible(true);
  };

  const applyDateSelection = () => {
    setCurrentDate(tempDate);
    setDatePickerVisible(false);
  };

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

  const renderMonthPicker = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <ScrollView className="h-52">
        {months.map((month, index) => (
          <TouchableOpacity
            key={month}
            className={`p-3 items-center ${
              tempDate.getMonth() === index ? "bg-indigo-600 rounded-md" : ""
            }`}
            onPress={() => {
              const newDate = new Date(tempDate);
              newDate.setMonth(index);
              setTempDate(newDate);
            }}
          >
            <Text
              className={
                tempDate.getMonth() === index
                  ? "text-white font-bold"
                  : "text-gray-800"
              }
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

    return (
      <ScrollView className="h-52">
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            className={`p-3 items-center ${
              tempDate.getFullYear() === year ? "bg-indigo-600 rounded-md" : ""
            }`}
            onPress={() => {
              const newDate = new Date(tempDate);
              newDate.setFullYear(year);
              setTempDate(newDate);
            }}
          >
            <Text
              className={
                tempDate.getFullYear() === year
                  ? "text-white font-bold"
                  : "text-gray-800"
              }
            >
              {year}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderCurrencyPicker = () => {
    const currencies = [
      { code: "USD", symbol: "$" },
      { code: "EUR", symbol: "€" },
      { code: "GBP", symbol: "£" },
      { code: "JPY", symbol: "¥" },
    ];

    return (
      <ScrollView className="h-52">
        {currencies.map((currency) => (
          <TouchableOpacity
            key={currency.code}
            className={`p-3 items-center ${
              currentCurrency.code === currency.code
                ? "bg-indigo-600 rounded-md"
                : ""
            }`}
            onPress={() => selectCurrency(currency)}
          >
            <Text
              className={
                currentCurrency.code === currency.code
                  ? "text-white font-bold"
                  : "text-gray-800"
              }
            >
              {currency.code} ({currency.symbol})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderDashboard = () => {
    return (
      <>
        {/* Header Section */}
        <View className="flex-row justify-between items-start px-5 pt-5 pb-3">
          <View>
            <Text className="text-2xl font-semibold text-gray-800">$</Text>
            <Text className="text-sm text-gray-600 mt-1">
              Current net worth
            </Text>
            <Text className="text-xl font-semibold text-gray-800 mt-0.5"></Text>
          </View>
          <TouchableOpacity className="flex-row items-center bg-indigo-100 px-3 py-1.5 rounded-full">
            <Ionicons name="flag-outline" size={16} color="#4834d4" />
            <Text className="text-indigo-600 font-medium ml-1">Goals</Text>
          </TouchableOpacity>
        </View>

        {/* Chart Section */}
        <View className="bg-white mx-5 rounded-xl p-2.5 mt-2 shadow">
          <View className="absolute top-1/2 right-1/5 w-6 h-6 rounded-full bg-white justify-center items-center shadow-md shadow-indigo-500">
            <View className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
          </View>
          <View className="flex-row justify-between px-2 mt-2">
            <Text className="text-xs text-gray-500">Today</Text>
            <Text className="text-xs text-gray-500">Aug 12</Text>
          </View>
        </View>

        <ScrollView className="flex-1 mt-5">
          {/* Cash Section */}
          <View className="bg-white mx-5 rounded-xl p-4 mb-4 shadow">
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-800">Cash</Text>
              <Text className="text-lg font-semibold text-gray-800">
                $4,100.00
              </Text>
            </View>

            {/* Individual Cash Account */}
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-full bg-indigo-600 justify-center items-center mr-3">
                  <MaterialCommunityIcons
                    name="wallet-outline"
                    size={18}
                    color="#fff"
                  />
                </View>
                <View>
                  <Text className="text-base font-medium text-gray-800">
                    Individual Cash Account
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    Updated • 6/25/23
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-base font-medium text-gray-800">
                  $100.00
                </Text>
                <Text className="text-sm text-yellow-500 mt-0.5">Pending</Text>
              </View>
            </View>

            {/* Checking Account */}
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-full bg-red-500 justify-center items-center mr-3">
                  <FontAwesome5 name="university" size={16} color="#fff" />
                </View>
                <View>
                  <Text className="text-base font-medium text-gray-800">
                    Checking
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    Bank of America
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-base font-medium text-gray-800">
                  $2,500.00
                </Text>
                <Text className="text-sm text-gray-500 mt-0.5">
                  5 minutes ago
                </Text>
              </View>
            </View>

            {/* Savings Account */}
            <View className="flex-row justify-between items-center py-3">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-full bg-red-500 justify-center items-center mr-3">
                  <FontAwesome5 name="piggy-bank" size={16} color="#fff" />
                </View>
                <View>
                  <Text className="text-base font-medium text-gray-800">
                    Savings
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    Bank of America
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-base font-medium text-gray-800">
                  $1,500.00
                </Text>
                <Text className="text-sm text-gray-500 mt-0.5">
                  5 minutes ago
                </Text>
              </View>
            </View>
          </View>

          {/* Liabilities Section */}
          <View className="bg-white mx-5 rounded-xl p-4 mb-4 shadow">
            <View className="flex-row justify-between">
              <Text className="text-lg font-semibold text-gray-800">
                Liabilities
              </Text>
              <Text className="text-lg font-semibold text-gray-800">$0</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  // Render the expenses tab
  const renderExpenses = () => {
    if (isLoading) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-base text-gray-500">Loading expenses...</Text>
        </View>
      );
    }

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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      {/* Main Content */}
      {activeTab === "dashboard" ? renderDashboard() : renderExpenses()}

      {/* Bottom Navigation */}
      <View className="flex-row justify-around py-3 bg-white border-t border-gray-100">
        <TouchableOpacity
          className="items-center justify-center w-16"
          onPress={() => setActiveTab("dashboard")}
        >
          <Ionicons
            name="home"
            size={24}
            color={activeTab === "dashboard" ? "#4834d4" : "#888"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center w-16"
          onPress={() => setActiveTab("expenses")}
        >
          <MaterialCommunityIcons
            name="cash-multiple"
            size={24}
            color={activeTab === "expenses" ? "#4834d4" : "#888"}
          />
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center w-16">
          <Ionicons name="swap-horizontal" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center w-16">
          <Ionicons name="person-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Modals */}
      {/* Add Expense Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-5 w-4/5 shadow-lg">
            <Text className="text-xl font-bold mb-5 text-center">
              Add New Expense
            </Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-lg mb-3 px-4 text-base"
              placeholder="Description"
              value={newExpense.description}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, description: text })
              }
            />
            <TextInput
              className="h-12 border border-gray-300 rounded-lg mb-3 px-4 text-base"
              placeholder="Amount"
              keyboardType="numeric"
              value={newExpense.amount}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, amount: text })
              }
            />
            <TouchableOpacity
              className="bg-indigo-600 p-3 rounded-lg items-center mt-2"
              onPress={addExpense}
            >
              <Text className="text-white font-bold text-base">Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 p-3 rounded-lg items-center mt-2"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-bold text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={datePickerVisible}
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-5 w-4/5 shadow-lg">
            <Text className="text-xl font-bold mb-5 text-center">
              Select Month and Year
            </Text>
            <View className="flex-row justify-between w-full mb-5">
              <View className="w-2/5">{renderMonthPicker()}</View>
              <View className="w-2/5">{renderYearPicker()}</View>
            </View>
            <TouchableOpacity
              className="bg-indigo-600 p-3 rounded-lg items-center mt-2"
              onPress={applyDateSelection}
            >
              <Text className="text-white font-bold text-base">Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 p-3 rounded-lg items-center mt-2"
              onPress={() => setDatePickerVisible(false)}
            >
              <Text className="text-white font-bold text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Currency Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={currencyPickerVisible}
        onRequestClose={() => setCurrencyPickerVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-5 w-4/5 shadow-lg">
            <Text className="text-xl font-bold mb-5 text-center">
              Select Currency
            </Text>
            {renderCurrencyPicker()}
            <TouchableOpacity
              className="bg-red-500 p-3 rounded-lg items-center mt-2"
              onPress={() => setCurrencyPickerVisible(false)}
            >
              <Text className="text-white font-bold text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default expensePage;
