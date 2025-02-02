import { useState, useEffect } from "react";
import AuthProvider from "./context/AuthContext";
import RootLayout from "./RootLayout";
import SplashScreen from "@/components/SplashScreen";

export default function App(){
    
    const [isLoading,setIsLoading]=useState(true);

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setIsLoading(false);
    //     },4550);
    // },[]);

    // if(isLoading){
    //     return <SplashScreen />;
    // }
    return(
        <AuthProvider>
            <RootLayout/>
        </AuthProvider>
    )
}