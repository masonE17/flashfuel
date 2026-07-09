import { supabase } from "@/lib/supabase";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const logo = require("../assets/images/FlashFuelLogo.png");
  const home = require("../assets/images/FlashFuelHome.png");
  const [user, setUser] = useState(null);
  const router = useRouter();
  useFocusEffect(useCallback(() => {
    const fetchUser = async() => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
          console.log("No authenticated user found.");
      }
      let { data: profile, error } = await supabase.from('profile').select('*').eq('user_id', user.id).single();
          if (error) {
            console.log("Error fetching user...", error.message);
            return;
          }
          setUser(profile); 
    }
    fetchUser();
  }, []));
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Image source={logo} style={styles.headerImage}/>
          <Text style={styles.headerText}>FlashFuel</Text>
        </View>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subText}>Fuel your mind, flash your knowledge</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.userContainer}>
            <Text style={styles.userHeader}>Welcome back, <Text style={{ color: "#2b70e4", fontSize: 28, fontWeight: "bold"}}>{user?.username || "Guest"}</Text></Text>
            <Text style={styles.subText}>Ready to learn today?</Text>
          </View>
          <View style={styles.homeContainer}>
            <Image source={home} style={styles.homeImage}/>
            <TouchableOpacity style={styles.studyContainer} onPress={() => router.push("create/library")}>
              <View style={styles.studyContent}>
                <View>
                  <Text style={styles.studyText}>Start Studying</Text>
                  <Text style={styles.studySubText}>Pick up where you left off</Text>
                </View>
                <FontAwesome name="arrow-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>Current Streak</Text>
              <Text style={styles.streakText}><Text style={{ color: "#2b70e4", fontWeight: "bold" }}>7/10</Text> days</Text>
              <View style={{ borderColor: "rgb(2, 20, 48)", borderWidth: 1, height: 12, borderRadius: 5, width: "100%", marginTop: 5, boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", }}>
                <View style={{ backgroundColor: "#2b70e4", height: 10, borderRadius: 4, width: "70%" }}></View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.quickActionsBorder}>
          <View style={styles.quickActionsHeader}>
            <Text style={styles.quickActionText}>Quick Actions</Text>
            <View style={{ borderBottomColor: "rgb(2, 20, 48)", borderBottomWidth: 2, marginTop: 4}}></View>
          </View>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickAction} onPress={() => router.push("create/library")}>
              <FontAwesome name="bookmark-o" size={24} color="#2b70e4" />
              <Text style={styles.quickActionMainText}>My Sets</Text>
              <Text style={styles.quickActionSubText}>Browse Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => router.push("create/newSet")}>
              <FontAwesome name="pencil-square-o" size={24} color="#2b70e4" />
              <Text style={styles.quickActionMainText}>New Set</Text>
              <Text style={styles.quickActionSubText}>Create Cards</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  headerImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 100,
    borderColor: "rgb(2, 20, 48)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderWidth: 2,
  },
  headerText: {
    color: "rgb(2, 20, 48)",
    fontWeight: "bold",
    fontSize: 35,
  },
  subHeaderContainer: {
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  contentContainer: {
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    height: 420,
  },
  subText: {
    fontSize: 16,
    color: "#4f4f4f",
  },
  userContainer: {
    padding: 6,
    marginBottom: 2,
    alignItems: "center",
  },
  userHeader: {
    fontSize: 28,
    color: "rgb(2, 20, 48)",
    marginBottom: 4,
  },
  homeContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
  },
  homeImage: {
    borderRadius: 100,
    width: 175,
    height: 175,
    borderColor: "rgb(2, 20, 48)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderWidth: 2,
  },
  studyContainer: {
    width: 250,
    borderColor: "rgb(2, 20, 48)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderWidth: 1,
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "rgb(2, 20, 48)",
  },
  studyContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  studyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  studySubText: {
    color: "#a6a6a6",
    fontSize: 12,
  },
  streakContainer: {
    width: 320,
    marginTop: 15,
    alignItems: "center",
  },
  streakText: {
    fontSize: 16,
    color: "rgb(2, 20, 48)",
  },
  quickActionsBorder: {
    padding: 10,
    gap: 8,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  quickActionText: {
    fontSize: 16,
    color: "rgb(2, 20, 48)",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 35,
  },
  quickActionsHeader: {
    paddingRight: 12,
    width: 116,
  },
  quickAction: {
    borderColor: "rgb(2, 20, 48)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderWidth: 2,
    borderRadius: 18,
    paddingLeft: 10,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    width: 120,
    alignItems: "flex-start",
  },
  quickActionMainText: {
    fontSize: 16,
    color: "rgb(2, 20, 48)",
    fontWeight: "bold",
  },
  quickActionSubText: {
    fontSize: 12,
    color: "#4f4f4f",
  }
})