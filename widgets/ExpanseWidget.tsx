import React from "react";
import { FlexWidget, TextWidget } from "react-native-android-widget";

export default function expanseWidget() {
  return (
    <FlexWidget>
      <TextWidget text="Hello World" />
    </FlexWidget>
  );
}
