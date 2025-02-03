import { useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import UserProvider, { UserContext } from "./context/UserContext";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "@/components/SplashScreen";

function RootLayoutInner(){
    const { user, fetchUserProfile }=useContext(UserContext);
    const router=useRouter();
    const [hasCheckedAuth, setHasCheckedAuth]=useState(false);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        },4250);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const initializeAuth = async () => {
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

    if (isLoading) {
        return <SplashScreen />;
    }

    if (!hasCheckedAuth){
        return(
            <SafeAreaView style={styles.errorContainer}>
                <Ionicons name="bug-outline" size={30} color="red"></Ionicons>
                <Text style={{fontSize:20, marginTop:10}}>NETWORK ERROR</Text>
            </SafeAreaView>
        )
    }

    return <Slot/>;
}

export default function RootLayout() {
    return (
        <UserProvider>
            <RootLayoutInner />
        </UserProvider>
    );
}

const styles=StyleSheet.create(
    {
        errorContainer:{
            alignItems:'center',
            marginTop:350
        }
    }
);