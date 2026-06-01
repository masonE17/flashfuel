import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Stack, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Library() {
    const [sets, setSets] = useState([])
    useFocusEffect(useCallback(() => {
        const fetchSets = async() => {
            let { data, error } = await supabase.from('sets').select('*');
            if (error) {
                console.log("Error fetching sets...", error.message);
                return;
            }
            setSets(data);
        }
        fetchSets();
    }, []));
    return (
        <SafeAreaProvider>
            <Stack.Screen options={{
                headerRight: () => (
                    <Link href="/create/newSet" style={{ marginRight: 18 }}>
                        <Feather name="plus" size={24} color="rgb(2, 20, 48)" />
                    </Link>
                ),
            }} />
            <SafeAreaView>
                {sets.map((set) => (
                    <View key={set.id} style={styles.setContainer}>
                        <View style={styles.setInfo}>
                            <Text style={styles.setSubject}>{set.subject}</Text>
                            <View style={{ borderBottomColor: "white", borderBottomWidth: 2, marginTop: 4}}></View>
                            <Text style={styles.setDescription}>{set.description}</Text>
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
        fontSize: 12,
        color: "#a6a6a6",
        paddingTop: 6,
    },
    setCount: {
        fontSize: 12,
        color: "#a6a6a6",
    }
})
