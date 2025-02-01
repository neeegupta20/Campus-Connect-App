import { useContext } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from "react-native";

export default function Account(){

    const {setIsLoggedIn}=useContext(AuthContext);
    const router=useRouter();

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.heading}>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                        <Ionicons name="arrow-back-outline" color="white" size={32}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
    },
    heading:{
        zIndex:10,
        height:50,
        borderWidth:2,
    },
    backIcon:{
        paddingVertical:8,
        paddingLeft:15,
        width:50
    },
})
// await SecureStore.deleteItemAsync("authToken");
// setIsLoggedIn(false)
// router.navigate('/(auth)')