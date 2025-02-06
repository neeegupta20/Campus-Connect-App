import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface User{
    name:string;
    email:string;
    _id:string;
    avatar:string;
    telno:number
}

interface UserContextType{
    user:User|null;
    setUser:(user:User|null)=>void;
    fetchUserProfile:()=>Promise<void>;
    logout:()=>Promise<void>;
}

export const UserContext=createContext<UserContextType>({
    user:null,
    setUser:()=>{},
    fetchUserProfile:async()=>{},
    logout:async()=>{},
});

export default function UserProvider({children} : {children:ReactNode}){
    const [user,setUser]=useState<User|null>(null);

    const fetchUserProfile=useCallback(async()=>{
        const token=await SecureStore.getItemAsync('authToken');
        if (!token){
            setUser(null);
            return;
        }
        try{
            const response=await axios.get('http://172.16.37.126:3000/profile',{
                headers: { Authorization: `Bearer ${token}` },
            });
            if(response.status===200){
                setUser(response.data);
            }
        }catch(error){
            await SecureStore.deleteItemAsync('authToken');
            setUser(null);
        }
    },[]);

    const logout=async()=>{
        await SecureStore.deleteItemAsync('authToken');
        setUser(null);
    };

    useEffect(()=>{
        fetchUserProfile();
    },[fetchUserProfile]);

    return(
        <UserContext.Provider value={{ user, setUser, fetchUserProfile, logout }}>
            {children}
        </UserContext.Provider>
    );
}
