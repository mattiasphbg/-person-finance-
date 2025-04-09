import React from "react";
import { View, Modal, TouchableOpacity, TextInput } from "react-native";
import { Text } from "../ui/text";

interface AddExpenseModalProps {
  isVisible: boolean;
  hideModal: () => void;
  newExpenseForm: { description: string; amount: string };
  updateNewExpenseForm: (form: {
    description?: string;
    amount?: string;
  }) => void;
  addExpense: (expense: {
    description: string;
    amount: number;
    date: string;
    currency: string;
  }) => void;
  currentCurrency: { code: string };
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isVisible,
  hideModal,
  newExpenseForm,
  updateNewExpenseForm,
  addExpense,
  currentCurrency,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={hideModal}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-5 w-4/5 shadow-lg">
          <Text className="text-xl font-bold mb-5 text-center">
            Add New Expense
          </Text>
          <TextInput
            className="h-12 border border-gray-300 rounded-lg mb-3 px-4 text-base"
            placeholder="Description"
            value={newExpenseForm.description}
            onChangeText={(text) => updateNewExpenseForm({ description: text })}
          />
          <TextInput
            className="h-12 border border-gray-300 rounded-lg mb-3 px-4 text-base"
            placeholder="Amount"
            keyboardType="numeric"
            value={newExpenseForm.amount}
            onChangeText={(text) => updateNewExpenseForm({ amount: text })}
          />
          <TouchableOpacity
            className="bg-indigo-600 p-3 rounded-lg items-center mt-2"
            onPress={() =>
              addExpense({
                description: newExpenseForm.description,
                amount: Number(newExpenseForm.amount),
                date: new Date().toISOString(),
                currency: currentCurrency.code,
              })
            }
          >
            <Text className="text-white font-bold text-base">Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 p-3 rounded-lg items-center mt-2"
            onPress={hideModal}
          >
            <Text className="text-white font-bold text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddExpenseModal;
