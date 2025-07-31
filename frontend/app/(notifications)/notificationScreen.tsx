import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { ImageBackground, ScrollView, StyleSheet, Platform } from "react-native";
import { View, Text, FlatList } from "react-native";
import loaderWhite from "../../assets/loaderWhite.json"
import { StatusBar } from "expo-status-bar";


export default function NotificationsScreen(){
  
  const [notifications, setNotifications]=useState<{ _id: string; title: string; body: string; timestamp: string }[]>([]);
  const router=useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotifications=async()=>{
      try{
        const response=await fetch("https://campus-connect-app-backend.onrender.com/notifications");
        const data=await response.json();
        setNotifications(data);
      } 
      catch(error){
        console.error("ERROR FETCHING NOTIFICATIONS", error);
      }
      setLoading(false)
    };
    fetchNotifications();
  },[]);

  if(notifications===null){
    setLoading(true);
  }

  return(
    // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" translucent={true} backgroundColor="transparent"/>
        <View style={styles.heading}>
          <TouchableOpacity onPress={()=>router.replace('/(tabs)')} style={styles.backIcon}>
            <Ionicons name="arrow-back-outline" color="white" size={32}/>
          </TouchableOpacity>
        </View>

        {loading ? (
          <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
        ) : (
          <View style={{marginBottom:100}}>
            <FlatList
              data={notifications}
              keyExtractor={(item)=>item._id}
              renderItem={({item})=>(
                <TouchableOpacity style={styles.notificationBox} onPress={()=>{router.navigate('/(tabs)/connectzones')}}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationDesc}>{item.body}</Text>
                  <Text style={{fontSize:12,color:"gray",paddingBottom:5}}>
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
          
      </SafeAreaView>
    // </ImageBackground>
  );
};

const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"black"
    },
    heading:{
      marginTop: Platform.OS==="ios"?0:40,
      zIndex:10,
      height:Platform.OS==='ios'?55:70,
    },
    backIcon:{
      top: Platform.OS==="ios"?0:10,
      paddingVertical:10,
      paddingLeft:15,
      width:50,
      zIndex:10,
    },
    notificationBox:{
      backgroundColor: "#1e1e1e",
      width:350,
      height:"auto",
      marginTop:30,
      marginLeft:20,
      marginRight:20,
      paddingVertical:10,
      paddingHorizontal:20,
      borderRadius:20
    },
    notificationTitle:{
      color:"white",
      fontSize:18,
      paddingVertical:5,
      fontFamily:"Montserrat_500Medium"
    },
    notificationDesc:{
      color:"white",
      fontSize:13,
      paddingBottom:10,
      fontFamily:"Montserrat_500Medium",
      fontWeight:200
    },
    loaderIcon:{
      width: 40,
      height: 40,
      alignSelf:"center",
      top: 30
    }
})

