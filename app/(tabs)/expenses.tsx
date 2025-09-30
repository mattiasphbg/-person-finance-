import { SafeAreaView, StatusBar } from "react-native";
import RenderExpenses from "@/components/expanses/RenderExpanses";

// TODO: create widgets for adding expenses: we gonna use react-native-android-widget to start with which we can use to create a widget for adding expenses but have to create it by link to the main app just like to-do list does

const ExpensePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" className="flex-1" />
      <RenderExpenses />
    </SafeAreaView>
  );
};

export default ExpensePage;
