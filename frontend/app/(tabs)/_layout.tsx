import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from "react-native";

export default function TabLayout(){ 
    return(
        <View style={{flex:1}}>
            <Tabs
            screenOptions={({ route })=>({
            tabBarActiveTintColor:"#63D0D8",
            headerShown:false,
            tabBarStyle:route.name==="index"
            ? {
                position:"absolute",
                backgroundColor:"transparent",
                borderTopWidth:0,
              }
            : {
                backgroundColor:"black",
                borderTopWidth:0,
              },
            })}
            >
                <Tabs.Screen name="index" 
                    options={{title:"Home",headerShown:false, 
                    tabBarIcon:({color}:{color:string})=><FontAwesome size={34} name="home" color={color}/>
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
                <Tabs.Screen name="profile" 
                    options={{title:"Account",
                    tabBarIcon:({color}:{color:string})=><FontAwesome size={28} name="user-circle-o" color={color}/>
                    }}>
                </Tabs.Screen>
            </Tabs>
        </View>
    )
}
