import React, { useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import { useSelectedZone } from './selectedZoneContext';
import { ImageBackground } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT=100;

const BottomSlider:React.FC<{ isOpen: boolean; onClose: () => void }>=({ isOpen, onClose })=>{
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
        translateY.value=withSpring(-SCREEN_HEIGHT / 3 - 50);
      }
    });

  useEffect(()=>{
    translateY.value=withSpring(isOpen ? -SCREEN_HEIGHT / 3 - 50 : SCREEN_HEIGHT - TAB_BAR_HEIGHT, {
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
                <Text style={styles.zoneDescription}>{selectedZone.description}</Text>
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
    padding:20,
  },
  sliderCross:{
    position:'absolute',
    right:20,
    top:10,
  },
  imageBackground: {
    flex:1,
    padding:20,
    borderRadius:30,
    overflow:'hidden',
  },
  zoneName:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:20,
  },
  zoneDescription: {
    fontSize:14,
    marginTop:10,
    color:'#555',
  },
});

export default BottomSlider;
