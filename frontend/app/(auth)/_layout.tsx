import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout(){
    return(
    
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="chooseAvatar"/>
            <Stack.Screen name="enterName"/>
            <Stack.Screen name="enterPhoneNo"/>
            <Stack.Screen name="enterEmail"/>
            <Stack.Screen name="OTPVerify"/>
            <Stack.Screen name="login"/>
            <Stack.Screen name="forgotPassword"/>
            <Stack.Screen name="enterNewPassword"/>
        </Stack>
    );
}
