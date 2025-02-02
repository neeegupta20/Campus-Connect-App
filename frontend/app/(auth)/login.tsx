import { useContext, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

export default function LoginTab(){

    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [isPasswordVisible,setIsPasswordVisible]=useState(false);
    const router=useRouter();
    const {setIsLoggedIn}=useContext(AuthContext);
    const {fetchUserProfile}=useContext(UserContext);

    const LoginUser=async()=>{
        try{
            const response=await axios.post('http://192.168.1.130:3000/login',{email,password});
            if(response.data.token){
                await SecureStore.setItemAsync('authToken',response.data.token);
                Alert.alert("LOGIN SUCCESSFUL.");
                fetchUserProfile();
                setIsLoggedIn(true);
                router.replace('/(tabs)');
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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <Image style={styles.logo} source={require('../../assets/images/logo.jpg')}></Image>
                <Text style={styles.title}>LOGIN</Text> 
                <View style={styles.grid}>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder="EMAIL ID" 
                            value={email} 
                            style={styles.input}
                            onChangeText={(text)=>SetEmail(text)}>
                        </TextInput>
                    </View>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            placeholder="PASSWORD"
                            value={password}
                            secureTextEntry={!isPasswordVisible}
                            style={styles.input}
                            onChangeText={(text) => SetPassword(text)}
                        />
                        <TouchableOpacity 
                            onPress={togglePasswordVisibility}>
                            <Text style={styles.icon}>
                                {isPasswordVisible ? <FontAwesome size={28} name="eye"></FontAwesome> : <FontAwesome size={28} name="eye-slash"></FontAwesome>}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText} onPress={LoginUser}>
                            LOGIN
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            padding:20,
            backgroundColor:"black",
        },
        logo:{
            marginTop:100,
            height:'8%',
            width:300,
            paddingHorizontal:30
        },
        title:{
            marginTop:80,
            justifyContent:"center",
            marginHorizontal:60,
            color:"white",
            fontSize:40,
            fontWeight:"bold",
            paddingHorizontal:30
        },
        input:{
            flex:1,
            height:45,
            borderWidth:1,
            borderRadius:12,
            paddingHorizontal:12,
            fontSize:16,
            borderColor:"#63D0D8",
            color:"white",
        },
        inputContainer:{
            width:"100%",
            flex:1,
            height:45,
            flexDirection:"row",
            alignItems:"center",
            borderWidth:1,
            borderRadius:20,
            position:"relative",
        },
        buttonContainer:{
            width: "100%",
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