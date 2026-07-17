import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
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
                            <View style={styles.setHeader}>
                                <Text style={styles.setSubject}>{set.subject}</Text>
                                <Pressable onPress={() => confirmDelete(set.id)}>
                                    <MaterialIcons name="delete" size={24} color="#2b70e4" />
                                </Pressable>
                            </View>
                            <View style={{ borderBottomColor: "rgb(2, 20, 48)", borderBottomWidth: 2, marginTop: 4 }}></View>
                            <Text style={styles.setDescription}>{set.description}</Text>
                            <Text style={styles.setCount}>{set.cards[0].count} cards</Text>
                        </View>
                        <Link href={{ pathname: "practice/quiz", params: { setId : set.id} }}>
                            <FontAwesome name="pencil-square-o" size={50} color="#2b70e4" />
                        </Link>
                    </View>
                ))}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    setContainer: {
        borderColor: "rgb(2, 20, 48)",
        borderWidth: 2,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexDirection: "row",
        gap: 42,
        alignItems: "center",
    },
    setInfo: {
        backgroundColor: "#e1e1e1ff",
        borderColor: "rgb(2, 20, 48)",
        borderWidth: 2,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 10,
        padding: 10,
        width: 250,
    },
    setHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    setSubject: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgb(2, 20, 48)",
    },
    setDescription: {
        fontSize: 14,
        color: "#4f4f4f",
        paddingTop: 6,
        alignSelf: "center",
    },
    setCount: {
        fontSize: 14,
        color: "#4f4f4f",
        alignSelf: "center",
        fontWeight: "bold",
    }
})
