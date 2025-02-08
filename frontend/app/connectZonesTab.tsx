import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import { SelectedZoneContext } from './selectedZoneContext';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 100;

const BottomSlider: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selectedZone, setSelectedZone } = useContext(SelectedZoneContext);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT + 500);
      translateY.value = Math.min(translateY.value, SCREEN_HEIGHT - TAB_BAR_HEIGHT);
    })

    useEffect(() => {
      translateY.value = withSpring(isOpen ? -SCREEN_HEIGHT / 3 - 50: SCREEN_HEIGHT - TAB_BAR_HEIGHT, { damping: 50 });
    }, [isOpen]);

  const handleSlider = () => {
    translateY.value = withSpring(SCREEN_HEIGHT - TAB_BAR_HEIGHT); 
    setSelectedZone(null); 
    onClose(); 
    console.log('Cross button pressed, deselecting zone and closing slider');
  };

  const rBottomSlider = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSliderContainer, rBottomSlider]}>
        <View style={styles.line} />
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.sliderCross} onPress={handleSlider}>
            <Entypo name="cross" size={24} color="grey" />
          </TouchableOpacity>
          {selectedZone && (
            <>
              <Text style={styles.zoneName}>{selectedZone.name}</Text>
              <Text style={styles.zoneDescription}>{selectedZone.description}</Text>
            </>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSliderContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 30,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  contentContainer: {
    padding: 20,
  },
  sliderCross: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  zoneDescription: {
    fontSize: 14,
    marginTop: 10,
    color: '#555',
  },
});

export default BottomSlider;