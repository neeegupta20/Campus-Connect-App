import React, { useEffect, useCallback, useContext, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text, Image, Linking, Alert } from 'react-native';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import { useSelectedZone } from './selectedZoneContext';
import { ImageBackground } from 'react-native';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT=100;

const BottomSlider:React.FC<{isOpen:boolean;onClose:()=>void }>=({ isOpen, onClose })=>{
  const { selectedZone, setSelectedZone }=useSelectedZone();
  const translateY=useSharedValue(SCREEN_HEIGHT);
  const context=useSharedValue({ y: 0 });
  const [checkIn,setCheckIn]=useState(false);

  const gesture=Gesture.Pan()
    .onStart(()=>{
      context.value={y:translateY.value};
    })
    .onUpdate((event)=>{
      translateY.value=Math.max(
        Math.min(event.translationY+context.value.y,SCREEN_HEIGHT-TAB_BAR_HEIGHT),
        -SCREEN_HEIGHT + 50
      );
    })
    .onEnd(()=>{
      if (translateY.value>SCREEN_HEIGHT/2) {
        runOnJS(onClose)();
        runOnJS(setSelectedZone)(null);
        translateY.value=withSpring(SCREEN_HEIGHT-TAB_BAR_HEIGHT);
      }else{
        translateY.value=withSpring(-SCREEN_HEIGHT/3 - 500);
      }
    });

  useEffect(()=>{
    translateY.value=withSpring(isOpen ? -SCREEN_HEIGHT/3 - 500 : SCREEN_HEIGHT - TAB_BAR_HEIGHT, {
      damping:50,
    });
  },[isOpen,translateY]);

  const handleSliderClose=()=>{
    translateY.value=withSpring(SCREEN_HEIGHT - TAB_BAR_HEIGHT,{},()=>{
      runOnJS(setSelectedZone)(null);
      runOnJS(onClose)();
    });
  };
  

  const rBottomSlider=useAnimatedStyle(()=>({
    transform:[{ translateY:translateY.value}],
  }));

  const handleGetDirections=useCallback(()=>{
      if (selectedZone){
        const url=`https://www.google.com/maps/dir/?api=1&destination=${selectedZone.latitude},${selectedZone.longitude}`;
        Linking.openURL(url).catch((err)=>console.error("Error opening URL: ",err));
      }
  },[selectedZone]);

  const ImageMap={
    "petTherapy.png": require("../../assets/EVENT IMAGES/petTherapy.png"),
    "hackathons.png": require("../../assets/EVENT IMAGES/hackathons.png"),
  };
  

  const {user}=useContext(UserContext);

    const handleCheckIn=async()=>{
      if(!user){
        Alert.alert("PLEASE LOGIN/SIGN UP")
        return;
      }
      try{
        const token=await SecureStore.getItemAsync("authToken");
        if(!token){
          return;
        }
        setCheckIn(true);
        try{
          const response=await axios.post('https://campus-connect-app-backend.onrender.com/check-in',{
              zoneId:selectedZone?.id,
              name:user?.name,
              email:user?.email,
              telno:user?.telno
          },{
            headers:{ Authorization: `Bearer ${token}` }
          })
          if(response?.status===200 && response?.data?.data?.checkedIn){
            checkCheckInStatus();
          }
        }catch(error){
          if(axios.isAxiosError(error)){
            throw error;
          }
        }
      }
      catch(error){
        console.error("ERR:",error)
        setCheckIn(false);
      }
    }

    const handleCheckOut=async()=>{
      try{
        const token=await SecureStore.getItemAsync("authToken");
        if(!token){
          return;
        }
        setCheckIn(false);
        try{
          const response=await axios.delete('https://campus-connect-app-backend.onrender.com/check-out',{
            data:{
              zoneId:selectedZone?.id,
              name:user?.name,
              email:user?.email,
              telno:user?.telno
            },
            headers:{ Authorization: `Bearer ${token}` }
          }
          )
          if(response?.status===200){
            checkCheckInStatus();
          }
        }catch(error){
          if(axios.isAxiosError(error)){
            throw error;
          }
        }
      }
      catch(error){
        console.error("ERR:",error)
        setCheckIn(true);
      }
    }

    const checkCheckInStatus=async()=>{
      try{
        const token=await SecureStore.getItemAsync("authToken");
        if(!token || !selectedZone){
          return;
        }
        const response=await axios.get('https://campus-connect-app-backend.onrender.com/check-in-status', {
          params:{zoneId:selectedZone?.id},
          headers:{Authorization:`Bearer ${token}`}
        });
        if(response?.data?.checkedIn){
          setCheckIn(true);
        } 
        else{
          setCheckIn(false);
        }
      }catch(error){
        console.error("ERR:",error);
      }
    };

    useEffect(()=>{
      if(selectedZone){
          checkCheckInStatus();
      }
    },[selectedZone]);
  
    const [imageLoading,setImageLoading]=useState(true);

  return(
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSliderContainer, rBottomSlider]}>
        {/* <ImageBackground source={require('../../assets/images/bg.jpeg')} style={styles.imageBackground}> */}
        <ScrollView>
        <View style={styles.line} />
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.sliderCross} onPress={handleSliderClose}>
              <Entypo name="cross" size={24} color="white" />
            </TouchableOpacity>
            {selectedZone && (
              <>
                <Text style={styles.zoneName}>{selectedZone.name}</Text>
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
                <View style={{width:370}}>
                  <Image 
                    source={{uri:selectedZone.imageUrl}}  
                    style={styles.image}
                    onLoadEnd={()=>{setImageLoading(false)}}
                  />
              
                  <Text style={styles.zoneDescription}>{selectedZone.description}</Text>
                </View>
                <View style={{marginTop:30,flexDirection:'row'}}>
                  <Ionicons style={styles.calendarIcon} name='calendar-outline' color="white" size={30}></Ionicons>
                  <Text style={styles.zoneDate}>{selectedZone.date}</Text>
                  <Ionicons style={styles.timeIcon} name='time-outline' color="white" size={30}></Ionicons>
                  <Text style={styles.zoneTime}>{selectedZone.time}</Text>
                </View>
                <View style={{marginVertical:15}}>
                  <Text style={styles.zoneVenue}>📍 {selectedZone.venue}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:20}}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
                        <Text style={styles.buttonText}>Get Directions</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainer}>
                    {checkIn?(
                      <TouchableOpacity style={styles.button2} onPress={handleCheckOut}>
                        <Text style={styles.buttonText}>Checked-In</Text>
                      </TouchableOpacity>
                    ):(
                      <TouchableOpacity style={styles.button}  onPress={handleCheckIn}>
                        <Text style={styles.buttonText}>Check-In</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
        {/* </ImageBackground> */}
      </Animated.View>
    </GestureDetector>
  );
};

const styles=StyleSheet.create({
  bottomSliderContainer: {
    height:SCREEN_HEIGHT,
    width:'100%',
    backgroundColor:'black',
    position:'absolute',
    top:SCREEN_HEIGHT,
    borderRadius:30,
    padding:20
  },
  line:{
    width:75,
    height:4,
    backgroundColor:'white',
    alignSelf:'center',
    marginVertical:10,
    borderRadius:5,
  },
  contentContainer: {
    paddingVertical:10
  },
  sliderCross:{
    zIndex:10,
    position:'absolute',
    right:20,
    top:10,
  },
  zoneName:{
    marginVertical:10,
    fontSize:20,
    fontWeight:'bold',
    color:"white",
    fontFamily:"Montserrat_700Bold"
  },
  zoneDescription:{
    fontSize:16,
    marginTop:20,
    color:'white',
    fontFamily:"Poppins_500Medium",
    paddingHorizontal:10
  },
  image:{
    marginRight:20,
    alignSelf:"center",
    marginTop:10,
    width:350,
    height:250,
    borderRadius:10
  },
  buttonContainer:{
    alignSelf:'center',
    marginTop:20,
    width:"50%",
},
button:{
    backgroundColor: "#63D0D8",
    paddingHorizontal:5,
    paddingVertical:12,
    borderRadius:10,
    alignItems:"center",
    marginRight:5
},
button2:{
  backgroundColor:"grey",
  paddingHorizontal:5,
  paddingVertical:12,
  borderRadius:10,
  alignItems:"center",
},
buttonText:{
    color:"#fff",
    fontSize:14,
    fontWeight: "bold",
},
loaderIcon:{
  width: 40,
  height: 40,
  alignSelf:"center",
  top: 30
},
timeIcon:{
  paddingHorizontal:100,
  marginTop:12
},
zoneTime:{
   color:"white",
   fontFamily:"Poppins_400Regular",
   fontSize:22,
   position:"absolute",
   right:120,
   top:12
},
calendarIcon:{
  paddingHorizontal:10,
  marginTop:10
},
zoneDate:{
   color:"white",
   fontFamily:"Poppins_400Regular",
   fontSize:20,
   position:"absolute",
   left:50,
   top:12
},
zoneVenue:{
  color:"white",
  fontFamily:"Poppins_500Medium",
  position:"absolute",
  marginHorizontal:10,
  fontSize:20,
}
});

export default BottomSlider;
