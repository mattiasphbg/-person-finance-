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

      <View className="flex-1 border-solid border-2 border-red-500 p-5">
        <View className="p-6 rounded-md border-solid border-2 border-red-500">
          <Heading className="text-3xl color-black">
            Fiance for the lazy
          </Heading>
        </View>

        <View className="flex-1 justify-center items-center">
          <View className="p-6 mt-20 ">
            <Button
              className="items-center rounded-[18px] text-eeeee cursor-pointer grid font-roboto text-sm font-medium h-9 text-center uppercase w-44 float-right"
              onPress={() => router.push("/explore")}
            >
              <Text className="text-2xl font-bold text-white">Start here</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
