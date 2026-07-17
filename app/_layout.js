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
      tabBarStyle: {
        backgroundColor: "rgb(2, 20, 48)",
      }
      }}/>
    <Tabs.Screen name="create/newSet" options={{ 
      href: null ,
      title: "New Set",
    }} />
    <Tabs.Screen name="user/account" options={{
      headerShown: false,
      title: "Account",
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="user" size={size} color={color} />
      ),
      }}/>
      <Tabs.Screen name="auth/login" options={{
        href: null,
        title: "Login",
        tabBarStyle: { display: "none" },
      }} />
      <Tabs.Screen name="practice/quiz" options={{
        href: null,
        title: "Quiz",
        tabBarStyle: { display: "none" },
      }} />
  </Tabs>
}
