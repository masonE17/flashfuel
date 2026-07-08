import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function Account() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useFocusEffect(useCallback(() => {
        const fetchUser = async() => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            let { data: profile, error } = await supabase.from('profile').select('*').eq('user_id', user.id).single();
            if (error) {
                console.log("Error fetching user...", error.message);
                return;
            }
            const fullProfile = { ...profile, email: user.email };
            setUser(fullProfile);
            setLoading(false);
        }
        fetchUser();
    }, []));
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error signing out...", error.message);
            return;
        }
        setUser(null);
        setLoading(true);
    };
   return (
       <SafeAreaProvider>
           <SafeAreaView>
               <View style={styles.profileContainer}>
                   <Text style={styles.profileText}>Manage Account</Text>
                   <View style={{ borderBottomColor: "rgb(2, 20, 48)", borderBottomWidth: 2, marginTop: 4, width: "100%"}}></View>
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
                   </View>
               </View>
               {loading && (
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {router.push("auth/login")}}>
                        <Text style={styles.buttonText}>Login/Join</Text>
                        <Feather name="user" size={20} color="white" />
                    </TouchableOpacity>
               )}
               <TouchableOpacity style={styles.buttonContainer} onPress={signOut}>
                    <Text style={styles.buttonText}>Logout</Text>
                    <MaterialIcons name="logout" size={20} color="white" />
               </TouchableOpacity>
           </SafeAreaView>
       </SafeAreaProvider>
   );
}
const styles = StyleSheet.create({
   profileContainer: {
       marginTop: 10,
       padding: 10,
       justifyContent: "center",
       alignItems: "center",
       width: 250,
       alignSelf: "center",
       flexDirection: "column",
   },
   profileText: {
       color: "rgb(2, 20, 48)",
       fontSize: 20,
       fontWeight: "bold",
   },
   userInfoContainer: {
       borderColor: "rgb(2, 20, 48)",
       borderWidth: 2,
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
   }
})