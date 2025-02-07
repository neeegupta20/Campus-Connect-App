import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import * as SecureStore from 'expo-secure-store';
import QRCode from 'react-native-qrcode-svg';

export default function TicketsTab(){
    
    const router=useRouter();
    
    interface Booking{
        _id:string;
        venueName:string;
        numberOfPeople:number;
        Date:string;
        Time:string
    }
    
    const [bookings,setBookings]=useState<Booking[]|null>(null);
    

    async function getBookings(){
        try{
            const token=await SecureStore.getItemAsync('authToken');
            if(!token){   
                return;
            }
            const bookingResponse=await axios.get('https://campus-connect-app-backend.onrender.com/show-reservation',{
                headers:{ Authorization: `Bearer ${token}` },
            });
            setBookings(bookingResponse.data);
        }catch(error){
            console.error("Error fetching bookings:", error);
        }
    }

    useEffect(()=>{
        const fetchBookings=async()=>{
            await getBookings();
        };
        fetchBookings();
    },[]);
    
        
    return(
        <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:900}}>
            <SafeAreaView style={styles.container}>
                <View style={styles.heading}>
                    <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                        <Ionicons name="arrow-back-outline" color="white" size={32} />
                    </TouchableOpacity>
                    <Text style={styles.headingText}>M-Tickets</Text>
                </View>       
                {bookings===null ? (
                    <Text style={styles.message}>LOADING...</Text>
                ) : bookings.length === 0 ? (
                    <Text style={styles.message}>NO TICKETS BOOKED YET</Text>
                ) : (
                    <FlatList
                        data={bookings}
                        keyExtractor={(item)=>item._id}
                        renderItem={({item})=>(
                            <View style={styles.ticketCard}>
                                <Text style={styles.eventName}>{item.venueName}</Text>
                                <View style={styles.ticketNumber}>
                                    <Ionicons name="people-outline" color="white" size={26}/>
                                    <Text style={styles.ticketDetails1}>{item.numberOfPeople}</Text>
                                </View>
                                <View style={styles.ticketNumber}>
                                    <Ionicons name="calendar-outline" color="white" size={26}/>
                                    <Text style={styles.ticketDetails2}>{item.Date}</Text>
                                </View>
                                <View style={styles.ticketNumber}>
                                    <Ionicons name="time-outline" color="white" size={26}/>
                                    <Text style={styles.ticketDetails3}>{item.Time}</Text>
                                </View>
                                <View style={styles.qrContainer}>
                                    <QRCode
                                        value={JSON.stringify({
                                            id:item._id,
                                            event:item.venueName,
                                            numberOfTickets:item.numberOfPeople,
                                            verifyUrl:`https://campus-connect-app-backend.onrender.com/scan-ticket?id=${item._id}`
                                        })}
                                        size={100}
                                    />
                                </View>
                            </View>
                        )}
                    />
                )}
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
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
    message:{
        color:"white",
        textAlign:"center",
        marginTop:100,
        fontSize:20,
    },
    ticketCard:{
        backgroundColor: "#1e1e1e",
        width:350,
        height:200,
        paddingVertical:20,
        paddingHorizontal:30,
        marginBottom:30,
        borderRadius:20,
    },
    eventName:{
        color: "white",
        fontSize:20,
        fontWeight: "bold",
    },
    ticketDetails1:{
        color:"white",
        fontSize:20,
        paddingLeft:10,
        marginTop:2
    },
    ticketDetails2:{
        color:"white",
        fontSize:18,
        paddingLeft:10,
        marginTop:3
    },
    ticketDetails3:{
        color:"white",
        fontSize:18,
        paddingLeft:10,
        marginTop:3
    },
    ticketDate:{
        color:"#888",
        fontSize:14,
        marginTop:5,
    },
    qrContainer:{
        position:"absolute",
        top:75,
        right:40
    },
    ticketNumber:{
        flexDirection:'row',
        marginTop:15
    }
})