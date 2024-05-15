import { View, Text,StyleSheet,TextInput, Button, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig';
import {getFirestore,getDocs, collection, addDoc} from "firebase/firestore"
import { Formik } from 'formik';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {

    const [image, setImage] = useState(null);
    const db = getFirestore(app);
    const storage = getStorage();
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const [categoryList,setCategoryList]=useState([]);
    useEffect(()=>{
        getCategoryList();
    },[])
    const getCategoryList=async () =>{
        setCategoryList([]);
        const querySnapshot=await getDocs(collection(db, 'Category'));
        querySnapshot.forEach((doc)=>{
            console.log("Docs:", doc.data());
            setCategoryList(categoryList=>[...categoryList,doc.data()])
        })
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      const onSubmitMethod = async (value) => {
        setLoading(true);
    
        const resp = await fetch(image);
        const blob = await resp.blob();
        const storageRef = ref(storage, 'communityPost/' + Date.now() + ".jpg");
    
        uploadBytes(storageRef, blob)
        .then(async (snapshot) => {
            console.log('Uploaded a blob or file');
            return getDownloadURL(storageRef);
        })
        .then(async (downloadUrl) => {
            console.log(downloadUrl);
            value.image = downloadUrl;
            value.userName = user.fullName;
            value.userEmail = user.primaryEmailAddress.emailAddress;
            value.userImage = user.imageUrl;
            value.createdAt = new Date(); // Set createdAt as a Date object
            const docRef = await addDoc(collection(db, "UserPost"), value);
            if (docRef.id) {
                setLoading(false);
                Alert.alert('Success!!!', 'Post Added ');
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            setLoading(false);
        });
    }
    
    
    
    
  return (
    <KeyboardAvoidingView>
        <ScrollView>
    <View className="p-10">
        <Text className="text-[20px] font-bold">Add New Post</Text>
    <Formik
    initialValues={{title:'',name:'',desc:'',category:'',address:'',price:'', image:'', userName:'', userEmail:'', userImage:'', createdAt:Date.now()}}
    onSubmit={value=>onSubmitMethod(value)}
    validate={(values)=>{
        const errors={}
        if(!values.title)
            {
                console.log("Title not Present");
                ToastAndroid.show('Title Must be There',ToastAndroid.SHORT)
                errors.nname="Title Must be there"
            }
            return errors
    }}
    >
        {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
            <View>
                <TouchableOpacity onPress={pickImage}>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 100, height: 100, borderRadius: 15 }}
                    />
                ) : (
                    <Image
                        source={require('./../../assets/images/download.png')}
                        style={{ width: 100, height: 100, borderRadius: 15 }}
                    />
                )}
            </TouchableOpacity>
                <TextInput 
                style={styles.input}
                placeholder='Title'
                value={values?.title}
                onChangeText={handleChange('title')}
                />
                <TextInput 
                style={styles.input}
                placeholder='Price'
                keyboardType='number-pad'
                value={values?.price}
                onChangeText={handleChange('price')}
                />
                <TextInput 
                style={styles.input}
                placeholder='Description'
                value={values?.desc}
                numberOfLines={5}
                onChangeText={handleChange('desc')}
                />
                <TextInput 
                style={styles.input}
                placeholder='Address'
                value={values?.address}
                onChangeText={handleChange('address')}
                />
                <Picker 
                selectedValue={values?.category}
                style={styles.input}
                onValueChange={itemValue=>setFieldValue('category', itemValue)}
                >
                {categoryList&&categoryList.map((item,index) =>(
                    <Picker.Item key={index}
                    label={item?.name} value={item?.name}/>
                ))}
                    
                </Picker>
                <TouchableOpacity onPress={handleSubmit} 
                className="p-4 bg-blue-500 rounded-full"
                style={{
                    backgroundColor:loading?'#ccc':'#007BFF'
                }}
                disabled={loading}
                >


                {loading?
                    <ActivityIndicator color='#fff'/>
                    :
                    <Text className="text-white text-center text-[16px]">Submit</Text>
                }
                
                    
                </TouchableOpacity>
            </View>
        )}
    </Formik>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

    input:{
        borderWidth:1,
        borderRadius:10,
        padding:10,
        paddingHorizontal:17,
        marginTop:5,
        marginBottom:5,
        fontSize:17

    }

})