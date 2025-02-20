import { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet, Linking, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomSlider from "./connectZonesTab";
import Zones from "./connectZonesList";
import { useRouter } from "expo-router";
import { useSelectedZone } from './selectedZoneContext';

export default function MapScreen(){
  const { selectedZone, setSelectedZone }=useSelectedZone(); 
  const [showBottomSlider, setShowBottomSlider]=useState(false);
  const router=useRouter();
  const markerClicked=useRef(false); 


  const handleMapPress=useCallback(()=>{
    if (!markerClicked.current && showBottomSlider) {
      setSelectedZone(null); 
      setShowBottomSlider(false); 
    }
    markerClicked.current=false; 
  },[showBottomSlider,setSelectedZone]);

  const deselectZone=useCallback(()=>{
    setSelectedZone(null); 
    setShowBottomSlider(false); 
  },[setSelectedZone]);

  useEffect(()=>{
    if(!showBottomSlider){
      setSelectedZone(null);
    }
  }, [showBottomSlider, setSelectedZone]);

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
          onPress={handleMapPress} 
        >
          {Zones.map((zone)=>(
            <Marker
              key={zone.id}
              coordinate={{
                latitude: zone.latitude,
                longitude: zone.longitude,
              }}
              onPress={()=>{
                markerClicked.current = true; 
                setSelectedZone(zone);
                setShowBottomSlider(true); 
              }}
            />
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.goBackIcon}
          onPress={()=>{
            deselectZone();
            router.back();
          }}
          accessibilityLabel="Go back"
        >
        <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <BottomSlider
          isOpen={showBottomSlider}
          onClose={deselectZone}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const { height }=Dimensions.get("window");

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  mapContainer:{
    flex:1,
    position:"relative",
  },
  goBackIcon:{
    position:"absolute",
    top:50,
    left:20,
    backgroundColor:"rgba(0, 0, 0, 0.5)",
    padding:10,
    borderRadius:20,
  },
});