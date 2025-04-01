import { useContext, useEffect, useState } from "react";
import {  Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../context/UserContext";
import { useFonts,Roboto_500Medium,Roboto_700Bold,Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import {Literata_400Regular,Literata_500Medium,Literata_700Bold} from '@expo-google-fonts/literata';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function Home(){

    const {user,fetchUserProfile}=useContext(UserContext);
    const router=useRouter();
    const [fontsLoaded]=useFonts({
        Roboto_500Medium,Roboto_700Bold,Roboto_400Regular,Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold,Literata_400Regular,Literata_500Medium,Literata_700Bold
    })

  
    useEffect(()=>{
        fetchUserProfile();
    },[])

    if(!fontsLoaded){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:"black"}}>
                <LottieView
                    source={require("../../assets/loaderWhite.json")}
                    autoPlay
                    loop
                    style={styles.loaderIcon}
                />
            </SafeAreaView>
        )
    }

    return(
        // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:900}}>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                    <View style={styles.textcontainer}>
                        <View style={{flexDirection:"column"}}>
                            <Text style={styles.greeting}>
                                Hey there, <Text style={{textTransform:'uppercase',fontSize:18}}>{user ? user.name:"GUEST"}</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.notificationIcon} onPress={()=>router.replace('/(notifications)/notificationScreen')}>
                            <Ionicons name="notifications-outline" color="white" size={27}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.semigreet}>
                            Have a Great Day to Connect.
                        </Text>
                    </View>
                    <View>
                        <Image style={styles.balancebox} source={require('../../assets/images/CCCARD.gif')}></Image>   
                    </View>
                    <View style={{flexDirection:'column',marginHorizontal:-2}}>
                        <TouchableOpacity onPress={()=>router.push('/(tabs)/event')}>
                            <ImageBackground style={styles.infoBox} source={require('../../assets/images/EVENTS.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>router.push('/(tabs)/connectzones')}>
                            <ImageBackground style={styles.infoBox2} source={require('../../assets/images/connectzones.png')}/>
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
            backgroundColor:"black"
        },
        errorContainer:{
            flex:100,
            alignItems:'center',
            backgroundColor:"black"
        },
        textcontainer:{
            marginTop:45,
            marginLeft:20,
            flexDirection:"row"
        },
        greeting:{
            color:"white",
            fontSize:22,
            fontFamily:"Montserrat_500Medium",
            fontWeight:"900",
            marginBottom:10,
            width:250
        },
        textName:{
            textTransform:'uppercase',color:"white",
            fontSize:18,
            fontFamily:"Montserrat_500Medium",
            fontWeight:"bold",
            marginBottom:10
        },
        semigreet:{
            color:'#63D0D8',
            fontFamily:"Montserrat_500Medium",
            marginLeft:20
        },
        line:{
            height:1,
            backgroundColor:'#808080',
            marginVertical:30
        },
        balancebox:{
            height:250,
            width:400,
            marginTop:40,
            marginBottom:10,
            alignSelf:"center",
            borderRadius:10
        },
        text1:{
            color:'white',
            fontFamily:"Montserrat_500Medium",
            position:'absolute',
            top:70,
            left:30,
            fontSize:18
        },
        text2:{
            color:'white',
            fontFamily:"Montserrat_500Medium",
            fontSize:40,
            position:'absolute',
            right:40,
            top:50
        },
        text3:{
            color:'white',
            fontFamily:'Montserrat_500Medium',
            fontSize:15,
            position:'absolute',
            bottom:20,
            left:40
        },
        loaderIcon:{
            width: 40,
            height: 40,
            alignSelf:"center",
            top: 30
        },
        redeemButton:{
            fontFamily:'Montserrat_500Medium',
            backgroundColor:'#B0B0B0',
            width:90,
            height:26,
            paddingHorizontal:15,
            borderRadius:250,
            position:'absolute',
            bottom:17,
            right:30,
            alignItems:'center'
        },
        infoBox:{
            marginTop:20,
            height:115,
            width:336,
            alignSelf:"center",
            marginBottom:40,
        },
        infoBox2:{
            height:115,
            width:336,
            alignSelf:"center",
            marginBottom:100,
            borderRadius:20
        },
        text4:{
            fontFamily:'Montserrat_700Bold',
            fontSize:30,
            position:"absolute",
            top:15,
            left:30
        },
        text5:{
            fontFamily:'Montserrat_700Bold',
            fontSize:24,
            position:"absolute",
            top:15,
            left:20
        },
        text6:{
            color:"white",
            fontFamily:"Montserrat_700Bold",
            fontSize:18,
            marginLeft:15,
            marginBottom:10
        },
        notificationIcon:{
            position:"absolute",
            top:5,
            right:40,
            borderColor:"#63D0D8",
            borderWidth:1,
            padding:10,
            borderRadius:25,
        },
        text7:{
            fontFamily:"Montserrat_500Medium",
            fontSize:10,
            position:"absolute",
            bottom:40,
            left:25
        },
        text8:{
            fontFamily:"Montserrat_500Medium",
            fontSize:10,
            position:"absolute",
            bottom:55,
            left:20
        },
        icon1:{
            backgroundColor:"black",
            position:"absolute",
            bottom:20,
            right:20,
            padding:10,
            borderRadius:20
        },
        icon2:{
            backgroundColor:"black",
            position:"absolute",
            top:65,
            right:20,
            padding:10,
            borderRadius:20
        },
        
    }
) 