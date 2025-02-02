import { useContext, useEffect, useState } from "react";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { Stack } from "expo-router";
import UserProvider from "./context/UserContext";
import { Text } from "react-native";

export default function RootLayout(){
    
    const {isLoggedIn,loadAuthState}=useContext(AuthContext);

    useEffect(()=>{
        loadAuthState();
    },[]);

    if(isLoggedIn===undefined){
        return(
            <Text>LOADING...</Text>
        )
    }
    
    return(
        <UserProvider>
            <Stack screenOptions={{headerShown:false}}>
                {!isLoggedIn ? (
                    <Stack.Screen
                        name='(auth)'
                    />
                ):(
                    <Stack.Screen
                        name="(tabs)"
                    />
                )}    
            </Stack>
        </UserProvider>
    )
}