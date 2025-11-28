import { Stack } from "expo-router";
import { MessageProvider } from "@/store/messageContext";
import { SettingsProvider } from "@/store/settingsContext";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <MessageProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </MessageProvider>
    </SettingsProvider>
  );
}
