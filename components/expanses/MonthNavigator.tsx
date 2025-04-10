import React, { useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { Text } from "../ui/text";
import { Calendar } from "react-native-calendars";

interface MonthNavigatorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    setPickerVisible(false);
  };

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

      <Modal visible={isPickerVisible} transparent={true}>
        <View className="flex-1 justify-center items-center">
          <Calendar
            current={currentDate.toISOString().split("T")[0]}
            onDayPress={(day: { dateString: string }) =>
              handleDateChange(new Date(day.dateString))
            }
            markedDates={{
              [currentDate.toISOString().split("T")[0]]: {
                selected: true,
                marked: true,
                selectedColor: "blue",
              },
            }}
          />
          <TouchableOpacity onPress={() => setPickerVisible(false)}>
            <Text className="text-indigo-600 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MonthNavigator;
