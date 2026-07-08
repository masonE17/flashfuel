import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Library() {
    const [sets, setSets] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const router = useRouter();
    useFocusEffect(useCallback(() => {
        const fetchSets = async() => {
            let { data, error } = await supabase.from('sets').select('*, cards(count)');
            if (error) {
                console.log("Error fetching sets...", error.message);
                return;
            }
            setSets(data);
        }
        const checkUserLoggedIn = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUserLoggedIn(user !== null);
        }
        checkUserLoggedIn();
        fetchSets();
    }, []));
    const userPressed = () => {
        if (userLoggedIn) {
            router.push("create/newSet");
        } else {
            router.push("auth/login");
        }
    }
    const userProfilePressed = () => {
        if (userLoggedIn) {
            router.push("user/account");
        } else {
            router.push("auth/login");
        }
    }
    return (
        <SafeAreaProvider>
            <Stack.Screen options={{
                headerRight: () => (
                    <Pressable style={{ marginRight: 18 }} onPress={userPressed}>
                        <Feather name="plus" size={24} color="rgb(2, 20, 48)" />
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable style={{ marginLeft: 18 }} onPress={userProfilePressed}>
                        <Feather name="user" size={24} color="rgb(2, 20, 48)" />
                    </Pressable>
                )
            }} />
            <SafeAreaView>
                {sets.map((set) => (
                    <View key={set.id} style={styles.setContainer}>
                        <View style={styles.setInfo}>
                            <Text style={styles.setSubject}>{set.subject}</Text>
                            <View style={{ borderBottomColor: "white", borderBottomWidth: 2, marginTop: 4 }}></View>
                            <Text style={styles.setDescription}>{set.description}</Text>
                            <Text style={styles.setCount}>{set.cards[0].count} cards</Text>
                        </View>
                        <MaterialIcons name="quiz" size={50} color="rgb(2, 20, 48)" />
                    </View>
                ))}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    setContainer: {
        borderColor: "rgb(2, 20, 48)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: "row",
        gap: 45,
        alignItems: "center",
    },
    setInfo: {
        backgroundColor: "rgb(2, 20, 48)",
        borderRadius: 10,
        padding: 10,
        width: 250,
    },
    setSubject: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    setDescription: {
        fontSize: 14,
        color: "#a6a6a6",
        paddingTop: 6,
    },
    setCount: {
        fontSize: 14,
        color: "#a6a6a6",
    }
})
