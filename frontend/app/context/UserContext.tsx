import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface User{
    name:string;
    email:string;
    _id:string;
    likedEvents:number[];
    likedRestaurants:number[];
}

interface UserContextType{
  user:User|null;
  setUser:(user:User|null)=>void;
  fetchUserProfile:()=>void;
}

export const UserContext=createContext<UserContextType>({
  user:null,
  setUser:()=>{},
  fetchUserProfile:()=>{},
});


export default function UserProvider({children}:{children:ReactNode}){
    
    const [user,setUser]=useState<User|null>(null);
    
    const fetchUserProfile=useCallback(async()=>{
        const token=await SecureStore.getItemAsync('authToken');
        if(!token){
            return;
        }
        try{
            const response=await axios.get('http://172.16.34.36:3000/profile',{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            if(response.status===200){
                setUser(response.data);
            }
        }catch(error){
            console.error(error);
            setUser(null);
        }
    },[]);

    useEffect(()=>{
        fetchUserProfile();
    },[fetchUserProfile]);

  return(
    <UserContext.Provider value={{user,setUser,fetchUserProfile}}>
      {children} 
    </UserContext.Provider>
  );
}



