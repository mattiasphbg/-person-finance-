import React from "react";
import { ScrollView, View, Pressable, Alert } from "react-native";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";

interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = () => {
  const handleCurrencyChange = () => {
    Alert.alert(
      "Currency",
      "Currency change functionality will be implemented"
    );
  };

  const handleNotifications = () => {
    Alert.alert("Notifications", "Notification settings will be implemented");
  };

  const handleAppTheme = () => {
    Alert.alert("App Theme", "Theme settings will be implemented");
  };

  const handleImportExport = () => {
    Alert.alert(
      "Import/Export",
      "Data import/export functionality will be implemented"
    );
  };

  const handleBackupRestore = () => {
    Alert.alert(
      "Backup & Restore",
      "Backup and restore functionality will be implemented"
    );
  };

  const handleHelpFAQ = () => {
    Alert.alert("Help & FAQ", "Help and FAQ section will be implemented");
  };

  const handleContactUs = () => {
    Alert.alert("Contact Us", "Contact us functionality will be implemented");
  };

  const handlePrivacyPolicy = () => {
    Alert.alert("Privacy Policy", "Privacy policy will be implemented");
  };

  const handleTermsOfService = () => {
    Alert.alert("Terms of Service", "Terms of service will be implemented");
  };

  const ProfileSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View className="mb-6">
      <Heading size="md" className="text-gray-600 mb-3 font-semibold">
        {title}
      </Heading>
      <View className="bg-white rounded-lg shadow-sm">{children}</View>
    </View>
  );

  const ProfileItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showChevron = true,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showChevron?: boolean;
  }) => (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between py-4 px-4 border-b border-gray-100 last:border-b-0"
    >
      <HStack space="md" className="flex-1 items-center">
        <View className="w-6 h-6 items-center justify-center">
          <Ionicons name={icon as any} size={20} color="#6B7280" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-medium">{title}</Text>
          {subtitle && (
            <Text className="text-gray-500 text-sm mt-1">{subtitle}</Text>
          )}
        </View>
      </HStack>
      {showChevron && (
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      )}
    </Pressable>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Header Section */}
        <View className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <HStack space="lg" className="items-center">
            <Avatar size="xl">
              <AvatarFallbackText>YN</AvatarFallbackText>
            </Avatar>
            <View className="flex-1">
              <Heading size="lg" className="text-gray-900 mb-1">
                Your Name
              </Heading>
              <Text className="text-gray-600">your.email@example.com</Text>
            </View>
          </HStack>
        </View>

        {/* General Section */}
        <ProfileSection title="General">
          <ProfileItem
            icon="cash-outline"
            title="Currency (USD)"
            subtitle="Tap to change currency globally"
            onPress={handleCurrencyChange}
          />
          <ProfileItem
            icon="notifications-outline"
            title="Notifications"
            onPress={handleNotifications}
          />
          <ProfileItem
            icon="color-palette-outline"
            title="App Theme"
            onPress={handleAppTheme}
          />
        </ProfileSection>

        {/* Data Section */}
        <ProfileSection title="Data">
          <ProfileItem
            icon="download-outline"
            title="Import/Export Data"
            onPress={handleImportExport}
          />
          <ProfileItem
            icon="cloud-outline"
            title="Backup & Restore"
            onPress={handleBackupRestore}
          />
        </ProfileSection>

        {/* Support Section */}
        <ProfileSection title="Support">
          <ProfileItem
            icon="help-circle-outline"
            title="Help & FAQ"
            onPress={handleHelpFAQ}
          />
          <ProfileItem
            icon="mail-outline"
            title="Contact Us"
            onPress={handleContactUs}
          />
        </ProfileSection>

        {/* About Section */}
        <ProfileSection title="About">
          <ProfileItem
            icon="shield-outline"
            title="Privacy Policy"
            onPress={handlePrivacyPolicy}
            showChevron={false}
          />
          <ProfileItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={handleTermsOfService}
            showChevron={false}
          />
          <View className="py-4 px-4">
            <HStack space="md" className="items-center">
              <View className="w-6 h-6 items-center justify-center">
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#6B7280"
                />
              </View>
              <Text className="text-gray-900 font-medium">Version 1.0.0</Text>
            </HStack>
          </View>
        </ProfileSection>

        {/* Logout Button */}
        <View className="mt-6 mb-8">
          <Button
            action="negative"
            variant="outline"
            className="w-full"
            onPress={() =>
              Alert.alert("Logout", "Logout functionality will be implemented")
            }
          >
            <Text className="text-red-600 font-semibold">Logout</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
