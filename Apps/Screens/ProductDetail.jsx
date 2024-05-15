import { View, Text,Image,Linking,Share,Alert } from 'react-native'
import React, {useEffect,useState,setOptions,navigation}from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView,TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { getDocs, getFirestore, query,collection,where,deleteDoc,goBack } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function ProductDetail({navigation}) {
    const [product,setProduct]=useState([]);
    const {params}=useRoute();
    const {user}=useUser();
    const db=getFirestore(app);
    const nav=useNavigation();
    useEffect(()=>{
        params&&setProduct(params.product);
        shareButton();
    },[params,navigation])

    const shareButton=()=>{
      navigation.setOptions({
        headerRight: () => (
        
          <AntDesign name="sharealt" size={24} color="black"   onPress={()=>shareProduct()}/>
        
        ),
      });
    }
    const shareProduct=async()=>{
      const content={
        message:product.title+"\n"+product.desc,
      }
      Share.share(content).then(resp=>{
        console.log(resp);
      },(error)=>{
        console.log(error);
      })
    }
    const sendEmailMessage=()=>{
        const subject='Regarding'+product.title;
        const body="Hi " +product.userName+"\n"+"I am interested in this product"
        Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
    }
    const deleteUserPost=()=>{
      Alert.alert('Do you want to delete this Post?','Are you Sure ?',[
       {
        text:'Yes',
        onPress:()=>deleteFromFirebase()
       },
       {
        text:'Cancel',
        onPress:()=>console.log('Cancel Pressed'),
        style:'cancel'
       }
      ])
    }
    const deleteFromFirebase=async()=>{
      const q=query(collection(db,'UserPost'),where('title','==',product.title))
      const snapshot=await getDocs(q);
      snapshot.forEach(doc=>{
        deleteDoc(doc.ref).then(resp=>{
          console.log("Deleted the Post..");
          nav.goBack();
        })
      })
    }
  return (
    <ScrollView>
      <Image source={{uri:product.image}}
      className="h-[320px] w-full"/>
      <View>
        <Text>{product?.title}</Text>
        <Text>{product?.category}</Text>
        <Text>{product?.desc}</Text>
      </View>
    

    <View className="mt-20">
        <Text className="text-xl mb-2">User Profile </Text>
        <Image source={{uri:product.userImage }}
        className="w-12 h-12 rounded-full"
        />
        <Text>{product.userName}</Text>
        <Text>{product.userEmail}</Text>

    </View>
    {user?.primaryEmailAddress.emailAddress==product.userEmail?
   <TouchableOpacity 
   onPress={()=>deleteUserPost()}
   className="z-40 bg-red-500 rounded-full p-4 m-4">
       <Text className="text-center text-white"> Delete</Text>
   </TouchableOpacity>
   :
    <TouchableOpacity 
    onPress={()=>sendEmailMessage()}
    className="z-40 bg-blue-500 rounded-full p-4 m-4">
        <Text className="text-center text-white"> Send Message</Text>
    </TouchableOpacity>  
  }
   

    </ScrollView>
  )
}