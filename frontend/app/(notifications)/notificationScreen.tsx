import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { ImageBackground, ScrollView, StyleSheet, Platform } from "react-native";
import { View, Text, FlatList } from "react-native";

export default function NotificationsScreen(){
  
  const [notifications, setNotifications]=useState<{ _id: string; title: string; body: string; timestamp: string }[]>([]);
  const router=useRouter();

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
    };
    fetchNotifications();
  },[]);

  if(notifications===null){
    return(
      <Text>LOADING...</Text>
    )
  }

  return(
    <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1}}>
      <SafeAreaView>
        <View style={styles.heading}>
          <TouchableOpacity onPress={()=>router.replace('/(tabs)/')} style={styles.backIcon}>
            <Ionicons name="arrow-back-outline" color="white" size={32}/>
          </TouchableOpacity>
        </View>
          <View>
            <FlatList
              data={notifications}
              keyExtractor={(item)=>item._id}
              renderItem={({item})=>(
                <View style={styles.notificationBox}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationDesc}>{item.body}</Text>
                  <Text style={{fontSize:12,color:"gray",paddingBottom:5}}>
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>
              )}
            />
          </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles=StyleSheet.create({
    heading:{
      marginTop:Platform.OS==='ios'?0:40,
      zIndex:10,
      height:50,
    },
    backIcon:{
      paddingVertical:10,
      paddingLeft:15,
      width:50,
      zIndex:10
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
    }
})

