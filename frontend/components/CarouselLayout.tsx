import { Dimensions, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useRef, useEffect } from 'react'
import { useFonts,Roboto_500Medium,Roboto_700Bold,Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { Literata_400Regular,Literata_500Medium,Literata_700Bold } from '@expo-google-fonts/literata';
import { Poppins_400Regular,Poppins_500Medium,Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useCarousel } from '../app/context/CarouselContext';
import LottieView from 'lottie-react-native';
import loaderWhite from '../assets/loaderWhite.json';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';

const width = Dimensions.get('screen').width*0.8;


export default function CarouselLayout(){
  const {items, loading}=useCarousel();
  const [imageLoading, setImageLoading]=useState(true)
  const [fontsLoaded]=useFonts({
          Roboto_500Medium,Roboto_700Bold,Roboto_400Regular,Montserrat_400Regular,Montserrat_500Medium,Montserrat_700Bold,Literata_400Regular,Literata_500Medium,Literata_700Bold,Poppins_400Regular,Poppins_500Medium,Poppins_700Bold
  })

  if(loading){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:"black"}}>
                <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
            </SafeAreaView>
        )
    }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.text}>What's New Around Campus</Text>
      </View>
      <Carousel
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
        data={items} 
        width={width}
        pagingEnabled
        height={200}
        renderItem={({item}) => (
          <View style={[styles.carouselBox, {marginRight: 17}]}>
            {imageLoading && (
              <View style={{height: 158, width: "100%", alignItems: 'center'}}>
                <LottieView
                  source={require('../assets/loaderWhite.json')}
                  autoPlay
                  loop
                  style={{height: 80}}
                />
              </View>
            )}

            <Image style={styles.carouselImage} source={{uri:item?.imageUrl}} onLoadEnd={()=>{setImageLoading(false)}}></Image>
            <LinearGradient
              colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)']}
              style={styles.backgroundGradient}
              />
              <View style={styles.button}>
                <TouchableOpacity onPress={()=>console.log('Button Pressed')}>
                  <Text style={styles.buttonText}>Explore Now</Text>
                </TouchableOpacity>
              </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text:{
    fontFamily: "Literata_500Medium",
    color: 'white',
    fontSize: 20,
  },
  container:{
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    height: 220,
    borderRadius: 20,
  },
  heading:{
     alignItems: "center",
  },
  carouselBox:{
    height:158,
    top: 15,
    width: width,
    overflow: "hidden",
  },
  carouselImage:{
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title:{
    color: "white",
    top: -140,
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    marginLeft: 10,
  },
  subtitle:{
    color: "white",
    top: -130,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    marginLeft: 10,
  },
  loaderIcon:{
    top: 20,
    height: 40
  },
  backgroundGradient: {
    height: 158,
    position: 'absolute',
    borderRadius: 20,
    justifyContent: "space-between",
  },
  button:{
    alignSelf: "flex-end",
    marginRight: 10,
    top: -30,
    backgroundColor:"#63D0D8",
    borderRadius:16,
    marginVertical: -20,
    width: 100,
    height: 40
  },
  buttonText:{
    color: "black",
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    lineHeight: 40,
  }
})

