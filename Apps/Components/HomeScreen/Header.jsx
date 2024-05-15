import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import {useUser} from '@clerk/clerk-expo'


export default function Header() {
    const {user}=useUser();
  return (
    <View>

    <View className="flex flex-row items-center gap-2">
      <Image source ={{uri:user?.imageUrl}}
      className="rounded-full w-12 h-12" 
      />
    
    <View>
        <Text className="text-[16px]">Welcome</Text>
        <Text className="text-[20px]">{user?.fullName}</Text>
    </View>
</View>
<View className="p-3 px-5 bg-white rounded-full flex flex-row items-center">
    <TextInput placeholder='search'className="ml-2 text-[18px]" 
    onChangeText={(value) => console.log(value)}
    />
</View>
    </View>
  )
}