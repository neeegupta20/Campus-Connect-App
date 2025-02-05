import { Stack } from "expo-router";

export default function AccountsLayout(){
    return(
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="tickets"/>
            <Stack.Screen name="changePassword"/>
            <Stack.Screen name="editAvatar"/>
            <Stack.Screen name="privacyPolicy"/>
            <Stack.Screen name="contactUs"/>
        </Stack>
    )
}