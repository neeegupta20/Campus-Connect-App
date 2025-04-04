import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground } from "react-native";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";

export default function AvatarSelectionTab(){

    const avatar1=require('../../assets/AVATARS/avatar1.png');
    const avatar2=require('../../assets/AVATARS/avatar2.png');
    const avatar3=require('../../assets/AVATARS/avatar3.png');
    const avatar4=require('../../assets/AVATARS/avatar4.png');

    const [selectedAvatar,setSelectedAvatar]=useState<string|null>(null);
    const router=useRouter();

    const handleAvatarSelect=(avatarPath:string)=>{
        setSelectedAvatar(avatarPath);
        router.push({pathname:'/(auth)/enterName',params:{selectedAvatar:avatarPath}});
    }
    
    return(
        // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:1000}}>
          <SafeAreaView style={styles.container}>
              <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                  <Ionicons name="arrow-back-outline" color="white" size={32}/>
              </TouchableOpacity>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                  <Text style={styles.headText}>Choose Avatar</Text>
                  <View style={styles.avatarGrid}>
                      <TouchableOpacity onPress={()=>handleAvatarSelect('avatar1')}>
                          <Image source={avatar1} style={styles.avatarImage} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>handleAvatarSelect('avatar2')}>
                          <Image source={avatar2} style={styles.avatarImage} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>handleAvatarSelect('avatar3')}>
                          <Image source={avatar3} style={styles.avatarImage} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>handleAvatarSelect('avatar4')}>
                          <Image source={avatar4} style={styles.avatarImage} />
                      </TouchableOpacity>
                  </View>
              </ScrollView>
          </SafeAreaView>
        // </ImageBackground>
    )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"black"
  },
  backIcon:{
    zIndex:20,
    padding:20
  },
  headText:{
    color:"white",
    marginVertical:50,
    fontFamily:"Poppins_700Bold",
    fontSize:30,
  },
  scrollContainer:{
    alignItems:"center",
  },
  avatarGrid:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-evenly',
    width:"100%",
  },
  avatarImage:{
    width:150,
    height:150,
    borderRadius:700,
    margin:10,
    borderWidth:2,
    borderColor:"#ccc",
  },
  selected:{
    borderColor:"blue",
    borderWidth: 3,
  },
});
