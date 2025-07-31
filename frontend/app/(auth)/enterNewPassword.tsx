import { useGlobalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, TextInput, Alert, ImageBackground } from "react-native";
import { Image, SafeAreaView, StyleSheet, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";
import loaderWhite from "../../assets/loaderWhite.json"


export default function EnterNewPassword(){
    
    const searchParams=useGlobalSearchParams();
    const email=searchParams?.email ?? '';
    const router=useRouter();
    const [password,SetPassword]=useState('')
    const [isPasswordVisible,setIsPasswordVisible]=useState(false);
    const [loading, setLoading] = useState(false)


    const togglePasswordVisibility=()=>{
        setIsPasswordVisible(!isPasswordVisible);
    };
  
    const changePassword=async()=>{
        setLoading(true)
       try {
            await axios.put('https://campus-connect-app-backend.onrender.com/change-password',{email:email,newpassword:password})
            Alert.alert("PASSWORD CHANGED. PLEASE LOGIN")
            router.replace('/(auth)/login')
            setLoading(false)
       }catch(error){
            Alert.alert("PLEASE TRY AGAIN LATER.")
       }
       setLoading(false)
    }

    return(
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                        <Ionicons name="arrow-back-outline" color="white" size={32}/>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        <Text style={styles.headText}>
                            Reset Password
                        </Text>
                        <View style={[styles.inputContainer,{marginTop:15}]}>
                            <TextInput
                                placeholder="SET NEW PASSWORD"
                                value={password}
                                secureTextEntry={!isPasswordVisible}
                                style={styles.input}
                                onChangeText={(text)=>SetPassword(text)}
                                placeholderTextColor='gray'
                            />
                            <TouchableOpacity 
                                onPress={togglePasswordVisibility}>
                                <Text style={styles.icon2}>
                                    {isPasswordVisible ? <FontAwesome size={28} name="eye" color="gray"></FontAwesome> : <FontAwesome size={28} name="eye-slash" color="gray"></FontAwesome>}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} 
                            onPress={changePassword}
                            disabled={loading}>
                            {loading ? (
                            <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/> ) : (<Text style={styles.buttonText}>Reset Password</Text>)}
                        </TouchableOpacity>
                        
                    </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
    },
    imageContainer:{
        marginTop:20,
        alignItems:'center'
    },
    avatarImage:{
        width:150,
        height:150,
        borderRadius:150,
        marginTop:Platform.OS==='android'?90:20
    },
    backIcon:{
        top: Platform.OS==="ios"?10:70,
        marginLeft:20
    },
    headText:{
        color:"white",
        marginTop:120,
        marginBottom:10,
        fontFamily:"Poppins_700Bold",
        fontSize:30,
    },
    input:{
        flex:1,
        height:60,
        borderColor:"#63D0D8",
        borderWidth:1,
        padding:15,
        borderRadius:20,
        color:"white",
        fontSize:20
    },
    icon2:{
        position:"absolute",
        right:20,
        bottom:-12
    },
    inputContainer:{
        width:"80%",
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        borderWidth:1,
    },
    buttonContainer:{
        marginTop:30,
        width:"70%",
    },
    button:{
        backgroundColor: "#63D0D8",
        padding:15,
        borderRadius:16,
        alignItems:"center",
        marginHorizontal:10
    },
    buttonText:{
        color:"#fff",
        fontSize:20,
        fontWeight: "bold",
    },
    loaderIcon:{
        width: 25,
        height: 25,
        alignSelf:"center"
    }
});
