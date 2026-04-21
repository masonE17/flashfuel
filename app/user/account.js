import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.profileContainer}>
                    <Text style={styles.profileText}>Manage Information</Text>
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
                                <Text style={styles.userDetailText}>Mason</Text>
                            </View>
                        </View>
                        <View style={styles.userDetail}>
                            <View style={styles.userDetailSpacing}>
                                <MaterialIcons name="email" size={26} color="rgb(2, 20, 48)" />
                                <Text style={styles.userDetailText}>mason@gmail.com</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.logoutContainer}>
                    <Text style={styles.logoutText}>Logout</Text>
                    <MaterialIcons name="logout" size={20} color="white" />
                </View>
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
        fontSize: 18,
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
        borderColor: "black",
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
    logoutContainer: {
        borderColor: "black",
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
    logoutText: {
        color: "white",
        fontSize: 16,
    }
})