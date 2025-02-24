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
} from "react-native";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
}

const ExpensePage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
  });
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // In a real app, you would fetch expenses from storage or an API here
    const sampleExpenses: Expense[] = [
      { id: "1", description: "Groceries", amount: 50.0, date: "2025-02-24" },
      { id: "2", description: "Gas", amount: 30.0, date: "2025-02-23" },
      {
        id: "3",
        description: "Movie tickets",
        amount: 25.0,
        date: "2025-02-22",
      },
      { id: "4", description: "Dinner", amount: 40.0, date: "2025-01-15" },
      { id: "5", description: "Books", amount: 35.0, date: "2025-03-05" },
    ];
    setExpenses(sampleExpenses);
  }, []);

  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
        date: currentDate.toISOString().split("T")[0],
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({ description: "", amount: "" });
      setModalVisible(false);
    }
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
  const totalExpenses = currentMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View className="bg-white p-4 rounded-md mb-2 shadow-md">
      <Text className="text-lg font-semibold">{item.description}</Text>
      <Text className="text-base text-green-500">
        ${item.amount.toFixed(2)}
      </Text>
      <Text className="text-sm text-gray-500">{item.date}</Text>
    </View>
  );

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
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
        <Text className="text-xl font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text className="text-blue-500 text-lg">Next →</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-xl font-bold mb-5">
        Total: ${totalExpenses.toFixed(2)}
      </Text>
      <FlatList
        data={currentMonthExpenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md items-center mt-3"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-bold text-lg">Add Expense</Text>
      </TouchableOpacity>
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
    </View>
  );
};

export default ExpensePage;
