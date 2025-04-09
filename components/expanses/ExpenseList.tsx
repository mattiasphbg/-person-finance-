import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "../ui/text";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  currency: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  removeExpense: (id: string) => void;
  currentCurrency: { code: string; symbol: string };
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  removeExpense,
  currentCurrency,
}) => {
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
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      className="flex-1"
    />
  );
};

export default ExpenseList;
