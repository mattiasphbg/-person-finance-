import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useExpenseStore } from "@/stores/useExpenseStore";

const Dashboard = () => {
  const { expenses, currentDate, currentCurrency } = useExpenseStore();
  const screenWidth = Dimensions.get("window").width;
  const [netWorth, setNetWorth] = useState(5000);

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(72, 52, 212, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#4834d4",
    },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [3200, 3700, 4200, 3800, 4500, 5000],
        color: (opacity = 1) => `rgba(72, 52, 212, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <>
      {/* Header Section */}
      <View className="flex-row justify-between items-start px-5 pt-5 pb-3">
        <View>
          <Text className="text-2xl font-semibold text-gray-800">$</Text>
          <Text className="text-sm text-gray-600 mt-1">Current net worth</Text>
          <Text className="text-xl font-semibold text-gray-800 mt-0.5">
            ${netWorth.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity className="flex-row items-center bg-indigo-100 px-3 py-1.5 rounded-full">
          <Ionicons name="flag-outline" size={16} color="#4834d4" />
          <Text className="text-indigo-600 font-medium ml-1">Goals</Text>
        </TouchableOpacity>
      </View>

      {/* Chart Section */}
      <View className="bg-white mx-5 rounded-xl p-2.5 mt-2 shadow">
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          bezier
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          style={{
            borderRadius: 16,
            paddingRight: 0,
          }}
        />
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

export default Dashboard;
