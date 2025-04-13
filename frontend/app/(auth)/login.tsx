import { useContext, useState } from "react";
import { Alert, Image, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import { UserContext } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import registerForPushNotificationsAsync from "../(notifications)/useNotification";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import loaderWhite from "../../assets/loaderWhite.json" 
import LottieView from "lottie-react-native";

export default function LoginTab(){

    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [isPasswordVisible,setIsPasswordVisible]=useState(false);
    const router=useRouter();
    const {fetchUserProfile}=useContext(UserContext);
    const [loading, setLoading] = useState(false)

    const LoginUser=async()=>{
        try{
            setLoading(true)
            const response=await axios.post('https://campus-connect-app-backend.onrender.com/login',{email,password});
            if(response.data.token) {
                await SecureStore.setItemAsync('authToken', response.data.token);
                router.replace('/(tabs)');
                const expoPushToken=await registerForPushNotificationsAsync();
                if (expoPushToken) {
                    await axios.post('https://campus-connect-app-backend.onrender.com/save-token',{email,expoPushToken});
                }
                fetchUserProfile();
                setLoading(false)
                return;
            }
        }catch(error){
            console.log(error);
            if(axios.isAxiosError(error)){
                if(error.response?.status===422){
                      Alert.alert("INVALID EMAIL OR PASSWORD.");
                }
            }
        }
        setLoading(false);
    }

    

    const togglePasswordVisibility=()=>{
        setIsPasswordVisible(!isPasswordVisible);
    };

    return(
        // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:1000}}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={()=>{
                    router.back()}} 
                    style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32}/>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <Image style={styles.logo} source={require('../../assets/images/logowhite.png')}></Image>
                    <Text style={styles.title}>Login</Text> 
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
                        <View style={styles.inputContainer}>
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
                        <TouchableOpacity onPress={()=>{router.push('/(auth)/forgotPassword')}} style={styles.forgotButton}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>                      
                    </View>
                    <TouchableOpacity style={styles.button} onPress={LoginUser} disabled={loading}>
                        {loading ? (
                            <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
                        ) : (<Text style={styles.buttonText}>Login</Text>)}
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        // </ImageBackground>
    )
}

const styles=StyleSheet.create(
    {
        container:{    
            alignItems:"center",
            padding:20,
            backgroundColor:"black"
        },
        backIcon: {
            position:"absolute",
            left:20,
            top:Platform.OS==="android"?30:70,
            zIndex:10,
        },
        logo:{
            marginTop:70,
            width:360,
            height:110,
            paddingHorizontal:30
        },
        title:{
            marginTop:50,
            alignSelf:'center',
            marginHorizontal:60,
            color:"white",
            fontSize:30,
            fontFamily:"Poppins_700Bold",
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
            marginVertical:10
        },
        buttonContainer:{
            alignSelf:'center',
            width:"100%",
            
        },
        button:{
            backgroundColor: "#63D0D8",
            padding: 15,
            borderRadius:16,
            alignItems: "center",
            marginHorizontal:30,
            marginVertical:10
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
        loaderIcon:{
            width: 25,
            height: 25,
            alignSelf:"center"
        },
        forgotText:{
            color:"white",
            fontFamily:"Poppins_500Medium",
            fontSize:16
        },
        forgotButton:{
            marginLeft:170
        }
    }
)