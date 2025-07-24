import React from "react";
import { FlexWidget, TextWidget } from "react-native-android-widget";

export default function ExpanseWidget() {
  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#efefef",
        borderRadius: 16,
      }}
      // Action: Open the main app
      clickAction="OPEN_APP"
      // Data: Tell the app to go to the 'expenses' screen
      clickActionData={{ screen: "expenses" }}
    >
      <TextWidget
        text="Add New Expense"
        style={{ fontSize: 22, color: "#000000" }}
      />
    </FlexWidget>
  );
}
