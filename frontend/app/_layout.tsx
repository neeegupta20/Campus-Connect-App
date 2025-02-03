import { useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import UserProvider, { UserContext } from "./context/UserContext";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function RootLayoutInner(){
    const { user,fetchUserProfile }=useContext(UserContext);
    const router=useRouter();
    const [hasCheckedAuth,setHasCheckedAuth]=useState(false);

    useEffect(()=>{
        const initializeAuth=async()=>{
            await fetchUserProfile();
            setHasCheckedAuth(true);
        };
        initializeAuth();
    }, []);

    useEffect(()=>{
        if(hasCheckedAuth){
            if(user){
                router.replace("/(tabs)");
            } 
            else{
                router.replace("/(auth)");
            }
        }
    },[user,hasCheckedAuth]);

    if(!hasCheckedAuth){
        return(
            <SafeAreaView style={styles.errorContainer}>
                <Ionicons name="bug-outline" size={30} color="red"></Ionicons>
                <Text style={{fontSize:20,marginTop:10}}>NETWORK ERROR</Text>
            </SafeAreaView>
        )
    }

    return <Slot/>;
}

export default function RootLayout() {
    return(
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
        },
    }
);