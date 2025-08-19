import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,Platform, Alert } from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router/build/hooks";
import { Ionicons } from '@expo/vector-icons';
import { useFonts,Roboto_500Medium,Roboto_700Bold,Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { Literata_400Regular,Literata_500Medium,Literata_700Bold } from '@expo-google-fonts/literata';
import { OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans'
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useEvent } from "../context/EventContext";
import LottieView from "lottie-react-native";
import loaderWhite from "../../assets/loaderWhite.json"
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";

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
      
    const {events,loading}=useEvent();
    const [imageLoading,setImageLoading]=useState(true);
    const router=useRouter();
    const searchParams=useGlobalSearchParams();
    const eventId=searchParams.id;
    const validEventId=Array.isArray(eventId) ? eventId[0] : eventId;
    const numericId=validEventId?parseInt(validEventId,10):undefined;
    const event=events.find((e)=>e.id===numericId);
    const {user}=useContext(UserContext);
    const isSoldOut=[1,2,3,4,5,6,7,8].includes(event?.id ?? -1);
    const [UId,setUId]=useState("");
    const [teamName,setTeamName]=useState("");
    const [gender,setGender] = useState<"Groom Side" | "Bride Side" | null>(null);


    if(loading){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:"black"}}>
                <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
            </SafeAreaView>
        )
    }
    
    return(
        // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:1000}}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="light" translucent={true} backgroundColor="transparent"/>
            <View style={styles.heading}>
                <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.topCard}>
                    {imageLoading &&
                        <View style={{height:450,width:"100%",alignItems:"center",marginTop:100}}>
                            <LottieView
                                source={require("../../assets/loaderWhite.json")}
                                autoPlay
                                loop
                                style={styles.loaderIcon}
                            />
                        </View>
                    }
                    <Image style={styles.eventPoster} source={{uri:event?.photo1}} onLoadEnd={()=>{setImageLoading(false)}}></Image>
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
                    <Ionicons style={styles.locationIcon} name="location-outline" color="white" size={35}/>
                    <Text style={styles.eventVenueText}>{event?.venue}</Text>
                </View>
                {event?.id===7 && (
                    <View style={styles.moreInputContainer}>
                        <View>
                            <TextInput
                                placeholder="PUBG UID" 
                                value={UId} 
                                style={styles.input}
                                onChangeText={(text)=>setUId(text)}
                                placeholderTextColor='gray'>
                            </TextInput>
                            <TextInput
                                placeholder="Squad Name" 
                                value={teamName} 
                                style={styles.input}
                                onChangeText={(text)=>setTeamName(text)}
                                placeholderTextColor='gray'>
                            </TextInput>
                        </View>
                    </View>
                )}
                {event?.id===8 && (
                   <View style={styles.moreInputContainer2}>
                        <TouchableOpacity
                            style={[styles.option,gender === "Groom Side" && { backgroundColor: "#4A90E2" },]}
                            onPress={() => setGender("Groom Side")}>
                        <Text style={[styles.optionText,gender === "Groom Side" && { color: "white" },]}>
                            🤵🏻 Groom Side
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.option,gender === "Bride Side" && { backgroundColor: "#FF69B4" },]}
                            onPress={() => setGender("Bride Side")}>
                            <Text style={[styles.optionText,gender === "Bride Side" && { color: "white" },]}>
                                👰🏻‍♀️ Bride Side
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View>
                    <View style={styles.aboutHeading}>
                        <Text style={styles.aboutText}>About</Text>
                    </View>
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
                    <TouchableOpacity
                        style={[styles.button,isSoldOut && { backgroundColor: "#D3D3D3" }]}
                        disabled={event?.isSoldOut}
                        onPress={() => {
                            if (!user) {
                                Alert.alert("PLEASE LOGIN/ SIGN UP");
                                return;
                            }
                            if (numericId) {
                                router.push({
                                pathname: "/event/[id]/seat",
                                params: { 
                                    id: String(numericId), gender, UId, teamName
                                },
                                });
                            } else {
                                console.log("INVALID ID.");
                            }
                        }}
                    >
                    <Text style={styles.buttonText}>{event?.isSoldOut ? "SOLD OUT" : "Book Tickets"}</Text>
                    </TouchableOpacity>

                </View>
            </View>     
        </SafeAreaView>
        // </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
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
        height:450,
        borderRadius:30
    },
    heading:{
        zIndex:10,   
        borderWidth:0,
    },
    backIcon:{
        marginTop:Platform.OS==='ios'?10:50,
        paddingBottom:10,
        paddingLeft:15,
        width:50
    },
    eventTitle:{
        color:"white",
        fontFamily:"Montserrat_700Bold",
        fontSize:25,
        marginTop:15
    },
    eventInfoCard:{    
        height:130,
        marginHorizontal:20,
        marginTop:18,
        marginBottom:20,
        borderRadius:20,
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
        left:22
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
        borderBottomColor:"#63D0D8",
        borderBottomWidth:2,
        alignSelf:"flex-start",
        marginLeft:25,
        paddingBottom:4,
        marginTop:20
    },
    aboutText:{
        color:"#D1DEDD",
        fontSize:20,
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
    loaderIcon:{
        width: 40,
        height: 40,
        alignSelf:"center",
        top: 30
    },
    moreInputContainer:{
        flex:1,
        flexDirection:'column',
        alignSelf:'center'
    },
    input:{
        flex:1,
        height:50,
        borderColor:"#63D0D8",
        borderWidth:1,
        paddingHorizontal:100,
        borderRadius:10,
        color:"white",
        fontSize:20,
        marginVertical:10
    },
    moreInputContainer2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  option: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
})