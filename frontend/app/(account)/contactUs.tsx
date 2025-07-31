import { Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, View, Platform} from "react-native";

export default function ContactUsTab(){
    
    const router=useRouter();
    
    return(
        // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1}}>
            <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="#00000" translucent={true}/>
            <View style={styles.heading}>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                        <Ionicons name="arrow-back-outline" color="white" size={32} />
                    </TouchableOpacity>
                    <Text style={styles.headingText}>Contact Us</Text>
            </View>
            <View style={{marginTop:20, flexDirection:"row",marginHorizontal:20}}>
                <Ionicons name="mail-outline" size={30} color="white"></Ionicons>
                <Text style={styles.email}>support@campusconnect.me</Text>
            </View>
            <View style={{marginTop:20, flexDirection:"row",marginHorizontal:20}}>
                <Ionicons name="logo-instagram" size={30} color="white"></Ionicons>
                <Text style={styles.email}>campussconnect</Text>
            </View>
            </SafeAreaView>
        // </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:20,
        backgroundColor:"black"
    },
    heading:{
        flexDirection:"row",
        alignItems: "center",
        width:"100%",
        paddingHorizontal:15,
        marginBottom:20,
        top: Platform.OS==="ios"?0:30,
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
    email:{
        marginTop:3,
        fontSize:18,
        marginHorizontal:10,
        color:'white',
        fontFamily:"Montserrat_700Bold"
    },
})