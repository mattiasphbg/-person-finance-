import React from "react";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import expanseWidget from "./ExpanseWidget";
import ExpensePage from "../(tabs)/expenses";

const nameToWidget = {
  Expense: expanseWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
      props.renderWidget(<Widget />);
      break;

    case "WIDGET_UPDATE":
      props.renderWidget(<Widget />);
      break;

    case "WIDGET_RESIZED":
      props.renderWidget(<Widget />);
      break;

    case "WIDGET_DELETED":
      break;

    case "WIDGET_CLICK":
      console.log("WIDGET_CLICK", props.clickAction);
      if (props.clickAction === "directToExpensePage") {
        console.log("directToExpensePage");
        props.renderWidget(<ExpensePage />);
      }
      break;

    default:
      break;
  }
}
