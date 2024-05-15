import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddPostScreen from'../Screens/AddPostScreen';

import { AntDesign } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenNav from './ExploreScreenNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
   <Tab.Navigator     screenOptions={{
    headerShown:false
}}>
    <Tab.Screen name='home' component={HomeScreenStackNav}
    options={{tabBarLabel:({color})=>(
        <Text style={{color:color, fontSize:12, marginBottom:3}}>Home</Text>
        ),
        tabBarIcon: ({color,size})=>(
            <AntDesign name="home" size={size} color={color} />
        )
        }}
    />
    <Tab.Screen name="explore" component={ExploreScreenNav}
     options={{tabBarLabel:({color})=>(
        <Text style={{color:color, fontSize:12, marginBottom:3}}>Explore</Text>
        ),
        tabBarIcon: ({color,size})=>(
            <AntDesign name="search1" size={size} color={color} />
        )
        }}
    />
    <Tab.Screen name="addpost" component={AddPostScreen}
     options={{tabBarLabel:({color})=>(
        <Text style={{color:color, fontSize:12, marginBottom:3}}>Add</Text>
        ),
        tabBarIcon: ({color,size})=>(
            <AntDesign name="camerao" size={size} color={color} />
        )
        }}

    />


    <Tab.Screen name="profile" component={ProfileScreenStackNav}
     options={{tabBarLabel:({color})=>(
        <Text style={{color:color, fontSize:12, marginBottom:3}}>Profile</Text>
        ),
        tabBarIcon: ({color,size})=>(
            <AntDesign name="user" size={size} color={color}/>
        )
        }}
    />
   </Tab.Navigator>
  )
}