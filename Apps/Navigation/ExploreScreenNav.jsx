import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../Screens/ExploreScreen';
import ProductDetail from '../Screens/ProductDetail';

const Stack=createStackNavigator();
export default function ExploreScreenNav() {
  return (
    <Stack.Navigator>
   <Stack.Screen name="explore-tab" component={ExploreScreen}/>
   <Stack.Screen name="product-detail" component={ProductDetail}
   options={{
    headerStyle:{
        backgroundColor:'#3b82f6',
    },
    headerTintColor:'#ffff',
  
   }}/>
   </Stack.Navigator>
  )
}