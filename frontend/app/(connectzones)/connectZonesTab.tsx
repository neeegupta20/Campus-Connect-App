import React, { useEffect, useCallback } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text, Image, Linking } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import { useSelectedZone } from './selectedZoneContext';
import { ImageBackground } from 'react-native';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT=100;

const BottomSlider:React.FC<{isOpen:boolean;onClose:()=>void }>=({ isOpen, onClose })=>{
  const { selectedZone, setSelectedZone }=useSelectedZone();
  const translateY=useSharedValue(SCREEN_HEIGHT);
  const context=useSharedValue({ y: 0 });

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
        translateY.value=withSpring(-SCREEN_HEIGHT / 3 - 130);
      }
    });

  useEffect(()=>{
    translateY.value=withSpring(isOpen ? -SCREEN_HEIGHT / 3 - 130 : SCREEN_HEIGHT - TAB_BAR_HEIGHT, {
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
                <View style={{width:220,flexDirection:'row'}}>
                  <Text style={styles.zoneDescription}>{selectedZone.description}</Text>
                  <Image 
                    source={typeof selectedZone.imageUrl==="string"?{uri:selectedZone.imageUrl}
                    :selectedZone.imageUrl
                    } style={styles.image}>
                  </Image>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
                      <Text style={styles.buttonText}>Get Directions</Text>
                  </TouchableOpacity>
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
    marginTop:10,
    fontSize:20,
    fontWeight:'bold',
    color:"white",
    fontFamily:"Montserrat_700Bold"
  },
  zoneDescription:{
    fontSize:14,
    marginTop:10,
    color:'white',
    fontFamily:"Montserrat_500Medium"
  },
  image:{
    marginTop:10,
    marginLeft:15,
    width:130,
    height:100,
    borderRadius:10
  },
  buttonContainer:{
    marginTop:30,
    width:"50%",
},
button:{
    backgroundColor: "#63D0D8",
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
