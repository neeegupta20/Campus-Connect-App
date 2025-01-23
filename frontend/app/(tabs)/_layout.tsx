import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout(){ 
    return <Tabs screenOptions={{tabBarActiveTintColor:"#63D0D8",headerShown:false,tabBarStyle:{backgroundColor:"black",paddingTop:8}}}>
        <Tabs.Screen name="index" 
            options={{title:"Home",headerShown:false, 
            tabBarIcon:({color}:{color:string})=><FontAwesome size={28} name="home" color={color}/>
            }}>
        </Tabs.Screen>
        <Tabs.Screen name="connectzones" 
            options={{title:"Connect Zones",
            tabBarIcon:({color}:{color:string})=><FontAwesome size={28} name="users" color={color}/>
            }}>
        </Tabs.Screen>
        <Tabs.Screen name="event"
            options={{title:"Events",
            tabBarIcon:({color}:{color:string})=><FontAwesome size={24} name="calendar" color={color}/>
            }}>
        </Tabs.Screen>
        <Tabs.Screen name="account" 
            options={{title:"Account",
            tabBarIcon:({color}:{color:string})=><FontAwesome size={28} name="user-circle-o" color={color}/>
            }}>
        </Tabs.Screen>
    </Tabs>
}