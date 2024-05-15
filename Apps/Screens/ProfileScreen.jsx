import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import diary from'./../../assets/images/diary.png'
import logout from'./../../assets/images/logout.png'
import search from'./../../assets/images/search.png'
import { useNavigation } from '@react-navigation/native'


export default function ProfileScreen() {
  const {user}=useUser();
  const navigation=useNavigation();
  const {isLoaded,signOut} = useAuth();
  const menuList=[
    {
      id:1,
      name:'My Products',
      icon:diary,
      path:'my-product'
    },
    {
      id:2,
      name:'Logout',
      icon:logout
    },
    {
      id:3,
      name:'Explore',
      icon:search,
      path:'explore'

    }

    
  ]
  const onMenuPress=(item)=>{
    if(item.name=='Logout')
      {
        signOut();
        return;

      }
      item?.path?navigation.navigate(item.path):null;
  }
  

  return (
    <View>
      <View className="items-center mt=15">
      
      <Image source={{uri:user?.imageUrl}} className=" m-10 w-[100px] h-[100px] rounded-full"/> 
   <Text className="font-bold text-[25px]">{user?.fullName}</Text>
   <Text className="font-bold text-[25px]">{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
    <FlatList data={menuList}
    numColumns={3}
    renderItem={({item,index})=>(

      <TouchableOpacity className="flex-1 p-5 " onPress={()=>onMenuPress(item)}>
        {item.icon&& <Image source={item?.icon} className="w-[110px] h-[110px]"/>}
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )}/>
    </View>
  )
}