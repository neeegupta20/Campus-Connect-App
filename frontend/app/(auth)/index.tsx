import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function HomePage(){
    
    const router=useRouter();
    
    const navigateToLogin=()=>{
        router.push('/(auth)/login');
    };

    const navigateToSignUp=()=>{
        router.push('/(auth)/chooseAvatar');
    };
    const navigateToHome=()=>{
        router.push('/(tabs)');
    };

    return(
        <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1,height:1000}}>
            <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../../assets/images/logowhite.png')} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={{color:"white",marginBottom:15,fontWeight:'bold'}}>OR</Text>
                <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={navigateToSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={{color:"white",marginBottom:15,fontWeight:'bold'}}>OR</Text>
                <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={navigateToHome}>
                    <Text style={styles.buttonText}>Continue as Guest</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2025 Campus Connect</Text>
            </View>
        </SafeAreaView>
        </ImageBackground>
    );
};


const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    },
    header:{
        alignItems:'center',
        marginBottom: 60,
    },
    logo:{
        marginTop:120,
        width:350,
        height:100,
    },
    subtitle: {
        color:'white',
        fontSize: 16,
        marginTop:40,
        textAlign:'center',
        paddingHorizontal:40,
    },
    buttonContainer:{
        width:'100%',
        alignItems:'center',
    },
    button:{
        width:'80%',
        paddingVertical:15,
        backgroundColor:'#63D0D8',
        borderRadius:12,
        marginBottom:20,
        alignItems:'center',
        justifyContent:'center',
    },
    signUpButton: {
        backgroundColor:'#63D0D8',
    },
    buttonText:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold',
    },
    footer:{
        marginTop:40,
        alignItems:'center',
    },
    footerText:{
        color:'#888',
        fontSize:14,
    },
});
