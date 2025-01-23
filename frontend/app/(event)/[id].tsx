import { events } from "../eventsList";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { Ionicons } from '@expo/vector-icons';
import { useFonts,Roboto_500Medium,Roboto_700Bold,Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { Literata_400Regular,Literata_500Medium,Literata_700Bold } from '@expo-google-fonts/literata';
import { OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans'

export default function SingleEventScreen(){
    
    const [fontsLoaded]=useFonts({
        Roboto_500Medium,Roboto_700Bold,Roboto_400Regular,Montserrat_400Regular,
        Montserrat_500Medium,Montserrat_700Bold,Literata_400Regular,
        Literata_500Medium,Literata_700Bold,OpenSans_400Regular, OpenSans_700Bold 
    })

    const router=useRouter();
    const searchParams=useSearchParams();
    const eventId=searchParams.get("id");
    const numericId=eventId ? parseInt(eventId, 10) : undefined;
    const event=events.find((e)=>e.id===numericId);
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={30}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.topCard}>
                    <Image style={styles.eventPoster} source={event?.photo1}></Image>
                    <Text style={styles.eventTitle}>{event?.title}</Text>
                </View>   
                <View style={styles.eventInfoCard}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"black",
        flex:1
    },
    eventHeading:{
        color:"white",
        padding:5
    },
    topCard:{
        alignItems:"center",
        marginTop:40
    },
    eventPoster:{
        width:350,
        height:450,
        borderRadius:30
    },
    heading:{
        zIndex:10,
        height:50,
        borderWidth:2
    },
    backIcon:{
        paddingVertical:8,
        paddingLeft:15,
        width:50
    },
    eventTitle:{
        color:"white",
        fontFamily:"OpenSans_700Bold",
        fontSize:25,
        marginTop:20
    },
    eventInfoCard:{

    }
})