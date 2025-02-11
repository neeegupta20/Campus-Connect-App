import { useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import UserProvider, { UserContext } from "./context/UserContext";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "@/components/SplashScreen";
import LottieView from "lottie-react-native";

function RootLayoutInner(){
    
    const { user, fetchUserProfile }=useContext(UserContext);
    const router=useRouter();
    const [hasCheckedAuth, setHasCheckedAuth]=useState(false);
    const [isLoading,setIsLoading]=useState(true);

    // useEffect(()=>{
    //     const timeout=setTimeout(()=>{
    //         setIsLoading(false);
    //     },4250);
    //     return ()=>clearTimeout(timeout);
    // }, []);

    useEffect(()=>{
        if (!isLoading){
            const initializeAuth=async()=>{
                await fetchUserProfile();
                setHasCheckedAuth(true);
            };
            initializeAuth();
        }
    }, [isLoading]);

    useEffect(()=>{
        if (hasCheckedAuth) {
            if(user){
                router.replace("/(tabs)");
            }else{
                router.replace("/(auth)");
            }
        }
    },[user,hasCheckedAuth]);

    // if (isLoading) {
    //     return <SplashScreen />;
    // }

    if (!hasCheckedAuth){
        return(
            <SafeAreaView style={styles.errorContainer}>
                <LottieView source={"frontend/assets/loaderWhite.json"} autoPlay loop style={styles.loaderIcon}/>
            </SafeAreaView>
        )
    }

    return <Slot/>;
}

export default function RootLayout(){
    return (
        <UserProvider>
            <RootLayoutInner/>
        </UserProvider>
    );
}

const styles=StyleSheet.create(
    {
        errorContainer:{
            alignItems:'center',
            marginTop:350,
            justifyContent: "center"
        },
        loaderIcon:{
            width: 60,
            height: 60,
            alignSelf:"center",
            top: 300
        }
    }
);