import { useContext, useEffect } from "react";
import {  Button, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../context/UserContext";
import { useFonts,Roboto_500Medium,Roboto_700Bold,Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import {Literata_400Regular,Literata_500Medium,Literata_700Bold} from '@expo-google-fonts/literata';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// import NotificationScreen from "../notificationScreen";
// import { usePushNotification } from "../useNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home(){

    const {user,fetchUserProfile}=useContext(UserContext);
    const router=useRouter();
    const [fontsLoaded]=useFonts({
        Roboto_500Medium,Roboto_700Bold,Roboto_400Regular,Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold,Literata_400Regular,Literata_500Medium,Literata_700Bold
    })
    // const { expoPushToken } = usePushNotification();



//     const sendNotificationToAllUsers = async() => {
//     const storedTokens = await AsyncStorage.getItem("expoPushTokens");
//     if (!storedTokens) {
//       console.log("No stored tokens found");
//       return;
//     }
  
//     const tokens = JSON.parse(storedTokens);
    
//     await fetch("http://172.16.36.174:3000/send-notification", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         tokens,
//         title: "Campus Connect",
//         body: "🚀 New Event Alert! Check it out now!",
//         data: { someData: "Extra data if needed" },
//       }),
//     });
  
//     console.log("✅ Notification sent to all users!");
//   }
  
    useEffect(()=>{
        fetchUserProfile();
    },[])

    if(!user){
        return(
            // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            //     <Button title="View Notifications" onPress={() => sendNotificationToAllUsers()} />
            // <Text>{expoPushToken}</Text>
            // </View>
            <SafeAreaView style={styles.errorContainer}>
                <Ionicons name="bug-outline" size={30} color="red" />
                <Text style={{fontSize:20, marginTop:10}}>NETWORK ERROR</Text>
            </SafeAreaView>
        )
    }

    return(
        <ScrollView style={styles.container}>
            <SafeAreaView style={{flex:1,backgroundColor:"black"}}>
                <View style={styles.textcontainer}>
                    <Text style={styles.greeting}>
                        Good Morning, <Text style={{textTransform:'uppercase'}}>{user.name}</Text> !
                    </Text>
                </View>
                <View>
                    <Text style={styles.semigreet}>
                        Have a Great Day to Connect.
                    </Text>
                </View>
                <View style={styles.line}></View>
                <View>
                    <ImageBackground style={styles.balancebox} source={require('../../assets/images/wallet.png')}>
                        <Text style={styles.text1}>CAMPUS COINS BALANCE</Text>
                        <Text style={styles.text2}>0</Text>
                        <Text style={styles.text3}>COMING SOON !</Text>
                        <Text style={styles.redeemButton}>Redeem</Text>
                    </ImageBackground>   
                </View>
                <View style={styles.line}></View>
                <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:-20,marginHorizontal:-2}}>
                    <TouchableOpacity onPress={()=>router.push('/(tabs)/connectzones')}>
                        <ImageBackground style={[styles.infoBox,{marginLeft:-10}]} source={require('../../assets/images/CARDS.png')}>
                            <Text style={styles.text4}>CONNECT</Text>
                            <Text style={styles.text5}>ZONES</Text>
                            <Image style={{width:60,height:40,position:'absolute',bottom:85,left:80}} source={require('../../assets/images/zoneImage.png')}></Image>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>router.push('/(tabs)/event')}>
                        <ImageBackground style={styles.infoBox} source={require('../../assets/images/CARDS.png')}>
                            <Text style={styles.text6}>EVENTS</Text>
                            <Image style={{width:70,height:60,position:'absolute',bottom:85,left:70}} source={require('../../assets/images/ticketImage.png')}></Image>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
        
    )
}

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:"black",
        },
        errorContainer:{
            alignItems:'center',
            marginTop:350
        },
        textcontainer:{
            marginTop:45,
            marginLeft:20
        },
        greeting:{
            color:"white",
            fontSize:25,
            fontFamily:"Roboto_500Medium",
            fontWeight:"bold",
            marginBottom:10
        },
        semigreet:{
            color:'#408D93',
            fontFamily:"Roboto_500Medium",
            marginLeft:20
        },
        line:{
            height:1,
            backgroundColor:'#808080',
            marginVertical:30
        },
        balancebox:{
            height:180,
            width:390,
        },
        text1:{
            color:'white',
            fontFamily:"Literata_500Medium",
            position:'absolute',
            top:70,
            left:30,
            fontSize:18
        },
        text2:{
            color:'white',
            fontFamily:"Literata_700Bold",
            fontSize:40,
            position:'absolute',
            right:40,
            top:50
        },
        text3:{
            color:'white',
            fontFamily:'Literata_700Bold',
            fontSize:15,
            position:'absolute',
            bottom:20,
            left:40
        },
        redeemButton:{
            fontFamily:'Literata_500Medium',
            backgroundColor:'#B0B0B0',
            width:85,
            height:25,
            paddingHorizontal:15,
            borderRadius:250,
            position:'absolute',
            bottom:17,
            right:30
        },
        infoBox:{
            height:300,
            width:250,
            marginHorizontal:-30,
        },
        text4:{
            color:'white',
            fontFamily:'Montserrat_700Bold',
            fontSize:25,
            position:'absolute',
            top:100,
            left:45
        },
        text5:{
            color:'white',
            fontFamily:'Montserrat_700Bold',
            fontSize:25,
            position:'absolute',
            top:130,
            left:65
        },
        text6:{
            color:'white',
            fontFamily:'Montserrat_700Bold',
            fontSize:30,
            position:'absolute',
            top:110,
            right:75
        }
    }
) 