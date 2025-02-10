import React, { useEffect, useCallback, useContext, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text, Image, Linking } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import { useSelectedZone } from './selectedZoneContext';
import { ImageBackground } from 'react-native';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

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
        -SCREEN_HEIGHT + 500
      );
    })
    .onEnd(()=>{
      if (translateY.value>SCREEN_HEIGHT/2) {
        runOnJS(onClose)();
        runOnJS(setSelectedZone)(null);
        translateY.value=withSpring(SCREEN_HEIGHT-TAB_BAR_HEIGHT);
      }else{
        translateY.value=withSpring(-SCREEN_HEIGHT/3 - 350);
      }
    });

  useEffect(()=>{
    translateY.value=withSpring(isOpen ? -SCREEN_HEIGHT / 3 - 350 : SCREEN_HEIGHT - TAB_BAR_HEIGHT, {
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

    const {user}=useContext(UserContext);

    const handleCheckIn=async()=>{
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
          else{
            setCheckIn(false);
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
    const checkCheckInStatus=async()=>{
      try{
          const token=await SecureStore.getItemAsync("authToken");
          if (!token || !selectedZone){
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
  

  return(
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSliderContainer, rBottomSlider]}>
        <ImageBackground source={require('../../assets/images/bg.jpeg')} style={styles.imageBackground}>
          <View style={styles.line} />
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.sliderCross} onPress={handleSliderClose}>
              <Entypo name="cross" size={24} color="white" />
            </TouchableOpacity>
            {selectedZone && (
              <>
                <Text style={styles.zoneName}>{selectedZone.name}</Text>
                <View style={{width:370}}>
                  <Image 
                    source={typeof selectedZone.imageUrl==="string"?{uri:selectedZone.imageUrl}
                    :selectedZone.imageUrl
                    } style={styles.image}>
                  </Image>
                  <Text style={styles.zoneDescription}>{selectedZone.description}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
                        <Text style={styles.buttonText}>Get Directions</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainer}>
                    {checkIn?(
                      <TouchableOpacity style={styles.button2}>
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
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};

const styles=StyleSheet.create({
  bottomSliderContainer: {
    height:SCREEN_HEIGHT,
    width:'100%',
    backgroundColor:'white',
    position:'absolute',
    top:SCREEN_HEIGHT,
    borderRadius:30,
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
  imageBackground:{
    flex:1,
    padding:20,
    borderRadius:30,
    overflow:'hidden',
  },
  zoneName:{
    marginVertical:10,
    fontSize:20,
    fontWeight:'bold',
    color:"white",
    fontFamily:"Montserrat_700Bold"
  },
  zoneDescription:{
    fontSize:14,
    marginTop:20,
    color:'white',
    fontFamily:"Montserrat_500Medium"
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
    marginRight:10
},
button:{
    backgroundColor: "#63D0D8",
    paddingHorizontal:5,
    paddingVertical:12,
    borderRadius:10,
    alignItems:"center",
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
});

export default BottomSlider;
