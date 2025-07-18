import React from "react";
import { FlexWidget, TextWidget } from "react-native-android-widget";

// TODO: we need to  make when click + button change to the "expense page"
// TODO: a list with all elements added this month
export default function expanseWidget() {
  return (
    <FlexWidget
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        height: "match_parent",
        width: "match_parent",
        borderRadius: 32,
        flex: 1,
        flexDirection: "column",
      }}
    >
      <FlexWidget
        style={{
          height: "wrap_content",
          width: "wrap_content",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
        clickAction="OPEN_APP"
      >
        <TextWidget style={{ fontSize: 12 }} text="Open App" />
      </FlexWidget>
      <FlexWidget
        style={{
          height: "wrap_content",
          width: "wrap_content",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
        clickAction="OPEN_URI"
        clickActionData={{ uri: "myapp://expenses" }}
      >
        <TextWidget
          style={{ fontSize: 12 }}
          text="Open Fitness Preview DeepLink"
        />
      </FlexWidget>
      <FlexWidget
        style={{
          height: "wrap_content",
          width: "wrap_content",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
        clickAction="OPEN_URI"
        clickActionData={{
          uri: "https://github.com/sAleksovski/react-native-android-widget",
        }}
      >
        <TextWidget style={{ fontSize: 12 }} text="Open GitHub Link" />
      </FlexWidget>
    </FlexWidget>
  );
}
