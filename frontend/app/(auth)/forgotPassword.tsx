import { useGlobalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, TextInput, Alert, ImageBackground } from "react-native";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";
import loaderWhite from "../../assets/loaderWhite.json"


export default function ForgotPassword(){
    
    const router=useRouter();
    const [email,SetEmail]=useState('');
    const [emailVerify,SetEmailVerify]=useState(false);
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [loading, setLoading] = useState(false)
    const type="forgotPassword";

    const handleEmail=()=>{
        SetEmailVerify(false);
        if(emailRegex.test(email)){
          SetEmailVerify(true);
        }
    }

    const SendOTP=async(email:string)=>{
        setLoading(true)
        try{
          const response=await axios.post('https://campus-connect-app-backend.onrender.com/send-otp',{email});
          if(response.status===200){
            router.replace({
                pathname:'/(auth)/OTPVerify',
                params:{email,type}});
                setLoading(false)
                return;
            }
        }catch(error){
          if(axios.isAxiosError(error)){
            if(error.response?.status===402){
              Alert.alert("OTP NOT DELIVERABLE.");
            }
          }
          console.log(error);
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
                            Forgot Password
                        </Text>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                placeholder="USER EMAIL ID" 
                                value={email} 
                                style={styles.input}
                                onChange={handleEmail}
                                onChangeText={(text)=>SetEmail(text)}
                                placeholderTextColor='gray'>
                            </TextInput>
                            <Text style={styles.icon}>
                                {email.length<1?null:emailVerify?<FontAwesome name="check-circle-o" size={24} color="green"/>:<FontAwesome name="exclamation-circle" size={24} color="red"/>}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} 
                            onPress={()=>{SendOTP(email)}}
                            disabled={loading}>
                            {loading ? (
                            <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/> ) : (<Text style={styles.buttonText}>Next</Text>)}
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
    },
    backIcon:{
        marginTop:20,
        marginLeft:20
    },
    headText:{
        color:"white",
        marginTop:100,
        marginBottom:30,
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
    icon:{
        position:"absolute",
        right:15,
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
        fontSize:25,
        fontWeight: "bold",
    },
    loaderIcon:{
        width: 25,
        height: 25,
        alignSelf:"center"
    }
});
