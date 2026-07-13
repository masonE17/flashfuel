import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Quiz() {
    const router = useRouter();
    const [cards, setCards] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const { setId } = useLocalSearchParams();
    const totalQuestion = cards.length;
    let correctAnswerCount = 0;
    useFocusEffect(useCallback(() => {
        const fetchCards = async() => {
            let { data: cards, error } = await supabase.from('cards').select('*').eq('set_id', setId);
            if (error) {
                console.log("Error fetching cards...", error.message);
                return;
            }
            setCards(cards);
        }
        fetchCards();
    }, [setId]));
    const selectAnswer = (cardIndex, ansIndex) => {
        const updatedSelectedAnswer = [...selectedAnswer];
        updatedSelectedAnswer[cardIndex] = ansIndex;
        setSelectedAnswer(updatedSelectedAnswer);
    }
    const submitQuiz = () => {
        cards.forEach((card, index) => {
            if (card.answers[selectedAnswer[index]]?.correct) {
                correctAnswerCount++;
            }
        })
        setSelectedAnswer([]);
        console.log(`You answered ${correctAnswerCount} out of ${totalQuestion} questions correctly.`);
    }
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
                <ScrollView>
                    {cards.map((card, cardIndex) => (
                        <View key={cardIndex} style={styles.cardContainer}>
                            <Text style={styles.question}>Question {cardIndex + 1}: {card.question}</Text>
                            <View>
                                {card.answers.map((answer, ansIndex) => (
                                    <View key={ansIndex} style={styles.answerContainer}>
                                        <TouchableOpacity onPress={() => selectAnswer(cardIndex, ansIndex)}>
                                            <MaterialIcons name={selectedAnswer[cardIndex] === ansIndex ? "check-box" : "check-box-outline-blank"} size={24} color={selectedAnswer[cardIndex] === ansIndex ? "green" : "rgb(2, 20, 48)"} />
                                        </TouchableOpacity>
                                        <Text style={styles.answerText}>{answer.text}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                    <Pressable onPress={() => submitQuiz()} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    cardContainer: {
        borderColor: "rgb(2, 20, 48)",
        borderWidth: 2,
        borderRadius: 10,
        padding: 12,
        margin: 10,
        borderRadius: 8,
    },
    question: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgb(2, 20, 48)",
        marginBottom: 5,
    },
    answerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 3,
    },
    answerText: {
        fontSize: 15,
        color: "rgb(2, 20, 48)",
    },
    submitButton: {
        backgroundColor: "#2b70e4",
        width: 240,
        padding: 10,
        borderRadius: 12,
        marginBottom: 70,
        alignSelf: "center",
    },
    submitButtonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    }
})