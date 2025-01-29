import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from 'axios'

export default function Register() {
    
    const router=useRouter();
    const [name,SetName]=useState('');
    const [telno,SetPhone]=useState('');
    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [nameVerify,SetNameVerify]=useState(false);
    const [emailVerify,SetEmailVerify]=useState(false);
    const [phoneNumberVerify,SetPhoneNumberVerify]=useState(false);
    const [isPasswordVisible,setIsPasswordVisible]=useState(false);
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileNumberRegex = /^\d{9}$/;

    const SendOTP=async(name:string,telno:string,email:string,password:string)=>{
      router.replace('/(tabs)')
      // if(!nameVerify || !phoneNumberVerify || !emailVerify || !password){
      //   Alert.alert("PLEASE FILL ALL FIELDS CORRECTLY.");
      //   return;
      // }
      // try{
      //   const response=await axios.post('http://172.16.40.51:3000/send-otp',{email});
      //   if(response.status===200){
      //     router.replace({
      //       pathname:'/(auth)/OTPVerify',
      //       params:{name,telno,email,password}});
      //       console.log('OTP SENT.')
      //   }
      // }catch(error){
      //   if(axios.isAxiosError(error)){
      //     if(error.response?.status===402){
      //       Alert.alert("OTP NOT DELIVERABLE.");
      //     }
      //   }
      //   console.log(error);
      // }
    }

    const handleName=()=>{
      SetNameVerify(false);
      if(name.length>1){
        SetNameVerify(true);
      }
    }

    const handleEmail=()=>{
      SetEmailVerify(false);
      if(emailRegex.test(email)){
        SetEmailVerify(true);
      }
    }

    const handlePhoneNumber=()=>{
      SetPhoneNumberVerify(false);
      if(mobileNumberRegex.test(telno)){
        SetPhoneNumberVerify(true);
      }
    }

    const togglePasswordVisibility=()=>{
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <SafeAreaView style={[PageStyles.container,{flex:1}]}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <Image style={PageStyles.logo} source={require('../../assets/images/logo.jpg')}></Image>
          <Text style={PageStyles.title}>Create Account</Text>
          <View style={PageStyles.grid}>
            <View style={PageStyles.inputContainer}>
              <TextInput 
                placeholder="NAME" 
                value={name} 
                style={PageStyles.input}
                onChange={handleName}
                onChangeText={(text)=>SetName(text)}>
              </TextInput>
              <Text style={PageStyles.icon}>
                {name.length<1?null:nameVerify?<FontAwesome name="check-circle-o" size={24} color="green" />:<FontAwesome name="exclamation-circle" size={24} color="red" />}
              </Text>
            </View>
            {name.length<1?null:nameVerify?null:(
              <Text style={{color:"red",padding:1,fontSize:12}}>
                PLEASE ENTER A VALID NAME.
              </Text>
            )}
            <View style={PageStyles.inputContainer}>
              <TextInput 
                placeholder="EMAIL ID" 
                value={email} 
                style={PageStyles.input}
                onChangeText={(text)=>SetEmail(text)}
                onChange={handleEmail}>
              </TextInput>
              <Text style={PageStyles.icon}>
                {email.length<1?null:emailVerify?<FontAwesome name="check-circle-o" size={24} color="green" />:<FontAwesome name="exclamation-circle" size={24} color="red" />}
              </Text>
            </View>
            {email.length<1?null:emailVerify?null:(
              <Text style={{color:"red",padding:1,fontSize:12}}>
                PLEASE ENTER A VALID EMAIL ID.
              </Text>
            )}
            <View style={PageStyles.inputContainer}>
              <TextInput 
                placeholder="PHONE NUMBER" 
                value={telno} 
                style={PageStyles.input}
                onChangeText={(text)=>SetPhone(text)}
                onChange={handlePhoneNumber}>
              </TextInput>
              <Text style={PageStyles.icon}>
                {telno.length<1?null:phoneNumberVerify?<FontAwesome name="check-circle-o" size={24} color="green" />:<FontAwesome name="exclamation-circle" size={24} color="red" />}
              </Text>
            </View>
            {telno.length<1?null:phoneNumberVerify?null:(
              <Text style={{color:"red",padding:1,fontSize:12}}>
                PLEASE ENTER A VALID PHONE NO.
              </Text>
            )}
            <View style={[PageStyles.inputContainer,{width:'109%'}]}>
              <TextInput
                placeholder="SET PASSWORD"
                value={password}
                secureTextEntry={!isPasswordVisible}
                style={PageStyles.input}
                onChangeText={(text) => SetPassword(text)}
              />
              <TouchableOpacity 
                onPress={togglePasswordVisibility}>
                <Text style={PageStyles.icon}>
                  {isPasswordVisible ? <FontAwesome  size={24} name="eye"></FontAwesome> : <FontAwesome size={24} name="eye-slash"></FontAwesome>}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[PageStyles.buttonContainer,{marginTop:!(nameVerify && emailVerify && phoneNumberVerify)?40:5}]}>
            <View style={PageStyles.button}>
              <Text style={PageStyles.buttonText} onPress={()=>SendOTP(name,telno,email,password)}>
                Register
              </Text>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const PageStyles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      padding:20,
      backgroundColor:"black",
    },
    title:{
      fontSize:35,
      marginBottom:10,
      fontWeight:"bold",
      color:"white"
    },
    grid:{
      padding:20,
      height:"35%",
    },
    input:{
      flex: 1,
      height: 45,
      borderColor:"#63D0D8",
      borderWidth:1,
      borderRadius:10,
      paddingHorizontal: 12,
      fontSize:16,
      marginBlock:6,
      color:"white"
    },
    inputContainer:{
      width:"100%",
      flex:1,
      height:45,
      flexDirection:"row",
      alignItems:"center",
      borderWidth:1,
      position:"relative",
      marginBlock:6,
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
  icon:{
            color:"#888",
            marginLeft:6
  },
  logo:{
            justifyContent:"center",
            height:"7.5%",
            width:"85%",
            marginVertical:70,
            marginHorizontal:15,
  }
})
