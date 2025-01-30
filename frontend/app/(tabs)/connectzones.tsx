import { useState } from "react";
import { View, StyleSheet, Linking, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomSlider from "../connectZonesTab";
import ConnectZone from "../connectZoneType";
import Zones from "../connectZonesList";
import { useRouter } from "expo-router";

export default function MapScreen(){

  const [showBottomSlider, setShowBottomSlider]=useState(false);
  const [selectedZone, setSelectedZone]=useState<ConnectZone | null>(null)
  const router=useRouter();


  const handleGetDirections=()=>{
    if(selectedZone){
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedZone.latitude},${selectedZone.longitude}`;
      Linking.openURL(url).catch((err) => console.error("Error opening URL: ", err));
    }
  }

  return(
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapContainer}
          initialRegion={{
            latitude: 30.352140, 
            longitude: 76.373839,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          zoomEnabled={true}
          scrollEnabled={true}
          showsUserLocation={true}
          >
          {Zones.map((zone)=>(
            <Marker
              key={zone.id}
              coordinate={{
                latitude:zone.latitude,
                longitude:zone.longitude,
              }}
              onPress={()=>{
                setSelectedZone(zone); 
                setShowBottomSlider(true);
              }}
            />
          ))}
        </MapView>
        <TouchableOpacity style={styles.goBackIcon} 
          onPress={()=>{
            setSelectedZone(null);
            setShowBottomSlider(false);
            router.back()
          }}>
           <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGetDirections} style={styles.directionsIcon}>
          <FontAwesome name="map-marker" size={24} color="white" />
        </TouchableOpacity>
        <BottomSlider isOpen={showBottomSlider} zone={selectedZone} onClose={()=>setShowBottomSlider(false)}/>
      </View>
    </GestureHandlerRootView>
  )
}

const {height}=Dimensions.get("window");

const styles=StyleSheet.create(
  {
    container:{
      flex:1 
    },
    infoContainer:{
      height: "100%", 
      position: "relative" 
    },
    image:{ 
      width: "100%", 
      height: height * 0.5, 
      resizeMode: "cover" 
    },
    fadeOverlay: {
      position: "absolute",
      bottom: 0,
      height: 100,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    title:{ 
      fontSize: 24, 
      fontWeight: "bold",
      marginTop: 60, 
      marginHorizontal: 10, 
      color: "#333" 
    },
    description:{ 
      fontSize: 16, 
      margin: 10, 
      color: "#555" 
    },
    text:{
      color: "blue",
      fontSize: 20,
      marginTop: "10%",
      textAlign: "center",
    },
    mapContainer:{ 
      flex: 1, 
      position: "relative" 
    },
    goBackIcon:{
      position: "absolute",
      top: 50,
      left: 20,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 10,
      borderRadius: 20,
    },
    footerButtonsContainer:{
      position: "absolute",
      bottom: 30,
      left: 20,
      right: 20,
      alignItems: "center",
    },
    directionsIcon:{
      position: "absolute",
      top: 50,
      right: 20,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 12.5,
      borderRadius: 20,
      color: "white",
    },
    viewonmap:{
      position: 'absolute',
      alignSelf: 'center',
      top: 500
    }
  }
);
