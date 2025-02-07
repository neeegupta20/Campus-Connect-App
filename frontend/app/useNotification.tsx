import {Alert, Platform} from 'react-native'
import * as Notifications from "expo-notifications";
import * as SecureStore from 'expo-secure-store'

export async function registerForPushNotificationsAsync() {
    let { status } = await Notifications.getPermissionsAsync();
    
    if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
            Alert.alert("Permission Denied", "You will not receive notifications.");
            return;
        }
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log("Expo Push Token:", token);
    
    await SecureStore.setItemAsync('expoPushToken', token);
    return token;
}

