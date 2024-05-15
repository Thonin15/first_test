import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import PostItem from './PostItem';

export default function LatestItem({ latestItemList }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Latest Item</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item }) => (
          <PostItem item={item}/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
