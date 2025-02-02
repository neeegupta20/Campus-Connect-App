import { useGlobalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native";

export default function EnterPhoneNumber(){
    
    const searchParams=useGlobalSearchParams();
    const avatar=Array.isArray(searchParams?.avatar) ? searchParams?.avatar[0] : searchParams?.avatar ?? ''; 
    const name=searchParams?.name ?? '';
    const router=useRouter();
    const [telno,SetPhone]=useState('');
    const [phoneNumberVerify,SetPhoneNumberVerify]=useState(false);
    const mobileNumberRegex = /^\d{9}$/;

    const avatarMap:{[key:string]:any}={
        avatar1:require('../../assets/AVATARS/avatar1.png'),
        avatar2:require('../../assets/AVATARS/avatar2.png'),
        avatar3:require('../../assets/AVATARS/avatar3.png'),
        avatar4:require('../../assets/AVATARS/avatar4.png'),
    };

    const handlePhoneNumber=()=>{
        SetPhoneNumberVerify(false);
        if(mobileNumberRegex.test(telno)){
            SetPhoneNumberVerify(true);
        }
    }
  
    const avatarImage=avatarMap[avatar] ?? null;

    return(
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32}/>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {avatarImage && <Image source={avatarImage} style={styles.avatarImage}/>}
                    <Text style={styles.headText}>
                        ENTER PHONE NUMBER
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder="PHONE NUMBER" 
                            value={telno} 
                            style={styles.input}
                            onChange={handlePhoneNumber}
                            onChangeText={(text)=>SetPhone(text)}
                            placeholderTextColor='gray'>
                        </TextInput>
                        <Text style={styles.icon}>
                            {telno.length<1?null:phoneNumberVerify?<FontAwesome name="check-circle-o" size={24} color="green"/>:<FontAwesome name="exclamation-circle" size={24} color="red"/>}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} 
                        onPress={()=>{
                            if(!phoneNumberVerify){
                                return;
                            }
                            router.push({pathname:'/(auth)/enterEmail',params:{avatar,name,telno}})
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
        marginTop:30,
        alignItems:'center'
    },
    avatarImage:{
        width:180,
        height:180,
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
        fontSize:25,
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
