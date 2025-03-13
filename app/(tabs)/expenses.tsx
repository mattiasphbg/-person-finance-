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
import RenderExpenses from "@/components/RenderExpanses";

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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      {RenderExpenses()}

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
