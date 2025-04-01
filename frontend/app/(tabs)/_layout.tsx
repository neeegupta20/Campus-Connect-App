import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout(){ 
    return(
        <View style={{flex:1}}>
            <Tabs
            screenOptions={({ route }: { route: any }) => ({
            tabBarActiveTintColor:"#63D0D8",
            headerShown:false,
            tabBarStyle:
                {
                    backgroundColor:"black",
                    borderTopWidth:0,
                }
            })}
            >
                <Tabs.Screen name="index" 
                    options={{title:"Home",headerShown:false, 
                    tabBarIcon:({color}:{color:string})=><Ionicons name="home-outline" size={30} color={color}/>
                    }}>
                </Tabs.Screen>
                <Tabs.Screen name="connectzones" 
                    options={{title:"Connect Zones",
                    tabBarIcon:({color}:{color:string})=><Ionicons name="people-outline" size={32} color={color}/>
                    }}>
                </Tabs.Screen>
                <Tabs.Screen name="event"
                    options={{title:"Events",
                    tabBarIcon:({color}:{color:string})=><Ionicons name="beer-outline" size={30} color={color}/>
                    }}>
                </Tabs.Screen>
                <Tabs.Screen name="profile" 
                    options={{title:"Account",
                    tabBarIcon:({color}:{color:string})=><Ionicons name="person-outline" size={30} color={color}/>
                    }}>
                </Tabs.Screen>
            </Tabs>
        </View>
    )
}
