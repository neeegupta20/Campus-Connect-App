import { useGlobalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import axios from "axios";

export default function EnterEmail(){
    
    const searchParams=useGlobalSearchParams();
    const avatar=Array.isArray(searchParams?.avatar) ? searchParams?.avatar[0] : searchParams?.avatar ?? ''; 
    const name=searchParams?.name ?? '';
    const telno=searchParams?.telno ?? '';
    const router=useRouter();
    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('')
    const [emailVerify,SetEmailVerify]=useState(false);
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [isPasswordVisible,setIsPasswordVisible]=useState(false);

    const avatarMap:{[key:string]:any}={
        avatar1:require('../../assets/AVATARS/avatar1.png'),
        avatar2:require('../../assets/AVATARS/avatar2.png'),
        avatar3:require('../../assets/AVATARS/avatar3.png'),
        avatar4:require('../../assets/AVATARS/avatar4.png'),
    };

    const handleEmail=()=>{
        SetEmailVerify(false);
        if(emailRegex.test(email)){
          SetEmailVerify(true);
        }
    }
    const togglePasswordVisibility=()=>{
        setIsPasswordVisible(!isPasswordVisible);
    };
  
    const avatarImage=avatarMap[avatar] ?? null;

    const SendOTP=async(name:string|string[],telno:string|string[],email:string,avatar:string,password:string)=>{
        try{
          const response=await axios.post('https://campus-connect-app-backend.onrender.com/send-otp',{email});
          if(response.status===200){
            router.replace({
              pathname:'/(auth)/OTPVerify',
              params:{name,telno,email,password,avatar}});
              console.log('OTP SENT.')
          }
        }catch(error){
          if(axios.isAxiosError(error)){
            if(error.response?.status===402){
              Alert.alert("OTP NOT DELIVERABLE.");
            }
          }
          console.log(error);
        }
    }

    return(
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32}/>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {avatarImage && <Image source={avatarImage} style={styles.avatarImage}/>}
                    <Text style={styles.headText}>
                        ENTER EMAIL ID & PASSWORD
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder="EMAIL ID" 
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
                    <View style={[styles.inputContainer,{marginTop:15}]}>
                        <TextInput
                            placeholder="SET PASSWORD"
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
                        onPress={()=>{
                            SendOTP(name,telno,email,avatar,password);
                        }}>
                        <Text style={styles.buttonText}>
                            Next
                        </Text>
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
        backgroundColor:'black',
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
        marginTop:40,
        marginBottom:30,
        fontFamily:"OpenSans_700Bold",
        fontSize:22,
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
        fontSize:25,
        fontWeight: "bold",
    },
});
