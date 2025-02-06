import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import * as SecureStore from 'expo-secure-store'

export default function TicketsTab(){
    
    const router=useRouter();
    
    interface Booking{
        _id:string;
        venueName:string;
        numberOfPeople:number;
        Date:string;
    }
    
    const [bookings,setBookings]=useState<Booking[]|null>(null);
    

    async function getBookings(){
        try{
            const token=await SecureStore.getItemAsync('authToken');
            if(!token){   
                return;
            }
            const bookingResponse=await axios.get('http://172.16.37.126:3000/show-reservation',{
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
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline" color="white" size={32} />
                </TouchableOpacity>
                <Text style={styles.headingText}>Tickets</Text>
            </View>
            
            {bookings===null ? (
                <Text style={styles.message}>Loading...</Text>
            ) : bookings.length === 0 ? (
                <Text style={styles.message}>No tickets found.</Text>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={(item)=>item._id}
                    renderItem={({item})=>(
                        <View style={styles.ticketCard}>
                            <Text style={styles.eventName}>{item.venueName}</Text>
                            <Text style={styles.ticketDetails}>Seats: {item.numberOfPeople}</Text>
                            <Text style={styles.ticketDetails}>{item._id}</Text>
                            <Text style={styles.ticketDate}>Booked on: {item.Date}</Text>
                        </View>
                    )}
                />
            )}
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
    message:{
        color:"white",
        textAlign:"center",
        marginTop:300,
        fontSize:18,
    },
    ticketCard:{
        backgroundColor: "#1e1e1e",
        width:350,
        height:250,
        paddingVertical:20,
        paddingHorizontal:30,
        marginBottom: 10,
        borderRadius: 10,
    },
    eventName:{
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    ticketDetails:{
        color: "#bbb",
        fontSize: 16,
        marginTop: 5,
    },
    ticketDate:{
        color:"#888",
        fontSize:14,
        marginTop:5,
    },
})