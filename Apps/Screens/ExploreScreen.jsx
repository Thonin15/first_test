import { View, Text,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where,orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItem from '../Components/HomeScreen/LatestItem';

export default function ExploreScreen() {

  const db=getFirestore(app)
  const [productList,setproductList]=useState([]);
  useEffect(()=>{
    getAllProducts();

  },[])
  const getAllProducts=async()=>{
    setproductList([]);
    const q=query(collection(db,'UserPost'),orderBy('createdAt','desc'))
    const snapshot=await getDocs(q);
    snapshot.forEach((doc)=>{
      console.log(doc.data());
      setproductList(productList=>[...productList,doc.data()]);
    })
  }

  return (
    <ScrollView>
      <Text>Explore More</Text>
      <LatestItem latestItemList={productList}/>
    </ScrollView>
  )
}