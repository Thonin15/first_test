import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function Slider({sliderLists}) {
  return (
    <View>
     <FlatList
     data={sliderLists}
     horizontal={true}
    
     renderItem={({item,index})=>(
        <View>
           <Image source={{uri:item?.image}}
           className="h-[200px] w-[330px]"/>
        </View>
     )}
     />
    </View>
  )
}