import { useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import UserProvider, { UserContext } from "./context/UserContext";
import { StyleSheet } from "react-native";
import SplashScreen from "@/components/SplashScreen";
import LottieView from "lottie-react-native";
import { EventProvider } from "./context/EventContext";
import { ZoneProvider } from "./context/ZonesContext";

function RootLayoutInner(){
    const {user,fetchUserProfile}=useContext(UserContext);
    const router=useRouter();
    const [isLoading, setIsLoading]=useState(true);
    const [hasCheckedAuth, setHasCheckedAuth]=useState(false);
    const [navigationDone, setNavigationDone]=useState(false);

    useEffect(()=>{
        const splashTimeout=setTimeout(()=>{
            setIsLoading(false);
        },4250);
        return()=>clearTimeout(splashTimeout);
    }, []);

    useEffect(()=>{
        if(!isLoading){
            const initializeAuth=async()=>{
                await fetchUserProfile();
                setHasCheckedAuth(true);
            };
            initializeAuth();
        }
    },[isLoading]);

    useEffect(() => {
        if (!isLoading &&hasCheckedAuth && !navigationDone) {
            const destination = user ? "/(tabs)" : "/(auth)";
            router.replace(destination);
            setNavigationDone(true);
        }
    }, [isLoading,hasCheckedAuth, navigationDone]);

    if(isLoading){
        return <SplashScreen/>;
    }

    if (!hasCheckedAuth){
        return (
            <SafeAreaView style={styles.errorContainer}>
                <LottieView
                    source={require("../assets/loaderWhite.json")}
                    autoPlay
                    loop
                    style={styles.loaderIcon}
                />
            </SafeAreaView>
        );
    }

    return <Slot/>;
}

export default function RootLayout() {
    return (
        <UserProvider>
            <ZoneProvider>
            <EventProvider>
                <RootLayoutInner />
            </EventProvider>
            </ZoneProvider>
        </UserProvider>
    );
}

const styles=StyleSheet.create({
    errorContainer: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"black"
    },
    loaderIcon: {
        width: 60,
        height: 60,
        alignSelf: "center",
    },
});
