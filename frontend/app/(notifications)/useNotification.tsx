import {Alert } from 'react-native'
import * as Notifications from "expo-notifications";
import * as SecureStore from 'expo-secure-store'

export default async function registerForPushNotificationsAsync() {
    let {status}=await Notifications.getPermissionsAsync();
    
    if(status!=='granted'){
        const { status: newStatus }=await Notifications.requestPermissionsAsync();
        if (newStatus!=='granted') {
            Alert.alert("PERMISSION DECLINED.");
            return;
        }
    }

    const token=(await Notifications.getExpoPushTokenAsync()).data;
    
    await SecureStore.setItemAsync('expoPushToken', token);
    return token;
}

