import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, View} from "react-native";

export default function ContactUsTab(){
    
    const router=useRouter();
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                        <Ionicons name="arrow-back-outline" color="white" size={32} />
                    </TouchableOpacity>
                    <Text style={styles.headingText}>Contact Us</Text>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black",
        alignItems:"center",
        paddingTop:20,
    },
    heading:{
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
})