// import React, { useEffect, useState } from "react"
// import { View, StyleSheet, FlatList, Text} from "react-native"
// import AsyncStorage from "@react-native-async-storage/async-storage"


// const NotificationScreen = () => {
//     const [notifications, setNotifications] = useState<any[]>([])

//     useEffect(() => {
//         async function loadStoredNotification() {
//             let storedNotification = await AsyncStorage.getItem("notifications")
//             if(storedNotification){
//                 setNotifications(JSON.parse(storedNotification))
//             }
//         }
//         loadStoredNotification()
//     }, [])


//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Notifications!!</Text>
//             {notifications.length === 0 ? (
//                 <Text style={styles.emptyText}>No notifications available</Text>
//             ) : (
//                 <FlatList
//                     data={notifications}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({item}) => (
//                         <View style={styles.notificationItem}>
//                             <Text style={styles.notificationTitle}>{item.title}</Text>
//                             <Text style={styles.notificationBody}>{item.body}</Text>
//                         </View>
//                     )}
//                 />
//             )}
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//     title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//     emptyText: { textAlign: "center", color: "gray" },
//     notificationItem: {
//         padding: 15,
//         marginBottom: 10,
//         backgroundColor: "#f5f5f5",
//         borderRadius: 10,
//     },
//     notificationTitle: { fontSize: 16, fontWeight: "bold" },
//     notificationBody: { fontSize: 14, color: "gray" },
// });

// export default NotificationScreen