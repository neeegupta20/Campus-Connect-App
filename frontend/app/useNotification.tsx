// import { useState, useEffect, useRef } from "react";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";
// import { Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const usePushNotification = () => {
//     Notifications.setNotificationHandler({
//         handleNotification: async () => ({
//             shouldPlaySound: true,
//             shouldShowAlert: true,
//             shouldSetBadge: false,
//         }),
//     });

//     const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
//     const [notifications, setNotifications] = useState<any[]>([]);

//     const notificationListener = useRef<Notifications.Subscription | null>(null);
//     const responseListener = useRef<Notifications.Subscription | null>(null);

//     async function saveNotifications(notification: Notifications.Notification) {
//         try {
//             console.log("Notification received:", notification);

//             let storedNotification = await AsyncStorage.getItem("notifications");
//             let notificationArray = storedNotification ? JSON.parse(storedNotification) : [];

//             notificationArray.unshift(notification.request.content);
//             await AsyncStorage.setItem("notifications", JSON.stringify(notificationArray));

//             setNotifications((prev) => [notification.request.content, ...prev]);
//             console.log("Notification saved successfully!");
//         } catch (error) {
//             console.log("Error saving notification:", error);
//         }
//     }

//     async function registerForPushNotificationAsync() {
//         if (!Device.isDevice) {
//             console.log("Push notifications only work on real devices.");
//             return;
//         }

//         const { status: existingStatus } = await Notifications.requestPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== "granted") {
//             const { status } = await Notifications.requestPermissionsAsync();
//             finalStatus = status;
//         }

//         if (finalStatus !== "granted") {
//             console.log("Failed to get push notification permission.");
//             return;
//         }

//         const token = (
//             await Notifications.getExpoPushTokenAsync({
//                 projectId: Constants.expoConfig?.extra?.eas?.projectId,
//             })
//         ).data;

//         setExpoPushToken(token);

//         let storedTokens = await AsyncStorage.getItem("expoPushTokens");
//         let tokenArray = storedTokens ? JSON.parse(storedTokens) : [];

//         if (!tokenArray.includes(token)) {
//             tokenArray.push(token);
//             await AsyncStorage.setItem("expoPushTokens", JSON.stringify(tokenArray));
//         }

//         if (Platform.OS === "android") {
//             await Notifications.setNotificationChannelAsync("default", {
//                 name: "default",
//                 importance: Notifications.AndroidImportance.MAX,
//                 vibrationPattern: [0, 250, 250, 250],
//                 lightColor: "#FF231F7C",
//             });
//         }
//     }

//     useEffect(() => {
//         registerForPushNotificationAsync();

//         notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
//             console.log("Notification received in listener:", notification);
//             saveNotifications(notification);
//         });

//         responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
//             console.log("Notification response received:", response);
//         });

//         return () => {
//             if (notificationListener.current) {
//                 Notifications.removeNotificationSubscription(notificationListener.current);
//             }
//             if (responseListener.current) {
//                 Notifications.removeNotificationSubscription(responseListener.current);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         async function loadSavedNotifications() {
//             try {
//                 let storedNotification = await AsyncStorage.getItem("notifications");
//                 console.log("Loaded saved notifications:", storedNotification);

//                 if (storedNotification) {
//                     setNotifications(JSON.parse(storedNotification));
//                 }
//             } catch (error) {
//                 console.log("Error loading saved notifications:", error);
//             }
//         }
//         loadSavedNotifications();
//     }, []);

//     return { expoPushToken, notifications };
// };



//------------------------------------
// NEW CODE

