import { Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Library() {
    const sets = [
        {
            subject: "CS 1332",
            description: "Data Structures and Algorithms",
            count: "10/98 Flashcards",
        },
        {
            subject: "PSYC 1101",
            description: "General Psychology",
            count: "5/50 Flashcards",
        },
        {
            subject: "MATH 1554",
            description: "Linear Algebra",
            count: "0/75 Flashcards",
        }
    ]
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
                <View style={styles.setContainer}>
                    <View style={styles.setInfo}>
                        <Text style={styles.setSubject}>{sets[0].subject}</Text>
                        <View style={{ borderBottomColor: "white", borderBottomWidth: 2, marginTop: 4}}></View>
                        <Text style={styles.setDescription}>{sets[0].description}</Text>
                        <Text style={styles.setCount}>{sets[0].count}</Text>
                    </View>
                    <MaterialIcons name="quiz" size={50} color="rgb(2, 20, 48)" />
                </View>
                <View style={styles.setContainer}>
                    <View style={styles.setInfo}>
                        <Text style={styles.setSubject}>{sets[1].subject}</Text>
                        <View style={{ borderBottomColor: "white", borderBottomWidth: 2, marginTop: 4}}></View>
                        <Text style={styles.setDescription}>{sets[1].description}</Text>
                        <Text style={styles.setCount}>{sets[1].count}</Text>
                    </View>
                    <MaterialIcons name="quiz" size={50} color="rgb(2, 20, 48)" />
                </View>
                <View style={styles.setContainer}>
                    <View style={styles.setInfo}>
                        <Text style={styles.setSubject}>{sets[2].subject}</Text>
                        <View style={{ borderBottomColor: "white", borderBottomWidth: 2, marginTop: 4}}></View>
                        <Text style={styles.setDescription}>{sets[2].description}</Text>
                        <Text style={styles.setCount}>{sets[2].count}</Text>
                    </View>
                    <MaterialIcons name="quiz" size={50} color="rgb(2, 20, 48)" />
                </View>
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
