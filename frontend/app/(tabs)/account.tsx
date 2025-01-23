import { useContext } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function Account(){

    const {setIsLoggedIn}=useContext(AuthContext);
    const router=useRouter();

    return<SafeAreaView>
        <Button onPress={async()=>
            {
                await SecureStore.deleteItemAsync("authToken");
                setIsLoggedIn(false)
                router.navigate('/(auth)')
            }}title="Logout"></Button>
        <Text>ACCOUNT PAGE</Text>
    </SafeAreaView>
}