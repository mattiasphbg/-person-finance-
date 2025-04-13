import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Text } from "../ui/text";

interface MonthNavigatorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

function MonthNavigator({ currentDate, setCurrentDate }: MonthNavigatorProps) {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

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

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setPickerVisible(false);
  };

  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();

  return (
    <View className="flex-row justify-between items-center mb-4">
      <TouchableOpacity onPress={() => changeMonth(-1)} activeOpacity={0.7}>
        <Text className="text-indigo-600 text-base">← Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPickerVisible(true)}>
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

      <Modal visible={isPickerVisible} transparent={true} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-xl p-4 w-80 shadow-lg">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                onPress={() => {
                  const newDate = new Date(currentDate);
                  newDate.setFullYear(currentYear - 1);
                  setCurrentDate(newDate);
                }}
              >
                <Text className="text-indigo-600">← {currentYear - 1}</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold">{currentYear}</Text>
              <TouchableOpacity
                onPress={() => {
                  const newDate = new Date(currentDate);
                  newDate.setFullYear(currentYear + 1);
                  setCurrentDate(newDate);
                }}
              >
                <Text className="text-indigo-600">{currentYear + 1} →</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={months}
              numColumns={3}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className={`flex-1 h-14 justify-center items-center m-1 rounded-md ${
                    index === currentMonthIndex
                      ? "bg-indigo-600"
                      : "bg-gray-100"
                  }`}
                  onPress={() => handleMonthSelect(index)}
                >
                  <Text
                    className={`text-base ${
                      index === currentMonthIndex
                        ? "text-white font-bold"
                        : "text-gray-800"
                    }`}
                  >
                    {item.substring(0, 3)}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <View className="flex-row justify-end mt-4">
              <TouchableOpacity
                className="px-4 py-2"
                onPress={() => setPickerVisible(false)}
              >
                <Text className="text-indigo-600 font-medium">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MonthNavigator;
