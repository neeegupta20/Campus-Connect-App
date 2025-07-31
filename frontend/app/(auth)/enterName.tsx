import { useGlobalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, TextInput, ImageBackground } from "react-native";
import { Image, SafeAreaView, StyleSheet, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native";

export default function EnterName(){
  
    const searchParams=useGlobalSearchParams();
    const avatar=Array.isArray(searchParams?.selectedAvatar) ? searchParams?.selectedAvatar[0] : searchParams?.selectedAvatar ?? ''; 
    const router=useRouter();
    
    const [name,SetName]=useState('');
    const [nameVerify,SetNameVerify]=useState(false);

    const avatarMap:{[key:string]:any}={
        avatar1:require('../../assets/AVATARS/avatar1.png'),
        avatar2:require('../../assets/AVATARS/avatar2.png'),
        avatar3:require('../../assets/AVATARS/avatar3.png'),
        avatar4:require('../../assets/AVATARS/avatar4.png'),
    };

    const handleName=()=>{
        SetNameVerify(false);
        if(name.length>1 && name.length<20){
          SetNameVerify(true);
        }
    }
  
    const avatarImage=avatarMap[avatar] ?? null;

    return(
        // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:1000}}>
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                        <Ionicons name="arrow-back-outline" color="white" size={32}/>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>
                        {avatarImage && <Image source={avatarImage} style={styles.avatarImage}/>}
                        <Text style={styles.headText}>
                            Name
                        </Text>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                placeholder="NAME" 
                                value={name} 
                                style={styles.input}
                                onChange={handleName}
                                onChangeText={(text)=>SetName(text)}
                                placeholderTextColor='gray'>
                            </TextInput>
                            <Text style={styles.icon}>
                                {name.length<1?null:nameVerify?<FontAwesome name="check-circle-o" size={24} color="green"/>:<FontAwesome name="exclamation-circle" size={24} color="red"/>}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={()=>{
                                if(!nameVerify){
                                    return;
                                }
                                router.push({pathname:'/(auth)/enterPhoneNo',params:{avatar,name}})
                            }}>
                            <Text style={styles.buttonText}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        // </ImageBackground>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
    },
    imageContainer:{
        marginTop:30,
        alignItems:'center'
    },
    avatarImage:{
        width:180,
        height:180,
        borderRadius:150,
    },
    backIcon:{
        marginLeft:20,
        top: Platform.OS==="android"?30:70,
        marginTop: Platform.OS==="android"?30:70,
    },
    headText:{
        color:"white",
        marginTop:40,
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
        width:"70%",
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
