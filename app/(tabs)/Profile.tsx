import { ProfilePage } from "@/components/profile/RenderProfile";
import { SafeAreaView, StatusBar } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <ProfilePage />
    </SafeAreaView>
  );
}
