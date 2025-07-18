import React from "react";
import { FlexWidget, TextWidget } from "react-native-android-widget";

// TODO: we need to  make when click + button change to the "expense page"
// TODO: a list with all elements added this month
export default function expanseWidget() {
  return (
    <FlexWidget
      clickAction="OPEN_URI"
      clickActionData={{ uri: "https://www.google.com" }}
    >
      <TextWidget text="Hello" />
    </FlexWidget>
  );
}
