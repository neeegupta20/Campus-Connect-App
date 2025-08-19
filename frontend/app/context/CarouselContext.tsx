// import React, { ReactNode, useState, createContext, useEffect, useContext } from 'react'
// import axios from 'axios';


// interface CarouselItem{
//     id: number;
//     title: string;
//     imageUrl: string;
//     description: string;
//     subtitle: string;
// }

// interface CarouselContextType{
//     items: CarouselItem[];
//     loading: boolean;
// }

// export const CarouselContext=createContext<CarouselContextType>({
//     items: [],
//     loading: true,
// })

// export const CarouselProvider:React.FC<{ children: ReactNode }>=({children})=>{
//     const [items, setItems]=useState<CarouselItem[]>([]);
//     const [loading, setLoading]=useState<boolean>(true);

//     const fetchCarousel=async()=>{
//         try {
//             const response = await axios.get("https://campus-connect-app-backend.onrender.com/fetch-carousel");
//             setItems(response.data)
//         } catch (error) {
//             console.error(error)
//         } finally{
//             setLoading(false);
//         }
//       };

//     useEffect(() => {
//       fetchCarousel();
//     }, [])

//     return(
//         <CarouselContext.Provider value={{items, loading}}>
//             {children}
//         </CarouselContext.Provider>
//     )
// }


// export const useCarousel=()=>useContext(CarouselContext)

