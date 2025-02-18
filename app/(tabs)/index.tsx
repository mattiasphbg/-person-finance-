import { StatusBar, StyleSheet, View } from "react-native";
import { Grid, GridItem } from "@/components/ui/grid";

import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  return (
    <View className="pt-10">
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
          <Text>One</Text>
        </GridItem>

        <GridItem
          className="bg-background-50 p-6 rounded-md border-solid border-2 border-red-500"
          _extra={{
            className: "col-span-8",
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
            className: "col-span-2",
          }}
        >
          <Text className="text-2xl font-bold">Five</Text>
        </GridItem>
      </Grid>
    </View>
  );
}
