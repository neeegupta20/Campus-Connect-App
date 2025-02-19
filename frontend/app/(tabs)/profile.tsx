import { useContext } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { UserContext } from "../context/UserContext";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import LottieView from "lottie-react-native";
import loaderWhite from "../../assets/loaderWhite.json"
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import axios, { Axios } from "axios";

export default function AccountsTab() {
    
    const { user,setUser }=useContext(UserContext);
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
            setUser(null);
            router.replace('/(auth)');
        }catch(error){
            console.error("Error logging out:", error);
        }
    };

    const handleDeleteAccount=async()=>{
        Alert.alert("ALL DATA RELATED TO ACCOUNT WILL BE LOST")
        try{
            const token=await SecureStore.getItemAsync("authToken");
            setUser(null);
            const response=await axios.delete('https://campus-connect-app-backend.onrender.com/delete-account',{
                headers:{ Authorization:`Bearer ${token}`}
            })
            if(response.status===200){
                await SecureStore.deleteItemAsync("authToken");
            }
            else{
                Alert.alert("ERROR OCCURED, TRY AGAIN LATER");
            }
        }catch(error){
            if(axios.isAxiosError(error)){
                Alert.alert("NETWORK ERROR")
            }
        }
    }

     if(!user){
            return(
                <SafeAreaView style={styles.errorContainer}>
                    <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
                </SafeAreaView>
            )
        }

    return (
        <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{height:900,flex:1}}>
            <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.profileContainer}>
                    {avatarImage && <Image source={avatarImage} style={styles.avatar}/>}
                    <Text style={styles.userName}>{user?.name ?? "User"}</Text>
                    <TouchableOpacity style={styles.editAvatarButton} onPress={()=>router.push('/(account)/editAvatar')}>
                        <Ionicons name="pencil-outline" color="white" size={24}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.line,{marginTop:65}]}></View>
                <TouchableOpacity style={styles.tabButtons} 
                    onPress={()=>{
                        router.push('/(account)/tickets')
                    }}>
                    <Ionicons name="ticket-outline" color="white" size={30} style={styles.tabIcons}/>
                    <Text style={styles.tabText}>M-Tickets</Text>
                    <Ionicons name="chevron-forward-outline" color="white" size={30} style={styles.iconForward}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButtons} 
                    onPress={()=>{
                        router.push('/(account)/changePassword')
                    }}>
                <Ionicons name="key-outline" color="white" size={30} style={styles.tabIcons}/>
                    <Text style={styles.tabText}>Change Password</Text>
                    <Ionicons name="chevron-forward-outline" color="white" size={30} style={styles.iconForward}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButtons} 
                    onPress={()=>{
                        router.push('/(account)/contactUs')
                    }}>
                    <Ionicons name="mail-open-outline" color="white" size={30} style={styles.tabIcons}/>
                    <Text style={styles.tabText}>Contact Us</Text>
                    <Ionicons name="chevron-forward-outline" color="white" size={30} style={styles.iconForward}/>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.tabButtons} 
                    onPress={()=>{
                        router.push('/(account)/privacyPolicy')
                    }}>
                    <Ionicons name="clipboard-outline" color="white" size={30} style={styles.tabIcons}/>
                    <Text style={styles.tabText}>Privacy & Terms</Text>
                    <Ionicons name="chevron-forward-outline" color="white" size={30} style={styles.iconForward}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButtons} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" color="white" size={30} style={styles.tabIcons}/>
                    <Text style={styles.tabText}>Sign Out</Text>
                    <Ionicons name="chevron-forward-outline" color="white" size={30} style={styles.iconForward}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButtons} onPress={handleDeleteAccount}>
                    <Ionicons name="close-circle-outline" color="white" size={30} style={styles.tabIcons}/>
                    <Text style={styles.tabText}>Delete Account</Text>
                    <Ionicons name="chevron-forward-outline" color="white" size={30} style={styles.iconForward}/>
                </TouchableOpacity>
                <View style={{marginBottom:100}}></View>
            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles=StyleSheet.create({
    container:{
        flexGrow:1,
        alignItems:"center",
        paddingTop:20,
    },
    profileContainer:{
        alignItems:"center",
        marginTop:80,
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
        textTransform:'uppercase',
        fontFamily:"Montserrat_700Bold"
    },
    tabButtons:{
        marginVertical:20,
        flexDirection:'row'
    },
    tabText:{
        marginTop:12.5,
        paddingLeft:15,
        color:"white",
        fontSize:18,
        fontFamily:"Montserrat_500Medium"
    },
    errorContainer:{
        alignItems:'center',
        marginTop:350
    },
    line:{
        height:0.1,
        marginTop:15,
        width:350,
    },
    tabIcons:{
        paddingLeft:10,
        paddingTop:8
    },
    editAvatarButton:{
        position:"absolute",
        top:90,
        backgroundColor:"green",
        right:125,
        padding:5,
        borderRadius:100
    },
    iconForward:{
        position:'absolute',
        top:10,
        right:20
    },
    loaderIcon:{
        width: 40,
        height: 40,
        alignSelf:"center",
        top: 30
    },
});
