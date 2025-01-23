import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

interface AuthContextType{
  isLoggedIn:boolean;
  setIsLoggedIn:(value:boolean)=>void;
  loadAuthState:()=>void;
}

export const AuthContext=createContext<AuthContextType>({
  isLoggedIn:false,
  setIsLoggedIn:()=>{},
  loadAuthState:()=>{}
});

export default function AuthProvider({children}:{children:ReactNode}){
  const [isLoggedIn, setIsLoggedIn]=useState(false);

  
  const loadAuthState=async()=>{
    const token=await SecureStore.getItemAsync("authToken");
    console.log("AUTH TOKEN RETRIEVED",token);
    if(token){
      setIsLoggedIn(true);
    }
    console.log("STATE UPDATED",isLoggedIn)
  }

  useEffect(()=>{
    loadAuthState();
  },[loadAuthState])

  return(
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,loadAuthState}}>
      {children}
    </AuthContext.Provider>
  );
}
