import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <Text>Account</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    
})