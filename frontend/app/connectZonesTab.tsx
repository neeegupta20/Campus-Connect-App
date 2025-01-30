import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import ConnectZone from './connectZoneType';

const {height:SCREEN_HEIGHT}=Dimensions.get('window')
const TAB_BAR_HEIGHT=950;
  
const BottomSlider:React.FC<{isOpen:boolean,zone:ConnectZone|null,onClose:()=>void}>=({isOpen,zone,onClose})=>{
    
  const translateY=useSharedValue(SCREEN_HEIGHT);
  const context=useSharedValue({y:0});

  const gesture=Gesture.Pan()
    
  .onStart(()=>{
    context.value={y:translateY.value};
  })
    
  .onUpdate((event)=>{
    translateY.value=event.translationY+context.value.y;
    translateY.value=Math.max(translateY.value,-SCREEN_HEIGHT+100);
    translateY.value=Math.min(translateY.value, SCREEN_HEIGHT-TAB_BAR_HEIGHT);
  })
    
  useEffect(()=>{
    translateY.value=withSpring(isOpen?-SCREEN_HEIGHT/3 : SCREEN_HEIGHT-TAB_BAR_HEIGHT, {damping:50});
  },[isOpen]);

  const handleSlider=()=>{
    translateY.value=withSpring(SCREEN_HEIGHT-TAB_BAR_HEIGHT)
    onClose()
  }

  const rBottomSlider=useAnimatedStyle(()=>{
    return {
      transform:[{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSliderContainer,rBottomSlider]}>
          <View style={styles.line}/>
          <View>
            <TouchableOpacity style={styles.sliderCross} onPress={handleSlider}>
              <Entypo name="cross" size={24} color="grey" />
            </TouchableOpacity>
            {zone &&
              <>
                <Text style={styles.zoneName}>{zone.name}</Text>
                <Text style={styles.zoneDescription}>{zone.description}</Text>
              </>
            }
          </View>
      </Animated.View>
    </GestureDetector>
  );
};


const styles=StyleSheet.create({
    bottomSliderContainer: {
    height:SCREEN_HEIGHT,
    width:'100%',
    backgroundColor: 'white',
    position:'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 30,
    bottom:70
  }, 
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 5
  },
  text: {
    backgroundColor: 'black',
    alignSelf: 'center',
    marginVertical: 60,
  }, 
  sliderCross: {
    position: 'absolute',
    right: 20,
  },
  zoneName: {
    position:'absolute',
    top: 50,
  },
  zoneDescription: {
    position: 'absolute',
    top: 70
  }
})

export default BottomSlider