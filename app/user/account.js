import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    useFocusEffect(useCallback(() => {
        const fetchUser = async() => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setUser(null);
                return;
            }
            let { data: profile, error } = await supabase.from('profile').select('*').eq('user_id', user.id).single();
            if (error) {
                console.log("Error fetching user...", error.message);
                return;
            }
            const fullProfile = { ...profile, email: user.email };
            setUser(fullProfile);
        }
        fetchUser();
    }, []));
    const confirmSignOut = () => {
        Alert.alert("Confirm Sign Out", "Are you sure you want to sign out?", [
            {
                text: "Sign Out",
                onPress: signOut
            },
            {
                text: "Cancel",
            }
        ])
    }
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error signing out...", error.message);
            return;
        }
        setUser(null);
    };
    const translateDate = (dateToString) => {
        if (!dateToString) {
            return "Joined: Unknown";
        }
        const date = new Date(dateToString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return `Joined: ${date.toLocaleDateString(undefined, options)}`;
    }
   return (
       <SafeAreaProvider>
           <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileText}>Manage Account</Text>
                        <View style={{ borderColor: "rgb(2, 20, 48)", borderWidth: 2, borderRadius: 5, marginTop: 7, width: "100%" }}></View>
                    </View>
                    <View style={styles.userInfoContainer}>
                            <View style={styles.userProfilePhoto}>
                                <FontAwesome5 name="hat-wizard" size={40} color="rgb(2, 20, 48)" />
                            </View>
                            <View style={styles.userDetailsContainer}>
                                <View style={styles.userDetail}>
                                    <View style={styles.userDetailSpacing}>
                                        <MaterialIcons name="badge" size={26} color="rgb(2, 20, 48)" />
                                        <Text style={styles.userDetailText}>{user?.username || "Username"}</Text>
                                    </View>
                                </View>
                                <View style={styles.userDetail}>
                                    <View style={styles.userDetailSpacing}>
                                        <MaterialIcons name="email" size={26} color="rgb(2, 20, 48)" />
                                        <Text style={styles.userDetailText}>{user?.email || "Email"}</Text>
                                    </View>
                                </View>
                                <View style={styles.userDetail}>
                                    <View style={styles.userDetailSpacing}>
                                        <Entypo name="calendar" size={26} color="rgb(2, 20, 48)" />
                                        <Text style={styles.userDetailText}>{translateDate(user?.created_at)}</Text>
                                    </View>
                                </View>
                            </View>
                    </View>
                    {!user && (
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => {router.push("auth/login")}}>
                            <Text style={styles.buttonText}>Login/Join</Text>
                            <Feather name="user" size={20} color="white" />
                        </TouchableOpacity>
                    )}
                    {user && (
                        <TouchableOpacity style={styles.buttonContainer} onPress={confirmSignOut}>
                            <Text style={styles.buttonText}>Logout</Text>
                            <MaterialIcons name="logout" size={20} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
           </SafeAreaView>
       </SafeAreaProvider>
   );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    profileContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: 500,
        alignSelf: "center",
        flexDirection: "column",
    },
    profileText: {
        color: "rgb(2, 20, 48)",
        fontSize: 25,
        fontWeight: "bold",
    },
    userInfoContainer: {
        backgroundColor: "#e1e1e1ff",
        boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
        width: "90%",
        maxWidth: 500,
        alignSelf: "center",
        borderRadius: 8,
        margin: 10,
        padding: 10,
    },
    userProfilePhoto: {
        borderColor: "rgb(2, 20, 48)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderWidth: 2,
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 10,
    },
    userDetailsContainer: {
        padding: 5,
        gap: 10,
    },
    userDetail: {
        borderColor: "rgb(2, 20, 48)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderWidth: 2,
        borderRadius: 8,
        padding: 7,
    },
    userDetailSpacing: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    userDetailText: {
        fontSize: 16,
        color: "rgb(2, 20, 48)",
    }, 
    buttonContainer: {
        borderColor: "rgb(2, 20, 48)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderWidth: 2,
        margin: 10,
        padding: 10,
        width: 250,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(2, 20, 48)",
        borderRadius: 12,
        flexDirection: "row",
        gap: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
})