import Dashboard from "@/components/dashboard";
import { SafeAreaView, StatusBar } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <Dashboard />
    </SafeAreaView>
  );
}
