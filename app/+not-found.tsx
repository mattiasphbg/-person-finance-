import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";

import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View
        className="flex-1 items-center justify-center p-5"
        style={{
          backgroundColor: useThemeColor(
            { light: undefined, dark: undefined },
            "background"
          ),
        }}
      >
        <Text
          className="text-3xl font-bold"
          style={{
            color: useThemeColor({ light: undefined, dark: undefined }, "text"),
            fontSize: 32,
            lineHeight: 32,
          }}
        >
          This screen doesn't exist.
        </Text>
        <Link href="/" className="mt-4 py-4">
          <Text
            className="text-base"
            style={{
              color: "#0a7ea4",
              fontSize: 16,
              lineHeight: 30,
            }}
          >
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
