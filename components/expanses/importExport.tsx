import { exportAppData, importAppData } from "@/lib/storage";
import { Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../ui/text";
import { useExpenseStore } from "@/stores/useExpenseStore";
import { Menu, MenuItemLabel, MenuItem } from "@/components/ui/menu";

import { Pressable } from "react-native";

export default function ImportExport() {
  const { fetchExpenses } = useExpenseStore();

  return (
    <>
      <Menu
        placement="bottom left"
        trigger={(triggerProps) => (
          <Pressable {...triggerProps}>
            <Text>Menu</Text>
          </Pressable>
        )}
      >
        <MenuItem key="impoert">
          <TouchableOpacity
            className="bg-green-600 p-4 rounded-xl items-center mt-4"
            onPress={async () => {
              const result = await exportAppData();
              if (result.success) {
                Alert.alert("Export Success", `File saved to: ${result.uri}`);
              } else {
                Alert.alert("Export Failed", result.error || "Unknown error");
              }
            }}
          >
            <Text className="text-white font-bold text-base">Export Data</Text>
          </TouchableOpacity>
        </MenuItem>
        <MenuItem>
          <TouchableOpacity
            className="bg-blue-600 p-4 rounded-xl items-center mt-4"
            onPress={async () => {
              const result = await importAppData();
              if (result.success) {
                Alert.alert("Import Success", "Data imported successfully!");
                fetchExpenses();
              } else {
                Alert.alert("Import Failed", result.error || "Unknown error");
              }
            }}
          >
            <Text className="text-white font-bold text-base">Import Data</Text>
          </TouchableOpacity>
        </MenuItem>
      </Menu>
    </>
  );
}
