import Dashboard from "@/components/dashboard";
import { SafeAreaView, StatusBar } from "react-native";

// create preview for the widget in the home screen
import { View, Text } from "react-native";
import { WidgetPreview } from "react-native-android-widget";
import ExpenseWidget from "@/widgets/ExpanseWidget";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <Dashboard />
      <WidgetPreview renderWidget={ExpenseWidget} height={100} width={100} />
    </SafeAreaView>
  );
}
