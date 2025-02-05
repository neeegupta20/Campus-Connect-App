import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, ScrollView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFonts,Roboto_500Medium,Roboto_700Bold,Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { Literata_400Regular,Literata_500Medium,Literata_700Bold } from '@expo-google-fonts/literata';
import { OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans'
import { useRouter } from "expo-router";
import { events } from "../../eventsList";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import axios from "axios";
// import RazorpayCheckout from "react-native-razorpay";

export default function AddSeats(){

    const [fontsLoaded]=useFonts({
        Roboto_500Medium,Roboto_700Bold,Roboto_400Regular,Montserrat_400Regular,
        Montserrat_500Medium,Montserrat_700Bold,Literata_400Regular,
        Literata_500Medium,Literata_700Bold,OpenSans_400Regular, OpenSans_700Bold 
    })

    const router=useRouter();
    const searchParams=useGlobalSearchParams();
    const eventId=searchParams.id;
    const validEventId = Array.isArray(eventId) ? eventId[0] : eventId;
    const numericId=validEventId?parseInt(validEventId,10):undefined;
    const event=events.find((e)=>e.id===numericId);
    const ticketPrice=event?.price ?? 0;

    const [numberOfPeople,setNumberOfPeople]=useState(1);
    const totalAmount=ticketPrice*numberOfPeople;

    const reserveEvent=async()=>{
        try {
            const orderResponse=await axios.post('http://192.168.1.130:3000/create-order',{amount:totalAmount})
            const options={
                key:"rzp_live_oIOf24vws5pHYy",
                amount:orderResponse.data.amount,
                currency:orderResponse.data.currency,
                name:"CAMPUS CONNECT",
                description:"Event Reservation Payment",
                order_id:orderResponse.data.id,
                theme: {
                color: "#3399cc",
                },
            };

        //     const paymentResponse=await RazorpayCheckout.open(options);
        //     Alert.alert("Success", `Payment ID: ${paymentResponse.razorpay_payment_id}`);
        }catch(error){
            Alert.alert("ERROR OCCURED");
        }
    }


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.heading}>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                        <Ionicons name="arrow-back-outline" color="white" size={32}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.headText}>Choose Tickets</Text>
                <View style={styles.infoCard}>
                    <Text style={styles.text1}>GENERAL (GA)</Text>
                    <Text style={styles.text2}>₹ {event?.price}</Text>
                    <View style={styles.addTicketsBox}>
                        <Text style={{position:"absolute",left:10,fontSize:20,top:-6,fontWeight:400,color:numberOfPeople>1?"black":"gray"}}
                            onPress={()=>{
                                if(numberOfPeople>1){
                                    setNumberOfPeople(numberOfPeople-1)
                                }
                            }}>_
                        </Text>
                        <Text style={{position:"absolute",right:36,top:4.5,fontSize:18,fontWeight:600}}>{numberOfPeople}</Text>
                        <Text style={{position:"absolute",right:10,fontSize:20,top:1.8,fontWeight:400,color:numberOfPeople<4?"black":"gray"}}
                            onPress={()=>{
                                if(numberOfPeople<4){
                                    setNumberOfPeople(numberOfPeople+1)
                                }
                            }}>+</Text>
                    </View>
                </View>
            </ScrollView> 
            <View style={styles.checkoutBar}>
                <Text style={styles.totalPrice}>₹ {totalAmount}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={reserveEvent}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black"
    },
    heading:{
        zIndex:10,
        height:50,
        borderWidth:2,
    },
    backIcon:{
        paddingVertical:8,
        paddingLeft:15,
        width:50
    },
    headText:{
        color:"white",
        marginTop:25,
        fontFamily:"OpenSans_700Bold",
        fontSize:20,
        marginLeft:30
    },
    infoCard:{
        backgroundColor:"#191818",
        height:100,
        marginHorizontal:20,
        marginBottom:30,
        borderRadius:20,
        marginTop:18
    },
    text1:{
        color:"white",
        position:"absolute",
        top:20,
        left:20,
        fontSize:16,
        fontWeight:600
    },
    text2:{
        color:"white",
        position:"absolute",
        top:50,
        left:20,
        fontSize:15,
        fontWeight:200
    },
    addTicketsBox:{
        position:"absolute",
        bottom:37,
        right:35,
        height:30,
        width:80,
        backgroundColor:"white",
        borderRadius:10,
    },
    checkoutBar:{
        height:100,
        borderTopWidth:2,
        borderTopColor:"#222222"
    },
    totalPrice:{
        fontSize:24,
        color:"white",
        position:"absolute",
        top:35,
        left:35,
        fontWeight:600
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