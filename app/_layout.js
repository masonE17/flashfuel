import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
      title: "Account",
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="user" size={size} color={color} />
      ),
      }}/>
  </Tabs>
}
