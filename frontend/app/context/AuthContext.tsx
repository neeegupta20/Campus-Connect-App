import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

interface AuthContextType{
  isLoggedIn:boolean|undefined;
  setIsLoggedIn:(value:boolean)=>void;
  loadAuthState:()=>void;
}

export const AuthContext=createContext<AuthContextType>({
  isLoggedIn:false,
  setIsLoggedIn:()=>{},
  loadAuthState:()=>{}
});

export default function AuthProvider({children}:{children:ReactNode}){
  const [isLoggedIn,setIsLoggedIn]=useState<boolean|undefined>(undefined);

  
  const loadAuthState=async()=>{
    const token=await SecureStore.getItemAsync("authToken");
    setIsLoggedIn(!!token);
  }

  useEffect(()=>{
    loadAuthState();
  },[])

  return(
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,loadAuthState}}>
      {children}
    </AuthContext.Provider>
  );
}
