import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";

import { LineChart } from "react-native-chart-kit";

import { useExpenseStore } from "@/stores/useExpenseStore";

const Dashboard = () => {
  const { expenses, currentDate, currentCurrency } = useExpenseStore();

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

  const screenWidth = Dimensions.get("window").width;

  // Get current year
  const currentYear = currentDate.getFullYear();

  // Initialize array for 12 months
  const monthlyTotals = Array(12).fill(0);

  // Sum expenses for each month of the current year and current currency
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    if (
      expenseDate.getFullYear() === currentYear &&
      expense.currency === currentCurrency.code
    ) {
      monthlyTotals[expenseDate.getMonth()] += expense.amount;
    }
  });

  const monthIndex = currentDate.getMonth() + 1;
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].slice(0, monthIndex),
    datasets: [
      {
        data: monthlyTotals.slice(0, monthIndex),
        color: (opacity = 1) => `rgba(72, 52, 212, ${opacity})`,
        strokeWidth: 1,
      },
    ],
    yAxisLabel: "$",
    yAxisSuffix: "k",
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(72, 52, 212, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#4834d4",
    },
  };
  function getMonthName(monthNumber: number): string {
    // monthNumber is 0-based (0 = January, 11 = December)
    const date = new Date(2025, monthNumber, 1);
    return date.toLocaleString("en-US", { month: "long" });
  }

  return (
    <>
      <View className="flex-row justify-between items-start px-5 pt-5 pb-3">
        <View>
          <Text className="text-2xl font-semibold text-gray-800"></Text>
          <Text className="text-lg font-semibold text-gray-800">
            {getMonthName(monthIndex - 1)} {currentYear}
          </Text>
          <Text className="text-xl font-semibold text-gray-800 mt-0.5">
            $
            {currentCurrencyExpenses.reduce(
              (acc, curr) => acc + curr.amount,
              0
            )}
          </Text>
        </View>
        <TouchableOpacity className="flex-row items-center bg-indigo-100 px-3 py-1.5 rounded-full">
          <Ionicons name="flag-outline" size={16} color="#4834d4" />
          <Text className="text-indigo-600 font-medium ml-1">Goals</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white mx-5 rounded-xl p-2.5 mt-2 shadow">
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          bezier
          withDots={true}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          formatYLabel={(yValue) => `$ ${yValue}`}
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      <ScrollView className="flex-1 mt-5">
        <View className="bg-white mx-5 rounded-xl p-4 mb-4 shadow">
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              {getMonthName(monthIndex - 1)}
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              $
              {currentCurrencyExpenses.reduce(
                (acc, curr) => acc + curr.amount,
                0
              )}
            </Text>
          </View>

          {currentCurrencyExpenses.map((expense, index) => (
            <View
              key={expense.id}
              className={`flex-row justify-between items-center py-3 ${
                index < currentCurrencyExpenses.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="flex-row items-center">
                <View
                  className={`w-9 h-9 rounded-full bg-${"orange-500"} justify-center items-center mr-3`}
                ></View>
                <View>
                  <Text className="text-base font-medium text-gray-800">
                    {expense.description}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-base font-medium text-gray-800">
                  {`${expense.currency} ${expense.amount.toFixed(2)}`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
