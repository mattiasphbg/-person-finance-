import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../ui/text";

interface MonthNavigatorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <View className="flex-row justify-between items-center mb-4">
      <TouchableOpacity onPress={() => changeMonth(-1)} activeOpacity={0.7}>
        <Text className="text-indigo-600 text-base">← Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className="text-lg font-semibold text-indigo-600">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeMonth(1)} activeOpacity={0.7}>
        <Text className="text-indigo-600 text-base">Next →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MonthNavigator;
