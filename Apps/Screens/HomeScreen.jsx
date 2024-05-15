import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import Categories from '../Components/HomeScreen/Categories';
import LatestItem from '../Components/HomeScreen/LatestItem'; // Import LatestItem component
import { app } from '../../firebaseConfig';

import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore';

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderLists, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]); // State for latest items

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList(); // Fetch latest items
  }, []);

  const getSliders = async () => {
    // Fetch slider data
    const sliders = [];
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => { 
      sliders.push(doc.data());
    });
    setSliderList(sliders);
  }

  const getCategoryList = async () => {
    // Fetch category data
    const categories = [];
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  }

  const getLatestItemList=async()=>{
    setLatestItemList([]);
    const querySnapShot=await getDocs(collection(db,'UserPost'),orderBy('createdAt','desc'));
    querySnapShot.forEach((doc)=>{
        console.log("Docs",doc.data())
        setLatestItemList(latestItemList=>[...latestItemList,doc.data()]);
    })
  }

  return (
    <ScrollView className="py-8 px-6 bg-white flex-1">
      <Header />
      <Slider sliderLists={sliderLists} />
      <Categories categoryList={categoryList} />
      <LatestItem latestItemList={latestItemList} heading={'Latest Items'} />
    </ScrollView>
  );
}
