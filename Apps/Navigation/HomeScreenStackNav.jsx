import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={HomeScreen} 
      options={{headerShown:false}}
      />
      <Stack.Screen name='item-list' component={ItemList} 
      options={({route}) => ({title: route.params.category,
        headerStyle:{
            backgroundColor:'#3b82f6',
        },
        headerTintColor:'#ffff',
        headerTitle:'Detail',
      })}
      
      
      />

      <Stack.Screen name='product-detail' component={ProductDetail} 
      options={{
        headerStyle:{
          backgroundColor:'#3b82f6',
        },
        headerTintColor:'#ffff'
      }}
      
      
      />
    </Stack.Navigator>
  );
}
