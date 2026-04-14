import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Library() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <Text>Library</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    
})