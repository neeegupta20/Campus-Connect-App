import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen(){
  
    return(
        <View style={styles.container}>
            <LottieView
                source={require("../assets/splash.json")} 
                autoPlay loop={false}
                style={styles.animation}
            />
        </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"black",
  },
  animation:{
    width:600,
    height:1000,
  },
});
