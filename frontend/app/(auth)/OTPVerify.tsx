import { SafeAreaView,ScrollView,Image, Text, TextInput, StyleSheet, View, Alert, TouchableOpacity, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router/build/hooks";
import axios from "axios";
import LottieView from "lottie-react-native";
import loaderWhite from "../../assets/loaderWhite.json"
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
export default function otpVerify(){
        
        const router=useRouter();
        const searchParams=useGlobalSearchParams();
        const name=searchParams?.name ?? '';
        const email=searchParams?.email ?? '';
        const telno=searchParams?.telno ?? '';
        const password=searchParams?.password ?? '';
        const avatar=Array.isArray(searchParams?.avatar) ? searchParams?.avatar[0] : searchParams?.avatar ?? ''; 
        const type=searchParams?.type ?? 'register'
        const [otp,setOtp]=useState(['','','','']);
        const [loading, setLoading] = useState(false)

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
                setLoading(true)
                const response1=await axios.post('https://campus-connect-app-backend.onrender.com/verify-otp',{email,OTP:otpString});
                if(response1.status===200){
                    if(type==='register'){
                        try{
                            const dataUser={name,email,password,telno,avatar};
                            const response2=await axios.post('https://campus-connect-app-backend.onrender.com/register',dataUser);
                            if(response2.status===200){
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
                    } else if(type==="forgotPassword"){
                        router.replace({
                            pathname:'/(auth)/enterNewPassword',
                            params:{email}
                        })
                    }
                }
                setLoading(false)
                return;
            }catch(error){
                if(axios.isAxiosError(error)){
                    if(error.response?.status===403){
                      Alert.alert("INVALID OR EXPIRED OTP.");
                    }
                }
                console.log(error);
            }
            setLoading(false)
        }
    const [secondsLeft,setSecondsLeft]=useState(30);

    useEffect(()=>{
        let timer:NodeJS.Timeout;

        if (secondsLeft>0){
            timer=setInterval(()=>{
                setSecondsLeft((prev)=>prev-1);
            },1000);
        }
        return()=>clearInterval(timer);
    }, [secondsLeft]);

    const handleResendCode=async()=>{
        if(secondsLeft>0){
            return;
        }
        try{
            setLoading(true);
            const response=await axios.post('https://campus-connect-app-backend.onrender.com/send-otp',{email});
            if(response.status===200){
                  setLoading(false)
              }
          }catch(error){
            if(axios.isAxiosError(error)){
              if(error.response?.status===402){
                Alert.alert("OTP NOT DELIVERABLE.");
              }
            }
            console.log(error);
          }
        setSecondsLeft(30);
    };

    const formatTime=(seconds:number)=>{
        const minutes=Math.floor(seconds/60)
        .toString()
        .padStart(2,'0');
        const secs=(seconds%60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };
    
    const isButtonDisabled=secondsLeft>0;

    return(
            <SafeAreaView style={[styles.container,{flex:1}]}>
                 <StatusBar style="light" translucent={true} backgroundColor="transparent"/>
            <TouchableOpacity onPress={()=>{
                    router.back()}} 
                    style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32}/>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <Image style={styles.logo} source={require('../../assets/images/logowhite.png')}></Image>
                    <Text style={styles.title}>
                        Enter OTP
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
                    <TouchableOpacity style={styles.button} onPress={VerifyOTP} disabled={loading}> 
                        {loading ? (
                            <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
                        ) : (<Text style={styles.buttonText}>Verify</Text>)}
                    </TouchableOpacity>
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
                        <TouchableOpacity onPress={handleResendCode}>
                            <Text style={{color:isButtonDisabled?"#888":"#63D0D8",fontSize:18}}>Resend Code</Text>
                        </TouchableOpacity>
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
            backgroundColor:"black"
        },
        backIcon:{
            position:"absolute",
            left:20,
            top:70,
            zIndex:10
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
            fontSize:35,
            fontWeight:"bold",
            paddingHorizontal:50
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
        loaderIcon:{
            width: 25,
            height: 25,
            alignSelf:"center"
        },
        timerContainer:{
            marginTop:40,
            alignSelf:"center",
            flexDirection:'row',
            gap:10
        },
        timerText:{
            color:"white",
            fontSize:18
        },
    }
)