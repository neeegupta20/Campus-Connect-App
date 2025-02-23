import { useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import UserProvider, { UserContext } from "./context/UserContext";
import { StyleSheet } from "react-native";
import SplashScreen from "@/components/SplashScreen";
import LottieView from "lottie-react-native";
import { EventProvider } from "./context/EventContext";
import { ZoneProvider } from "./context/ZonesContext";

function RootLayoutInner() {
    const { user, fetchUserProfile } = useContext(UserContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    useEffect(()=>{
        const timeout=setTimeout(()=>{
            setIsLoading(false);
        },4250);
        return()=>clearTimeout(timeout);
    }, []);

    useEffect(()=>{
        if (!isLoading){
            const initializeAuth=async()=>{
                await fetchUserProfile();
                setHasCheckedAuth(true);
            };
            initializeAuth();
        }
    }, [isLoading]);

    useEffect(() => {
        if (hasCheckedAuth){
            setTimeout(()=>{
                if(user){
                    router.replace("/(tabs)");
                }else{
                    router.replace("/(auth)");
                }
            },250);
        }
    }, [hasCheckedAuth]);

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
        top: 300,
    },
});
