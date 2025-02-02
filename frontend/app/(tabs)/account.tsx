import { useContext } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function Account() {
    
    const { setIsLoggedIn }=useContext(AuthContext);
    const { user }=useContext(UserContext);
    const router=useRouter();

    const avatarMap:Record<string,any>={
        avatar1:require('../../assets/AVATARS/avatar1.png'),
        avatar2:require('../../assets/AVATARS/avatar2.png'),
        avatar3:require('../../assets/AVATARS/avatar3.png'),
        avatar4:require('../../assets/AVATARS/avatar4.png'),
    };

    const avatarKey=user?.avatar ?? "";
    const avatarImage=avatarMap[avatarKey] ?? null;

    const handleLogout=async()=>{
        try{
            await SecureStore.deleteItemAsync("authToken");
            setIsLoggedIn(false);
            router.replace('/(auth)');
        }catch(error){
            console.error("Error logging out:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32} />
                </TouchableOpacity>
                <Text style={styles.headingText}>Account</Text>
            </View>
            <View style={styles.profileContainer}>
                {avatarImage && <Image source={avatarImage} style={styles.avatar}/>}
                <Text style={styles.userName}>{user?.name ?? "User"}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black",
        alignItems:"center",
        paddingTop:20,
    },
    heading: {
        flexDirection:"row",
        alignItems: "center",
        width:"100%",
        paddingHorizontal:15,
        marginBottom:20,
    },
    headingText:{
        color:"white",
        fontSize:24,
        fontWeight:"bold",
        marginLeft:10,
    },
    backIcon:{
        padding:10,
    },
    profileContainer:{
        alignItems:"center",
        marginTop:20,
    },
    avatar:{
        width:120,
        height:120,
        borderRadius:60,
    },
    userName:{
        color:"white",
        fontSize:22,
        fontWeight:"bold",
        marginTop:10,
        textTransform:'uppercase'
    },
    logoutButton:{
        marginTop:30,
        backgroundColor:"#FF3B30",
        paddingVertical:10,
        paddingHorizontal:30,
        borderRadius:8,
    },
    logoutText:{
        color:"white",
        fontSize:18,
        fontWeight:"bold",
    },
});
