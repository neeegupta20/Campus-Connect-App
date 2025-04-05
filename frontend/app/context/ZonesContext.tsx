import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Zones {
  id:number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  time:string;
  date:string;
  venue:string;
}


interface ZoneContextType{
  zones:Zones[];
  loading:boolean;
}


const ZoneContext=createContext<ZoneContextType>({
  zones :[],
  loading:true,
});


export const ZoneProvider:React.FC<{ children: ReactNode }>=({ children })=>{
  const [zones,setZones]=useState<Zones[]>([]);
  const [loading,setLoading]=useState<boolean>(true);

  

  useEffect(()=>{
    const fetchZone=async()=>{
      try{
        const response=await axios.get("https://campus-connect-app-backend.onrender.com/fetch-zones");
        setZones(response.data);
      } catch(error){
        console.error(error);
      } finally{
        setLoading(false);
      }
    };
    fetchZone();
  }, []);

  return (
    <ZoneContext.Provider value={{zones,loading}}>
      {children}
    </ZoneContext.Provider>
  );
};


export const useZone=()=>useContext(ZoneContext);
