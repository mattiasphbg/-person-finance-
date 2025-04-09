import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

interface ExpenseSummaryProps {
  totalExpenses: number;
  currentCurrency: { symbol: string };
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  totalExpenses,
  currentCurrency,
}) => {
  return (
    <View className="flex-row justify-between items-center mb-5">
      <Text className="text-lg font-bold text-gray-800">
        Total: {currentCurrency.symbol}
        {totalExpenses.toFixed(2)}
      </Text>
    </View>
  );
};

export default ExpenseSummary;
