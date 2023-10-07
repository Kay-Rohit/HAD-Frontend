import { View, Text,FlatList, ImageBackground } from 'react-native';
import React from 'react';
import predefinedArticleData from '../dummy_data/predefined_articles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PredefinedArticles = ({navigation}) => {
   return (
    <View>
        <Text className="text-xl mt-3 ml-3 mb-2  font-bold">
            Especially Designed for you
        </Text>
        <View className=" rounded-lg p-1 h-52 w-full ">
        <FlatList
            data={predefinedArticleData}
            renderItem={({ item }) => <PopulateArticles item={item} navigation={navigation} />}
            keyExtractor={item => item.article_id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
        </View>
    </View>
   
  )
}

export default PredefinedArticles

// Especially Designed for you screen

const PopulateArticles = ({item,navigation}) => {
    const itemData = item;
    const image = { uri: item.articleImage };
  return (
    <TouchableOpacity onPress={()=>{ navigation.navigate('PredefinedArticleScreen',{data:item, navigation:navigation})}}>
        <View style={{backgroundColor:itemData.backgroundColor}} className="h-44 w-32 m-3  rounded-lg p-2">
            <Text className="text-center font-bold">{itemData.articleTitle}</Text>
            <ImageBackground source={image} className=" flex-1 bg-cover justify-center" />
        </View>
    </TouchableOpacity>
    
  )
}

