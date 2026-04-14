import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Index() {
  const logo = require("../assets/images/FlashFuelLogo.png");
  const home = require("../assets/images/FlashFuelHome.png");
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
            <Text style={styles.userHeader}>Welcome back, <Text style={{ color: "#2b70e4", fontSize: 28, fontWeight: "bold"}}>Mason</Text></Text>
            <Text style={styles.subText}>Ready to learn today?</Text>
          </View>
          <View style={styles.homeContainer}>
            <Image source={home} style={styles.homeImage}/>
            <View style={styles.studyContainer}>
              <View style={styles.studyContent}>
                <View>
                  <Text style={styles.studyText}>Start Studying</Text>
                  <Text style={styles.studySubText}>Pick up where you left off</Text>
                </View>
                <FontAwesome name="arrow-right" size={24} color="white" />
              </View>
            </View>
          </View>
          <Text style={styles.streakText}>Current Streak</Text>
          <View style={styles.streakContainer}>
            <View style={styles.streakBar}></View>
          </View>
          <Text style={styles.streakCount}>7/10 Days</Text>
        </View>
        <View style={styles.quickActionsBorder}>
          <View style={styles.quickActionsHeader}>
            <Text style={styles.quickActionText}>Quick Actions</Text>
            <View style={{ borderBottomColor: "rgb(2, 20, 48)", borderBottomWidth: 2, marginTop: 4}}></View>
          </View>
          <View style={styles.quickActionsContainer}>
            <View style={styles.quickAction}>
              <FontAwesome name="bookmark-o" size={24} color="#2b70e4" />
              <Text style={styles.quickActionMainText}>My Sets</Text>
              <Text style={styles.quickActionSubText}>Browse Library</Text>
            </View>
            <View style={styles.quickAction}>
              <FontAwesome name="pencil-square-o" size={24} color="#2b70e4" />
              <Text style={styles.quickActionMainText}>New Set</Text>
              <Text style={styles.quickActionSubText}>Create Cards</Text>
            </View>
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
    borderWidth: 2,
  },
  headerText: {
    color: "rgb(2, 20, 48)",
    fontSize: 35,
  },
  subHeaderContainer: {
    alignItems: "center",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  contentContainer: {
    padding: 4,
    marginLeft: 20,
    marginRight: 20,
    height: 420,
  },
  subText: {
    fontSize: 16,
    color: "#4f4f4f",
  },
  streakText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(2, 20, 48)",
    textAlign: "center",
    marginBottom: 5,
  },
  streakContainer: {
    borderColor: "rgb(2, 20, 48)",
    borderWidth: 2,
    borderRadius: 12,
    height: 14,
  },
  streakBar: {
    backgroundColor: "#2b70e4",
    height: "100%",
    width: "75%",
    borderRadius: 12,
  },
  streakCount: {
    fontSize: 16,
    color: "rgb(2, 20, 48)",
    textAlign: "center",
    marginTop: 5,
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
    borderWidth: 2,
  },
  studyContainer: {
    width: 250,
    borderColor: "rgb(2, 20, 48)",
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
  quickActionsBorder: {
    padding: 10,
    gap: 8,
    marginTop: 10,
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