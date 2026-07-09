import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Quiz() {
    const router = useRouter();
    const [cards, setCards] = useState([]);
    const { setId } = useLocalSearchParams();
    useFocusEffect(useCallback(() => {
        const fetchCards = async() => {
            let { data: cards, error } = await supabase.from('cards').select('*').eq('set_id', setId);
            if (error) {
                console.log("Error fetching cards...", error.message);
                return;
            }
            setCards(cards);
            console.log("Cards fetched successfully:", cards);
        }
        fetchCards();
    }, [setId]));
    return (
        <SafeAreaProvider>
            <Stack.Screen options={{
                headerLeft: () => (
                    <Pressable onPress={ () => router.push("create/library") } style={{ marginLeft: 10 }}>
                        <Feather name="arrow-left" size={24} color="rgb(2, 20, 48)" />
                    </Pressable>
                )
            }}
            />
            <SafeAreaView>
                <View>
                    <Text></Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({

})