import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<{ _id: string; title: string; body: string; timestamp: string }[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://campus-connect-app-backend.onrender.com/notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationsScreen;

