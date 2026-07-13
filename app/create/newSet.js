import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function NewSet() {
    const [info, setInfo] = useState({ subject: "", description: "" });
    const [cards, setCards] = useState([{ question: "", answers: [{ text: "", correct: false }] }]);
    const cardCount = cards.length;

    const addCard = () => {
        setCards([...cards, { question: "", answers: [{ text: "", correct: false }] }]);
    }
    const addAnswer = (cardIndex) => {
        const newCards = [...cards];
        newCards[cardIndex].answers.push({ text: "", correct: false });
        setCards(newCards);
    }
    const updateQuestion = (userInput, cardIndex) => {
        const newCards = [...cards];
        newCards[cardIndex].question = userInput;
        setCards(newCards);
    }
    const updateAnswer = (userInput, cardIndex, ansIndex) => {
        const newCards = [...cards];
        newCards[cardIndex].answers[ansIndex].text = userInput;
        setCards(newCards);
    }
    const removeAnswer = (cardIndex, ansIndex) => {
        const newCards = [...cards];
        newCards[cardIndex].answers.splice(ansIndex, 1);
        setCards(newCards);
    }
    const removeCard = (cardIndex) => {
        const newCards = [...cards];
        newCards.splice(cardIndex, 1);
        setCards(newCards);
    }
    const isCorrect = (cardIndex, ansIndex) => {
        const newCards = cards.map((card, ci) => {
            if (ci !== cardIndex) {
                return card;
            }
            return {
                ...card,
                answers: card.answers.map((ans, ai) => ({ ...ans, correct: ai === ansIndex ? !ans.correct : false })),
            };
        });
        setCards(newCards);
    }
    const router = useRouter();
    const createSet = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: setData, error: setError } = await supabase.from('sets').insert([
            {
                subject: info.subject,
                description: info.description,
                user_id: user.id,
            },
        ]).select().single();
        if (setError) {
            console.log("Error creating set...", setError.message);
            return;
        }
        const cardRows = cards.map(card => ({
            set_id: setData.id,
            question: card.question,
            answers: card.answers,
            user_id: user.id,
        }))
        const { error: cardError } = await supabase.from('cards').insert(cardRows);
        if (cardError) {
            console.log("Error creating cards... " + cardError.message, cardError);
            return;
        }
        setInfo({ subject: "", description: "" });
        setCards([{ question: "", answers: [{ text: "", correct: false }] }]);
        router.push("/create/library");
    }
    return (
        <SafeAreaProvider>
            <Stack.Screen options={{
                headerLeft: () => (
                    <Pressable onPress={ () => router.push("create/library") } style={{ marginLeft: 10 }}>
                        <Feather name="arrow-left" size={24} color="rgb(2, 20, 48)" />
                    </Pressable>
                ),
            }} />
            <SafeAreaView>
            <ScrollView>
                <View style={styles.setInfoContainer}>
                    <View style={styles.setInfo}>
                        <Text style={styles.setSubject}>Subject</Text>
                        <Text style={styles.setSubject}>Card Count: {cardCount}</Text>
                    </View>
                    <TextInput
                        value={info.subject}
                        style={styles.inputContainer}
                        placeholder="e.g. CS 1332"
                        onChangeText={(userInput) => setInfo({ ...info, subject: userInput })}
                    />
                    <Text style={styles.setDescription}>Description</Text>
                    <TextInput
                        value={info.description}
                        style={styles.inputContainer}
                        placeholder="Description"
                        onChangeText={(userInput) => setInfo({ ...info, description: userInput })}
                    />
                    <TouchableOpacity style={styles.createSetButton} onPress={createSet}>
                        <Feather name="plus" size={18} color="white" />
                        <Text style={styles.createSetButtonText}>Create Set</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {cards.map((card, cardIndex) => (
                        <View key={cardIndex} style={styles.setCardContainer}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardNumber}>Card {cardIndex + 1}</Text>
                                <TouchableOpacity onPress={() => removeCard(cardIndex)}>
                                    <MaterialIcons name="delete" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                value={card.question}
                                style={styles.inputContainer}
                                placeholder={`Question ${cardIndex + 1}`}
                                onChangeText={(userInput) => updateQuestion(userInput, cardIndex)}
                            />
                            <View>
                                {card.answers.map((answer, ansIndex) => (
                                    <View key={ansIndex} style={styles.answerContainer}>
                                        <TouchableOpacity onPress={() => isCorrect(cardIndex, ansIndex)}>
                                            <MaterialIcons name={answer.correct ? "check-box" : "check-box-outline-blank"} size={24} color={answer.correct ? "green" : "rgb(2, 20, 48)"} />
                                        </TouchableOpacity>
                                        <TextInput
                                            value={answer.text}
                                            style={styles.answerInput}
                                            placeholder={`Answer ${ansIndex + 1}`}
                                            onChangeText={(userInput) => updateAnswer(userInput, cardIndex, ansIndex)}
                                        />
                                        <TouchableOpacity onPress={() => removeAnswer(cardIndex, ansIndex)}>
                                            <MaterialIcons name="delete" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity style={styles.addButton} onPress={() => addAnswer(cardIndex)}>
                                <View style={styles.addAnswerContent}>
                                    <Feather name="plus" size={18} color="white" />
                                    <Text style={styles.addButtonText}> Add Answer</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.addButton} onPress={addCard}>
                    <View style={styles.addAnswerContent}>
                        <Feather name="plus" size={18} color="white" />
                        <Text style={styles.addButtonText}> Add Card</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    setInfoContainer: {
        borderColor: "rgb(2, 20, 48)",
        borderRadius: 8,
        borderWidth: 2,
        padding: 12,
        margin: 10,
    },
    setInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    setSubject: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgb(2, 20, 48)",
    },
    setDescription: {
        marginTop: 10,
        marginBottom: 5,
        color: "rgb(2, 20, 48)",
        fontSize: 18,
        fontWeight: "bold",
    },
    inputContainer: {
        borderColor: "rgb(2, 20, 48)",
        borderWidth: 2,
        padding: 10,
    },
    createSetButton: {
        backgroundColor: "#2b70e4",
        marginTop: 10,
        borderRadius: 12,
        width: 240,
        alignSelf: "center",
        padding: 10,
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
    },
    createSetButtonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    setCardContainer: {
        borderColor: "rgb(2, 20, 48)",
        borderWidth: 2,
        padding: 12,
        margin: 10,
        borderRadius: 8,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        alignItems: "center",
    },
    cardNumber: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgb(2, 20, 48)",
    },
    answerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 10,
    },
    answerInput: {
        borderColor: "rgb(2, 20, 48)",
        borderWidth: 2,
        padding: 10,
        width: "85%",
    },
    addButton: {
        backgroundColor: "rgb(2, 20, 48)",
        borderRadius: 12,
        padding: 10,
        marginTop: 10,
        width: 140,
        alignSelf: "center",
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    addAnswerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }
})