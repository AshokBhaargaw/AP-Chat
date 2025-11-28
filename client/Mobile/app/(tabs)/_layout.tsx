import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSettings } from "@/store/settingsContext";

export default function TabsLayout() {
  const { themeColor } = useSettings()
  console.log(themeColor)
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: themeColor.background
        },
        headerStyle: {
          backgroundColor: themeColor.background
        },
        headerTintColor: themeColor.text

      }}
    >
      <Tabs.Screen
        name="Chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Photos"
        options={{
          title: "Photos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "images" : "images-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
