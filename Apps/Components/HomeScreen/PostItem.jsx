import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {
  const navigation=useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.push('product-detail',
      {
        product:item
      }
    )} style={{ flex: 1, margin: 5 }} className=" p-1 rounded-lg border-[1px] border-slate-200">
    <Image
      source={{ uri: item.image }}
      style={{ width: '100%', height: 160 }} // Adjust dimensions
    />
    <View style={{ marginTop: 5 }}>
    <Text style={{ fontSize: 12,}} className="text-green-500">{item.category}</Text>
      <Text style={{ fontSize: 17 }}>{item.title}</Text>
      <Text style={{ fontSize: 17 }}>{item.price} $</Text>
    </View>
  </TouchableOpacity>
  )
}