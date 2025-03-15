import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, ImageBackground, StyleSheet, TextInput,Platform } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import { UserContext } from "../context/UserContext";
import LottieView from "lottie-react-native";
import loaderWhite from "../../assets/loaderWhite.json"

export default function ChangePasswordTab(){

    const router=useRouter();
    const [password,SetPassword]=useState('');
    const {user}=useContext(UserContext);
    const [loading, setLoading] = useState(false)


    const changePassword=async()=>{
        setLoading(true)
       try {
            await axios.put('https://campus-connect-app-backend.onrender.com/change-password',{email:user?.email,newpassword:password})
            Alert.alert("PASSWORD CHANGED.")
            router.replace('/(tabs)/profile')
            setLoading(false)
       }catch(error){
            Alert.alert("PLEASE TRY AGAIN LATER.")
       }
       setLoading(false)
    }
    
    return(
        // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:1000}}>
            <SafeAreaView style={styles.container}>
                <View style={styles.heading}>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                        <Ionicons name="arrow-back-outline" color="white" size={32} />
                    </TouchableOpacity>
                    <Text style={styles.headingText}>Change Password</Text>
                </View>
                <Text style={styles.text}> New Password</Text>
                <View style={[styles.inputContainer]}>
                    <TextInput
                        placeholder="Enter New Password"
                        value={password}
                        style={styles.input}
                        onChangeText={(text)=>SetPassword(text)}
                        placeholderTextColor="gray"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={changePassword} disabled={loading}>
                    {loading?(
                        <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
                    ):(<Text style={styles.buttonText}>Reset Password</Text>)}
                    
                </TouchableOpacity>
            </SafeAreaView>
        // </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
    },
    heading:{
        marginTop:Platform.OS==='ios'?10:30,
        flexDirection:"row",
        alignItems: "center",
        width:"100%",
        paddingHorizontal:15,
        marginBottom:20,
    },
    headingText:{
        color:"white",
        fontSize:24,
        fontWeight:"bold",
        marginLeft:10,
    },
    backIcon:{
        padding:10,
    },
    text:{
        color:"white",
        fontSize:18,
        marginLeft:35,
        marginTop:10,
        fontWeight:200,
        marginBottom:15
    },
    input:{
        flex:1,
        height:50,
        borderWidth:1,
        borderRadius:12,
        paddingHorizontal:12,
        fontSize:18,
        borderColor:"#63D0D8",
        color:"white",
    },
    inputContainer:{
        width:"80%",
        height:45,
        flexDirection:'row',
        marginLeft:35,
    },
    button:{
        backgroundColor: "#63D0D8",
        padding:15,
        borderRadius:16,
        alignItems:"center",
        marginHorizontal:30,
        marginTop:30
    },
    buttonText:{
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    loaderIcon:{
        width: 25,
        height:25,
        alignSelf:"center"
    }
})