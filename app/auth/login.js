import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const login = require("../../assets/images/FlashFuelLogin.png");

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      Alert.alert(error.message);
    } else {
      router.push("/user/account");
    }
    setLoading(false);
    setEmail("");
    setPassword("");
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    } else {
      const { error: profileError } = await supabase.from('profile').insert({ user_id: data.user.id, username })
      if (profileError) {
        console.log(profileError)
      } else {
        router.push("/user/account")
      }
    }
    setLoading(false);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <SafeAreaProvider>
      <Stack.Screen options={{
        headerLeft: () => (
          <Link href={"/create/library"} style={{ marginLeft: 18 }}>
            <Feather name="arrow-left" size={24} color="rgb(2, 20, 48)" />
          </Link>
        )
      }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <Image source={login} style={styles.image}/>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setIsSignUp(false)}
              style={ isSignUp ? styles.inactiveTab : styles.activeTab }
            >
              <Text style={styles.tabText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsSignUp(true)}
              style={ isSignUp ? styles.activeTab : styles.inactiveTab }
            >
              <Text style={styles.tabText}>Join</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 5, width: "90%", backgroundColor: "rgb(2, 20, 48)", alignSelf: "center", borderRadius: 10 }}></View>
          <View style={styles.loginContainer}>
            {isSignUp && (
              <View style={styles.userContainer}>
                <Text style={styles.userLabel}>Username</Text>
                <TextInput
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  placeholder="Username"
                  autoCapitalize="none"
                  style={styles.userInput}
                />
              </View>
            )}
            <View style={styles.userContainer}>
              <Text style={styles.userLabel}>Email</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize="none"
                style={styles.userInput}
              />
            </View>
            <View style={styles.userContainer}>
              <Text style={styles.userLabel}>Password</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize="none"
                style={styles.userInput}
              />
            </View>
            {!isSignUp && (
              <View>
                <TouchableOpacity
                  onPress={() => signInWithEmail()}
                  disabled={loading}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            )}
            {isSignUp && (
              <View>
                <TouchableOpacity
                  onPress={() => signUpWithEmail()}
                  disabled={loading}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 20,
  },
  loginContainer: {
    margin: 20,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  userContainer: {
    borderColor: "rgb(2, 20, 48)",
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  userInput: {
    borderColor: "rgb(2, 20, 48)",
    borderWidth: 1,
    borderRadius: 5,
    boxShadow: "0px 1px 3px rgb(2, 20, 48)",
    padding: 8,
    width: "60%",
  },
  userLabel: {
    textAlign: "center",
    color: "rgb(2, 20, 48)",
    fontSize: 18,
    width: 100,
  },
  loginButton: {
    backgroundColor: "#2b70e4",
    padding: 10,
    borderRadius: 5,
    width: 140,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    width: 220,
    alignSelf: "center",
    justifyContent: "center",
    gap: 25,
    padding: 5,
    marginBottom: 5,
  },
  activeTab: {
    backgroundColor: "rgb(2, 20, 48)",
    padding: 5,
    borderRadius: 5,
    width: 90,
  },
  inactiveTab: {
    backgroundColor: "#d0d0d0ff",
    padding: 5,
    borderRadius: 5,
    width: 90,
  },
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  }
})
