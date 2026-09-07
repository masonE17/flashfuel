import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Library() {
    const [sets, setSets] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
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
        const fetchUser = async() => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return;
            }
            let { data: profile, error } = await supabase.from('profile').select('*').eq('user_id', user.id).single();
            if (error) {
                console.log("Error fetching user...", error.message);
                return;
            }
            setUser(profile);
        }
        fetchUser();
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
    const confirmDelete = (setId) => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete this set?", [
            {
                text: "Delete",
                onPress: () => deleteSet(setId),
            },
            {
                text: "Cancel",
            }
        ])
    }
    const deleteSet = async (setId) => {
            const { error } = await supabase.from('sets').delete().eq('id', setId);
            if (error) {
                console.log("Error deleting set...", error.message);
                return;
            }
            sets.forEach((set, index) => {
                if (set.id === setId) {
                    const updatedSets = [...sets];
                    updatedSets.splice(index, 1);
                    setSets(updatedSets);
                }
            });
        }
    const navigateToQuiz = (setId) => {
        router.push(`practice/quiz?setId=${setId}`);
    }
    return (
        <SafeAreaProvider>
            <Stack.Screen options={{
                headerRight: () => (
                    <Pressable style={{ marginRight: 18 }} onPress={userPressed}>
                        <Feather name="plus" size={28} color="#2b70e4" />
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable style={{ marginLeft: 18 }} onPress={userProfilePressed}>
                        <Feather name="user" size={28} color="#2b70e4" />
                    </Pressable>
                )
            }} />
            <ScrollView>
                <SafeAreaView>
                    <View style={styles.container}>
                        <View style={styles.cardHeaderContainer}>
                            <Text style={styles.cardHeaderText}>Ready to learn, <Text style={styles.cardHeaderUser}>{user?.username || "User"}</Text>?</Text>
                            <View style={{ borderColor: "rgb(2, 20, 48)", borderWidth: 2, borderRadius: 5, marginTop: 7, width: "100%" }}></View>
                        </View>
                        {sets.map((set) => (
                            <Pressable onPress={() => navigateToQuiz(set.id)} key={set.id}>
                                <View style={styles.libraryContainer}>
                                    <View style={styles.setContainer}>
                                        <View style={styles.setInfo}>
                                            <View style={styles.setHeader}>
                                                <Text style={styles.setSubject}>{set.subject}</Text>
                                                <Pressable onPress={() => confirmDelete(set.id)}>
                                                    <MaterialIcons name="delete" size={26} color="#2b70e4" />
                                                </Pressable>
                                            </View>
                                            <View style={{ borderBottomColor: "rgb(2, 20, 48)", borderBottomWidth: 2, marginTop: 4 }}></View>
                                            <Text style={styles.setDescription}>{set.description}</Text>
                                            <Text style={styles.setCount}>{set.cards[0].count} cards</Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </SafeAreaView>
            </ScrollView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    cardHeaderContainer: {
        width: "100%",
        maxWidth: 500,
        justtifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    cardHeaderText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    cardHeaderUser: {
        color: "#2b70e4",
        fontSize: 28
    },
    libraryContainer: {
        width: "100%",
        maxWidth: 500,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    setContainer: {
        width: "100%",
        maxWidth: 400,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    setInfo: {
        backgroundColor: "#e1e1e1ff",
        boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
        width: "100%",
        borderRadius: 10,
        padding: 18,
        flex: 1,
    },
    setHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    setSubject: {
        fontSize: 22,
        fontWeight: "bold",
        color: "rgb(2, 20, 48)",
    },
    setDescription: {
        fontSize: 16,
        color: "rgb(2, 20, 48)",
        paddingTop: 6,
        alignSelf: "center",
    },
    setCount: {
        fontSize: 16,
        color: "rgb(2, 20, 48)",
        alignSelf: "center",
        fontWeight: "bold",
    }
})
