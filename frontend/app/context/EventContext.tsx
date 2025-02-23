import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Event {
  id:number;
  title: string;
  shortDescription: string;
  date: string;
  time: string;
  description: string;
  venue: string;
  place: string;
  photo1: string;
  tags: string[];
  formatDate: string;
  price: number;
}


interface EventContextType{
  events:Event[];
  loading:boolean;
}


const EventContext=createContext<EventContextType>({
  events:[],
  loading:true,
});


export const EventProvider:React.FC<{ children: ReactNode }>=({ children })=>{
  const [events,setEvents]=useState<Event[]>([]);
  const [loading,setLoading]=useState<boolean>(true);

  
  const fetchEvents=async()=>{
    try{
      const response=await axios.get("https://campus-connect-app-backend.onrender.com/fetch-events");
      setEvents(response.data);
    } catch(error){
      console.error(error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{events,loading}}>
      {children}
    </EventContext.Provider>
  );
};


export const useEvent=()=>useContext(EventContext);
