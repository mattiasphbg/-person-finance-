import { SafeAreaView, StatusBar } from "react-native";
import RenderExpenses from "@/components/RenderExpanses";
//
const ExpensePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <RenderExpenses />
    </SafeAreaView>
  );
};

export default ExpensePage;
