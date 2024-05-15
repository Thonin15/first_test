import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItem from '../Components/HomeScreen/LatestItem';

export default function ItemList() {
    const {params} =useRoute();
    const db=getFirestore(app)
    const [itemList,setItemList]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
       params&&getItemListByCategory();
    },[params])

    const getItemListByCategory=async()=>{
      setItemList([]);
      setLoading(true)
        const q=query(collection(db,'UserPost'),where('category','==',params.category));
        const snapshot=await getDocs(q);
        setLoading(false)
        snapshot.forEach(doc=>{
            console.log(doc.data());
            setItemList(itemList =>[...itemList,doc.data()]);
            setLoading(false)
        })
    }
  return (
    <View>
    {loading?
      <ActivityIndicator size='large' />
      :
     itemList?.length>0? <LatestItem latestItemList={itemList}/>
    :<Text className="p-5">No Post Found</Text> 
    }
    </View>
  )
}