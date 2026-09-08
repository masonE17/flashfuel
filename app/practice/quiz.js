import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Quiz() {
    const router = useRouter();
    const scrollViewRef = useRef(null);
    const [sets, setSets] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const { setId } = useLocalSearchParams();
    const totalQuestion = cards.length;
    let correctAnswerCount = 0;
    useFocusEffect(useCallback(() => {
        const fetchSets = async() => {
            let { data: sets, error } = await supabase.from('sets').select('*').eq('id', setId).single();
            if (error) {
                console.log("Error fetching sets...", error.message);
                return;
            }
            setSets(sets);
        }
        const fetchCards = async() => {
            let { data: cards, error } = await supabase.from('cards').select('*').eq('set_id', setId);
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            if (error) {
                console.log("Error fetching cards...", error.message);
                return;
            }
            setCards(cards);
        }
        fetchSets();
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
        Alert.alert("Quiz Result: " + (correctAnswerCount / totalQuestion * 100).toFixed(0) + "%", "You answered " + correctAnswerCount + " out of " + totalQuestion + " questions correctly.", [
            {
                text: "Retake Quiz",
                onPress: () => {
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                }
            },
            {
                text: "Back to Library",
                onPress: () => {
                    router.push("create/library")
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                }
            }
        ]);
        setSelectedAnswer([]);
        correctAnswerCount = 0;
    }
    return (
        <SafeAreaProvider>
            <Stack.Screen options={{
                headerLeft: () => (
                    <Pressable onPress={ () => router.push("create/library") } style={{ marginLeft: 18 }}>
                        <Feather name="arrow-left" size={28} color="#2b70e4" />
                    </Pressable>
                )
            }}
            />
            <SafeAreaView>
                <ScrollView ref={scrollViewRef}>
                    <View style={styles.container}>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardSubject}>{sets.subject}</Text>
                            <Text style={styles.cardDescription}>{sets.description}</Text>
                            <View style={{ borderColor: "rgb(2, 20, 48)", borderWidth: 2, borderRadius: 5, marginTop: 7, width: "100%" }}></View>
                        </View>
                        {cards.map((card, cardIndex) => (
                            <View key={cardIndex} style={styles.cardContainer}>
                                <Text style={styles.question}><Text style={{ color: "#2b70e4" }}>Question {cardIndex + 1}:</Text> {card.question}</Text>
                                <View style={{ borderBottomColor: "rgb(2, 20, 48)", borderBottomWidth: 3, borderRadius: 2, marginBottom: 5 }}></View>
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
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    cardTextContainer: {
        width: "100%",
        maxWidth: 500,
        padding: 10,
        alignItems: "center",
    },
    cardSubject: {
        fontSize: 32,
        fontWeight: "bold",
        color: "rgb(2, 20, 48)",
    },
    cardDescription: {
        fontSize: 16,
        color: "rgb(2, 20, 48)",
    },
    cardContainer: {
        backgroundColor: "#e1e1e1ff",
        boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
        width: "90%",
        maxWidth: 500,
        alignSelf: "center",
        borderRadius: 8,
        margin: 10,
        padding: 10,
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
        boxShadow: "0px 2px 4px #2b70e4",
        width: "100%",
        maxWidth: 240,
        padding: 10,
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 80,
        alignSelf: "center",
    },
    submitButtonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    }
})