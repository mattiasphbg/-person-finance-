"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import {
  saveExpenses,
  getExpenses,
  saveSelectedCurrency,
  getSelectedCurrency,
  Expense,
} from "@/lib/storage"; // Adjust path as needed

interface Currency {
  code: string;
  symbol: string;
}

// Simplified currencies without exchange rates
const currencies: Currency[] = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
];

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currencyPickerVisible, setCurrencyPickerVisible] = useState(false);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);

  // Load data from MMKV storage on component mount
  useEffect(() => {
    // Load saved expenses
    const savedExpenses = getExpenses();
    if (savedExpenses.length > 0) {
      setExpenses(savedExpenses);
    } else {
      // If no saved expenses, use sample data
      const sampleExpenses: Expense[] = [
        {
          id: "1",
          description: "Groceries",
          amount: 50.0,
          date: "2025-02-24",
          currency: "USD",
        },
        {
          id: "2",
          description: "Gas",
          amount: 30.0,
          date: "2025-02-23",
          currency: "USD",
        },
        {
          id: "3",
          description: "Movie tickets",
          amount: 25.0,
          date: "2025-02-22",
          currency: "USD",
        },
        {
          id: "4",
          description: "Dinner",
          amount: 40.0,
          date: "2024-01-15",
          currency: "USD",
        },
        {
          id: "5",
          description: "Books",
          amount: 35.0,
          date: "2025-03-05",
          currency: "USD",
        },
      ];
      setExpenses(sampleExpenses);
      saveExpenses(sampleExpenses); // Save sample data to storage
    }

    // Load saved currency preference
    const savedCurrencyCode = getSelectedCurrency();
    const savedCurrency =
      currencies.find((c) => c.code === savedCurrencyCode) || currencies[0];
    setCurrentCurrency(savedCurrency);
  }, []);

  // Modified to save to MMKV storage
  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
        date: currentDate.toISOString().split("T")[0],
        currency: currentCurrency.code,
      };

      const updatedExpenses = [expense, ...expenses];
      setExpenses(updatedExpenses);
      saveExpenses(updatedExpenses); // Save to MMKV

      setNewExpense({ description: "", amount: "" });
      setModalVisible(false);
    }
  };

  // Modified to save to MMKV storage
  const removeExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses); // Save to MMKV
  };

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

  // Filter expenses by the current display currency
  const currentCurrencyExpenses = currentMonthExpenses.filter(
    (expense) => expense.currency === currentCurrency.code
  );

  // Calculate total of expenses in the current currency only
  const totalExpenses = currentCurrencyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Modified to save currency preference to MMKV
  const selectCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
    saveSelectedCurrency(currency.code); // Save to MMKV
    setCurrencyPickerVisible(false);
  };

  const renderExpenseItem = ({ item }: { item: Expense }) => {
    // Only show expenses in the selected currency
    if (item.currency !== currentCurrency.code) return null;

    return (
      <View className="bg-white p-4 rounded-md mb-2 shadow-md flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-lg font-semibold">{item.description}</Text>
          <Text className="text-base text-green-500">
            {currentCurrency.symbol}
            {item.amount.toFixed(2)}
          </Text>
          <Text className="text-sm text-gray-500">{item.date}</Text>
        </View>
        <TouchableOpacity
          className="bg-red-500 rounded-full w-8 h-8 justify-center items-center"
          onPress={() => removeExpense(item.id)}
        >
          <Text className="text-white font-bold text-base">X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
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
      <ScrollView className="h-52 w-full">
        {months.map((month, index) => (
          <TouchableOpacity
            key={month}
            className={`p-2 items-center ${
              tempDate.getMonth() === index ? "bg-blue-500 rounded-md" : ""
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
                  : "text-black"
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
      <ScrollView className="h-52 w-full">
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            className={`p-2 items-center ${
              tempDate.getFullYear() === year ? "bg-blue-500 rounded-md" : ""
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
                  : "text-black"
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
    return (
      <ScrollView className="h-52 w-full">
        {currencies.map((currency) => (
          <TouchableOpacity
            key={currency.code}
            className={`p-2 items-center ${
              currentCurrency.code === currency.code
                ? "bg-blue-500 rounded-md"
                : ""
            }`}
            onPress={() => selectCurrency(currency)}
          >
            <Text
              className={
                currentCurrency.code === currency.code
                  ? "text-white font-bold"
                  : "text-black"
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
    <View className="flex-1 p-5 bg-gray-100">
      <Text className="text-3xl font-bold mb-3 text-center">
        Monthly Expenses
      </Text>
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text className="text-blue-500 text-lg">← Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDatePicker}>
          <Text className="text-xl font-semibold text-blue-500">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text className="text-blue-500 text-lg">Next →</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-xl font-bold">
          Total: {currentCurrency.symbol}
          {totalExpenses.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => setCurrencyPickerVisible(true)}>
          <Text className="text-blue-500 text-lg">
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
          <Text className="text-lg text-gray-500">
            No expenses in {currentCurrency.code} for this month
          </Text>
        </View>
      )}

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md items-center mt-3"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-bold text-lg">Add Expense</Text>
      </TouchableOpacity>

      {/* Modals remain unchanged */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="m-5 bg-white rounded-2xl p-8 items-center shadow-md">
          <TextInput
            className="h-12 w-full border border-gray-300 rounded-md mb-3 px-4 text-lg"
            placeholder="Description"
            value={newExpense.description}
            onChangeText={(text) =>
              setNewExpense({ ...newExpense, description: text })
            }
          />
          <TextInput
            className="h-12 w-full border border-gray-300 rounded-md mb-3 px-4 text-lg"
            placeholder="Amount"
            keyboardType="numeric"
            value={newExpense.amount}
            onChangeText={(text) =>
              setNewExpense({ ...newExpense, amount: text })
            }
          />
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-md items-center mt-3"
            onPress={addExpense}
          >
            <Text className="text-white font-bold text-lg">Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 p-4 rounded-md items-center mt-3"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white font-bold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={datePickerVisible}
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View className="m-5 bg-white rounded-2xl p-8 items-center shadow-md">
          <Text className="text-2xl font-bold mb-5">Select Month and Year</Text>
          <View className="flex-row justify-between w-full mb-5">
            <View className="w-2/5">{renderMonthPicker()}</View>
            <View className="w-2/5">{renderYearPicker()}</View>
          </View>
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-md items-center mt-3"
            onPress={applyDateSelection}
          >
            <Text className="text-white font-bold text-lg">Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 p-4 rounded-md items-center mt-3"
            onPress={() => setDatePickerVisible(false)}
          >
            <Text className="text-white font-bold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={currencyPickerVisible}
        onRequestClose={() => setCurrencyPickerVisible(false)}
      >
        <View className="m-5 bg-white rounded-2xl p-8 items-center shadow-md">
          <Text className="text-2xl font-bold mb-5">Select Currency</Text>
          <View className="w-full">{renderCurrencyPicker()}</View>
          <TouchableOpacity
            className="bg-red-500 p-4 rounded-md items-center mt-3"
            onPress={() => setCurrencyPickerVisible(false)}
          >
            <Text className="text-white font-bold text-lg">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
