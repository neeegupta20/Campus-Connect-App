import { SafeAreaView,ScrollView,Image, Text, TextInput, StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router/build/hooks";
import axios from "axios";

export default function otpVerify(){
        
        const router=useRouter();
        const searchParams=useGlobalSearchParams();
        const name=searchParams?.name ?? '';
        const email=searchParams?.email ?? '';
        const telno=searchParams?.telno ?? '';
        const password=searchParams?.password ?? '';
        const avatar=Array.isArray(searchParams?.avatar) ? searchParams?.avatar[0] : searchParams?.avatar ?? ''; 
        const [otp,setOtp]=useState(['','','','']);

        const handleChange=(value:string,index:number)=>{
            const newOtp=[...otp];
            newOtp[index]=value;
            setOtp(newOtp);

            if(value&&index<3){
                const nextInput=index+1;
                const nextInputRef=refs[nextInput];
                if(nextInputRef){
                    nextInputRef.focus();
                }
            }
        };

        const refs:any=[];
        
        const VerifyOTP=async()=>{
            const otpString=otp.join('');
            if(otpString.length!=4){
                Alert.alert('PLEASE ENTER VALID OTP.')
                return;
            }
            try{
                const response1=await axios.post('http://172.16.36.174:3000/verify-otp',{email,OTP:otpString});
                if(response1.status===200){
                    try{
                        const dataUser={name,email,password,telno,avatar};
                        const response2=await axios.post('http://172.16.36.174:3000/register',dataUser);
                        if(response2.status===200){
                            Alert.alert("USER REGISTERED. PLEASE LOGIN");
                            router.replace('/(auth)/login');
                        }
                    }catch(error){
                        if(axios.isAxiosError(error)){
                            if(error.response?.status===422){
                              Alert.alert("USER ALREADY EXISTS. PLEASE LOGIN.");
                              router.replace('/(auth)/login');
                            }
                        }
                    }
                }
            }catch(error){
                if(axios.isAxiosError(error)){
                    if(error.response?.status===403){
                      Alert.alert("INVALID OR EXPIRED OTP.");
                    }
                }
                console.log(error);
            }
        }
  

    return(
        <SafeAreaView style={[styles.container,{flex:1}]}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <Image style={styles.logo} source={require('../../assets/images/logo.jpg')}></Image>
                <Text style={styles.title}>
                    ENTER OTP
                </Text>  
                <Text style={{color:"white",fontSize:10,marginHorizontal:65,marginTop:5}}>
                    SENT TO THE ENTERED EMAIL ID
                </Text>
                <View style={styles.otpContainer}>
                    {otp.map((digit,index)=>(
                        <TextInput
                            key={index}
                            ref={(ref)=>(refs[index]=ref)}
                            style={styles.otpBox}
                            value={digit}
                            onChangeText={(value)=>handleChange(value,index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            textAlign="center"
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={VerifyOTP}>
                    <Text style={styles.buttonText}>
                        Verify
                    </Text>
                </TouchableOpacity>
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
            marginHorizontal:15,
            color:"white",
            fontSize:40,
            fontWeight:"bold",
            paddingHorizontal:30
        },
        otpContainer:{
          marginTop:50,  
          flexDirection:'row',
          justifyContent:'space-between',
        },
        otpBox:{
          width:50,
          height:50,
          borderWidth:2,
          borderRadius:10,
          fontSize:20,
          textAlign:'center',
          borderColor:'#333',
          color:"white"
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
            marginHorizontal:30,
            marginTop:30
        },
        buttonText:{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
        },
        icon:{
            color: "#888",
            marginLeft:6
        },
    }
)