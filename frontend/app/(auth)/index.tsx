import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function HomePage(){
    
    const router=useRouter();
    const navigateToLogin=()=>{
        router.push('/(auth)/login');
    };

    const navigateToSignUp = () => {
        router.push('/(auth)/chooseAvatar');
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../../assets/images/logo.jpg')} />
                <Text style={styles.subtitle}>YOUR GO-TO CONNECTING PLATFORM</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={{color:"white",marginBottom:15,fontWeight:'bold'}}>OR</Text>
                <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={navigateToSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2025 Campus Connect</Text>
            </View>
        </SafeAreaView>
    );
};


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        justifyContent: 'center',
        alignItems: 'center',
        padding:20,
    },
    header:{
        alignItems:'center',
        marginBottom: 60,
    },
    logo: {
        width:300,
        height:80,
        marginBottom:20,
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
