import "expo-router/entry-classic";

import { registerRootComponent } from "expo";
import { registerWidgetTaskHandler } from "react-native-android-widget";

import App from "./app/(tabs)/index";
import { widgetTaskHandler } from "./app/widgets/widget-task-handler";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
registerWidgetTaskHandler(widgetTaskHandler);
