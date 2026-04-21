import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs screenOptions={{ tabBarActiveTintColor: "#2b70e4", tabBarStyle: {backgroundColor: "rgb(2, 20, 48)"}, tabBarInactiveTintColor: "white" }}>
    <Tabs.Screen name="index" options={{
      headerShown: false,
      title: "Home",
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="home" size={size} color={color} />
      ),
      }}/>
    <Tabs.Screen name="create/library" options={{
      headerShown: true,
      title: "Library",
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="book" size={size} color={color} />
      ),
      }}/>
    <Tabs.Screen name="user/account" options={{
      headerShown: true,
      headerTitle: "",
      headerRight: () => (
        <Feather name="settings" size={23} color="rgb(2, 20, 48)" style={{ marginRight: 18 }} />
      ),
      title: "Account",
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="user" size={size} color={color} />
      ),
      }}/>
  </Tabs>
}
