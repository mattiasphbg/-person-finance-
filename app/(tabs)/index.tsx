import { View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import renderDashboard from "@/components/dashboard";

export default function HomeScreen() {
  return renderDashboard();
}
