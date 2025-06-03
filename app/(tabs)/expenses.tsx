import { SafeAreaView, StatusBar } from "react-native";
import RenderExpenses from "@/components/RenderExpanses";

// TODO: create widgets for adding expenses

const ExpensePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" className="flex-1" />
      <RenderExpenses />
    </SafeAreaView>
  );
};

export default ExpensePage;
