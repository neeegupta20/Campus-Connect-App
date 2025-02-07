import { events } from "../eventsList";
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router/build/hooks";
import { Ionicons } from '@expo/vector-icons';
import { useFonts,Roboto_500Medium,Roboto_700Bold,Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { Literata_400Regular,Literata_500Medium,Literata_700Bold } from '@expo-google-fonts/literata';
import { OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans'
import { useState } from "react";

export default function SingleEventScreen(){
    
    const [fontsLoaded]=useFonts({
        Roboto_500Medium,Roboto_700Bold,Roboto_400Regular,Montserrat_400Regular,
        Montserrat_500Medium,Montserrat_700Bold,Literata_400Regular,
        Literata_500Medium,Literata_700Bold,OpenSans_400Regular, OpenSans_700Bold 
    })

    const [descriptionExpanded,setDescriptionExpanded]=useState(false);
    const toggleReadMore=()=>{
        setDescriptionExpanded(!descriptionExpanded);
    }

    const router=useRouter();
    const searchParams=useGlobalSearchParams();
    const eventId=searchParams.id;
    const validEventId = Array.isArray(eventId) ? eventId[0] : eventId;
    const numericId=validEventId?parseInt(validEventId,10):undefined;
    const event=events.find((e)=>e.id===numericId);
    
    return(
        <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:1000}}>
                <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.topCard}>
                    <Image style={styles.eventPoster} source={event?.photo1}></Image>
                    <Text style={styles.eventTitle}>{event?.title}</Text>
                </View>   
                <View style={styles.eventInfoCard}>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Ionicons style={styles.calendarIcon} name="calendar-outline" color="white" size={30}/>
                        <Text style={styles.eventDateText}>
                            {event?.formatDate}
                        </Text>
                        <Ionicons style={styles.clockIcon} name="time-outline" color="white" size={32}/>
                        <Text style={styles.eventTimeText}>{event?.time}</Text>
                    </View>
                    <View style={styles.line}></View>
                    <Ionicons style={styles.locationIcon} name="location-outline" color="white" size={35}/>
                    <Text style={styles.eventVenueText}>{event?.venue}</Text>
                </View>
                <View>
                    <Text style={styles.aboutHeading}>About</Text>
                    <Text style={styles.eventAboutText} numberOfLines={descriptionExpanded?undefined:3}>
                        {event?.description}
                    </Text>
                    <Text style={styles.readMoreButton} onPress={toggleReadMore}>
                        {descriptionExpanded?'Read Less':'Read More'}
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <Text style={styles.eventPriceText}>
                ₹ {event?.price} /-
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>{
                            if(numericId){
                                router.push(`/event/${numericId}/seat`)
                            }
                            else{
                                console.log("INVALID ID.")
                            }
                        }}>
<                           Text style={styles.buttonText}>Book Tickets</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    eventHeading:{
        color:"white",
        padding:5
    },
    topCard:{
        alignItems:"center",
        marginTop:15
    },
    eventPoster:{
        width:350,
        height:380,
        borderRadius:30
    },
    heading:{
        zIndex:10,
        height:50,
        borderWidth:2,
    },
    backIcon:{
        paddingLeft:15,
        width:50
    },
    eventTitle:{
        color:"white",
        fontFamily:"OpenSans_700Bold",
        fontSize:25,
        marginTop:15
    },
    eventInfoCard:{
        backgroundColor:"#191818",
        height:130,
        marginHorizontal:20,
        marginTop:15,
        marginBottom:30,
        borderRadius:20,
        borderColor:"#63D0D8",
        borderWidth:1
    },
    calendarIcon:{
        position:"absolute",
        top:10,
        left:25
    },
    eventDateText:{
        position:"absolute",
        top:16,
        left:65,
        fontSize:15,
        color:"white",
        fontFamily:"OpenSans_700Bold"
    },
    clockIcon:{
        position:"absolute",
        top:10,
        right:120
    },
    eventTimeText:{
        color:"white",
        position:"absolute",
        top:16,
        right:72,
        fontSize:16,
        fontFamily:"OpenSans_700Bold"
    },
    line:{
        height:1,
        backgroundColor:'white',
        marginVertical:55,
        marginHorizontal:20
    },
    locationIcon:{
        position:"absolute",
        bottom:15,
        left:25
    },
    eventVenueText:{
        position:"absolute",
        bottom:22,
        left:65,
        color:"white",
        fontSize:15,
        fontFamily:"OpenSans_700Bold"
    },
    aboutHeading:{
        color:"#D1DEDD",
        fontSize:20,
        borderBottomColor:"#63D0D8",
        borderBottomWidth:2,
        alignSelf:"flex-start",
        marginLeft:25,
        paddingBottom:4
    },
    eventAboutText:{
        color:"white",
        marginHorizontal:25,
        marginTop:20,
        marginBottom:10
    },
    readMoreButton: {
        color:'#9DAAA9',
        fontSize: 14,
        fontWeight: '600',
        paddingBottom:4,
        marginLeft:25,
        marginBottom:80,
        borderBottomColor:"#9DAAA9",
        borderBottomWidth:0.5,
        alignSelf:"flex-start",
    },
    bottomBar:{
        height:100,
        borderTopWidth:0,
        borderTopColor:"#222222"
    },
    eventPriceText:{
        color:"white",
        position:"absolute",
        top:35,
        left:35,
        fontSize:22,
        fontFamily:"Roboto_700Bold"
    },
    buttonContainer:{
        position:"absolute",
        right:35,
        top:25,
        width:"40%",
        height:"50%"
    },
    button:{
        padding:15,
        backgroundColor:"#63D0D8",
        borderRadius:10,
        alignItems:"center",
    },
    buttonText:{
        fontSize:18,
        fontWeight:'600',
    },
})