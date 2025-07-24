import React from "react";
import { AppRegistry } from "react-native";

// 1. IMPORT THE WIDGET LIBRARY AND WIDGET HANDLER TYPES
import {
  registerWidgetTaskHandler,
  type WidgetTaskHandlerProps,
} from "react-native-android-widget";
import ExpanseWidget from "./ExpanseWidget";

// 2. IMPORT YOUR MAIN APP COMPONENT AND APP NAME
// NOTE: The following imports are commented out because the modules do not exist yet.
// Uncomment and ensure these files exist in your project before using.
//// import App from '../App'; // Adjusted path to main React Native App
//// import { name as appName } from '../app.json'; // Adjusted path to app name
// import ExpanseWidget from './widgets/ExpanseWidget';
// import IncomeWidget from './widgets/IncomeWidget';

// 3. DEFINE THE WIDGET HANDLER
// This is the clean, correct version of your handler.
const widgetTaskHandler = async (props: WidgetTaskHandlerProps) => {
  const widgetName = props.widgetInfo.widgetName;

  // We use a switch statement to decide which widget component to render.
  // This is simpler and more direct than the `nameToWidget` object.
  switch (widgetName) {
    case "ExpanseWidget":
      // For any action that requires a UI update, we render the widget.
      // The click action is handled by `OPEN_APP` and your `_layout.js` file.
      props.renderWidget(<ExpanseWidget />);
      break;

    default:
      // We don't need to handle WIDGET_CLICK, WIDGET_DELETED, or others here
      // unless you have specific logic for them (like cleaning up data).
      break;
  }
};

// 4. REGISTER THE HANDLER AND THE MAIN APP
// This tells the native widget library which function to call for widget events.
registerWidgetTaskHandler(widgetTaskHandler);

// This is the standard line that registers your main application. It must be here.
// Uncomment the following lines and ensure the imports at the top are also uncommented and correct:
// AppRegistry.registerComponent(appName, () => App);
