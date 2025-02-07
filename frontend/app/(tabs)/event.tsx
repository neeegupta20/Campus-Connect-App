import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { events } from "../eventsList"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts,Roboto_500Medium,Roboto_700Bold,Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import {Literata_400Regular,Literata_500Medium,Literata_700Bold} from '@expo-google-fonts/literata';
import { router } from "expo-router";
import { ImageBackground } from "react-native";

export default function Events(){

    const [fontsLoaded]=useFonts({
        Roboto_500Medium,Roboto_700Bold,Roboto_400Regular,Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold,Literata_400Regular,Literata_500Medium,Literata_700Bold
    })

    return(
        <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1}}>
            <SafeAreaView style={styles.container}>
                <View style={styles.heading}>
                    <FontAwesome name="gamepad" size={40} color="white"/>
                    <Text style={styles.tabHeading}>Events</Text>
                </View>
                <FlatList
                    data={events}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>(
                        <View style={styles.eventBox}>
                            <Image style={styles.eventPhoto} source={item.photo1}></Image>
                            <Text style={styles.eventTitle}>{item.title}</Text>
                            <Text style={styles.eventShortDesc}>{item.shortDescription}</Text>
                            <View style={styles.tagsContainer}>
                                {item.tags.map((tags,index)=>(
                                    <View key={index} style={styles.tag}>
                                        <Text style={styles.tagText}>{tags}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={()=>{router.push(`/event/${item.id}`)}} >
                                    <Text style={styles.buttonText}>Reserve</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}>
                </FlatList>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    heading:{
        paddingHorizontal:15,
        marginTop:10,
        flexDirection:"row",
        gap:10,
        marginBottom:30
    },
    tabHeading:{
        color:"white",
        fontSize:35,
        fontFamily:"Montserrat_700Bold",
        marginTop:-6
    },
    eventBox:{
        paddingHorizontal:20,
        paddingVertical:25
    },
    eventPhoto:{
        height:350,
        width:"100%",
        borderRadius:20
    },
    eventTitle:{
        color:"white",
        fontSize:20,
        paddingHorizontal:4,
        marginTop:15,
        fontFamily:"Montserrat_700Bold"
    },
    eventShortDesc:{
        color:"white",
        padding:8,
    },
    tagsContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        padding:8,
    },
    tag:{
        backgroundColor:'#D1D5DB', 
        paddingVertical:4, 
        paddingHorizontal:12,
        borderRadius:999,
        marginRight:8, 
        marginBottom:8,
    },
    tagText:{
        color:'#374151',
        fontSize:14,
        fontWeight:'600',
    },
    buttonContainer:{
        width:"100%",
    },
    button:{
        backgroundColor:"#63D0D8",
        padding:15,
        borderRadius:16,
        alignItems: "center",
        marginVertical:6
    },
    buttonText:{
        fontSize: 20,
        fontWeight: "bold",
    },
})