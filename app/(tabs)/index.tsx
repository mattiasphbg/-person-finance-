import { StatusBar, StyleSheet, View } from "react-native";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
export default function HomeScreen() {
  return (
    <View className="pt-10">
      <Image
        source={{
          uri: "https://res.cloudinary.com/dxhfq1g84/image/upload/v1739951850/pexels-mohamed-hamdi-510308652-16282306_mupgva.jpg",
        }}
        alt="background"
        className="absolute inset-0 w-full h-full -z-10"
      />
      <StatusBar barStyle="dark-content" />
      <Grid
        className="gap-5 w-screen h-screen"
        _extra={{
          className: "grid-cols-12",
        }}
      >
        <GridItem
          className="bg-background-50 p-6 rounded-md border-solid border-2 border-red-500"
          _extra={{
            className: "col-span-12",
          }}
        >
          <Heading bold>Welcome to the app</Heading>
        </GridItem>

        <GridItem
          className="bg-background-50 p-6 rounded-md border-solid border-2 border-red-500"
          _extra={{
            className: "col-span-4",
          }}
        >
          <Text className="text-2xl font-bold ">Two</Text>
        </GridItem>
        <GridItem
          className="bg-background-50 p-6 rounded-md border-solid border-2 border-red-500"
          _extra={{
            className: "col-span-4",
          }}
        >
          <Text className="text-2xl font-bold">Three</Text>
        </GridItem>
        <GridItem
          className="bg-background-50  p-6 rounded-md border-solid border-2 border-red-500"
          _extra={{
            className: "col-span-8",
          }}
        >
          <Text className="text-2xl font-bold">Four</Text>
        </GridItem>
        <GridItem
          className="bg-background-50 p-6 rounded-md border-solid border-2 border-red-500"
          _extra={{
            className: "col-span-",
          }}
        >
          <Text className="text-2xl font-bold">Five</Text>
        </GridItem>
      </Grid>
    </View>
  );
}
