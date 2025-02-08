import { useContext, useState } from "react";
import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import { UserContext } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { registerForPushNotificationsAsync } from "../(notifications)/useNotification";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function LoginTab(){

    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [isPasswordVisible,setIsPasswordVisible]=useState(false);
    const router=useRouter();
    const {fetchUserProfile}=useContext(UserContext);

    const LoginUser=async()=>{
        try{
            const response=await axios.post('https://campus-connect-app-backend.onrender.com/login',{email,password});
            if(response.data.token) {
                await SecureStore.setItemAsync('authToken', response.data.token);
                Alert.alert("LOGIN SUCCESSFUL.");
                router.replace('/(tabs)');
                const expoPushToken=await registerForPushNotificationsAsync();
                if (expoPushToken) {
                    await axios.post('https://campus-connect-app-backend.onrender.com/save-token',{email,expoPushToken});
                }
                fetchUserProfile();
            }
        }catch(error){
            console.log(error);
            if(axios.isAxiosError(error)){
                if(error.response?.status===422){
                      Alert.alert("INVALID EMAIL OR PASSWORD.");
                }
            }
        }
    }

    

    const togglePasswordVisibility=()=>{
        setIsPasswordVisible(!isPasswordVisible);
    };

    return(
        <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:1000}}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={()=>{
                    router.back()}} 
                    style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32}/>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <Image style={styles.logo} source={require('../../assets/images/logowhite.png')}></Image>
                    <Text style={styles.title}>LOGIN</Text> 
                    <View style={styles.grid}>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                placeholder="EMAIL ID" 
                                value={email} 
                                style={styles.input}
                                onChangeText={(text)=>SetEmail(text)}
                                placeholderTextColor="gray">
                            </TextInput>
                        </View>
                        <View style={[styles.inputContainer]}>
                            <TextInput
                                placeholder="PASSWORD"
                                value={password}
                                secureTextEntry={!isPasswordVisible}
                                style={styles.input}
                                onChangeText={(text)=>SetPassword(text)}
                                placeholderTextColor="gray"
                            />
                            <TouchableOpacity 
                                onPress={togglePasswordVisibility}>
                                <Text style={styles.icon}>
                                    {isPasswordVisible ? <FontAwesome size={28} name="eye"></FontAwesome> : <FontAwesome size={28} name="eye-slash"></FontAwesome>}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={LoginUser}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles=StyleSheet.create(
    {
        container:{    
            alignItems:"center",
            padding:20,
        },
        backIcon:{
            position:"absolute",
            left:20,
            top:70,
            zIndex:10
        },
        logo:{
            marginTop:100,
            width:360,
            height:110,
            paddingHorizontal:30
        },
        title:{
            marginTop:80,
            alignSelf:'center',
            marginHorizontal:60,
            color:"white",
            fontSize:30,
            fontFamily:"Montserrat_700Bold",
            fontWeight:"bold",
        },
        input:{
            flex:1,
            height:50,
            borderWidth:1,
            borderRadius:12,
            paddingHorizontal:12,
            fontSize:20,
            borderColor:"#63D0D8",
            color:"white",
        },
        inputContainer:{
            width:"100%",
            flex:1,
            height:45,
            flexDirection:"row",
            alignItems:"center",
            borderRadius:20,
            position:"relative",
        },
        buttonContainer:{
            alignSelf:'center',
            width:"100%",
            marginHorizontal:2
        },
        button:{
            backgroundColor: "#63D0D8",
            padding: 15,
            borderRadius:16,
            alignItems: "center",
            marginHorizontal:30
        },
        buttonText:{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
        },
        grid:{
            padding:20,
            height:"23%",
        },
        icon:{
            color: "#888",
            position:'absolute',
            right:15,
            top:-14
        },
    }
)