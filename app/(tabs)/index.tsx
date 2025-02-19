import { View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="pt-10 flex-1">
      <Image
        source={{
          uri: "https://res.cloudinary.com/dxhfq1g84/image/upload/v1739961753/pexels-cottonbro-3943741_qfhmrf.jpg",
        }}
        alt="background"
        className="absolute inset-0 w-full h-full -z-10"
      />

      <View className="flex flex-col justify-between w-full h-full border-solid border-2 border-red-500 p-5">
        <View className="p-6 rounded-md border-solid border-2 border-red-500">
          <Heading className="text-3xl color-black">
            Fiance for the lazy
          </Heading>
        </View>

        <View className="flex-2 items-center justify-center bg-background-50 p-6 rounded-md border-solid border-2 border-red-500">
          <Button onPress={() => router.push("/explore")}>
            <Text className="text-2xl font-bold text-white">Start here</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
