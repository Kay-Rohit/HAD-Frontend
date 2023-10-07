import React, { useState,useEffect } from 'react'
import { View, Text, ImageBackground,Image,StyleSheet,ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import podcastdata from '../dummy_data/podcasts_by_artists';
import youTubePlaylist from '../dummy_data/youTubePlaylist';
import {getPodcastDataURL} from '../services/URLs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MoodLiftScreen = ({navigation}) => {

  const [podcastSeries,setPodcastSeriesData]= useState([]);
  const [isLoading,setIsLoading]=useState(false);

  const getPodcastData=async()=>{
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      let config = {
        headers:{
            Authorization:token,
            "ngrok-skip-browser-warning":"69420"
        }
      }
    const response1 = await axios.get(getPodcastDataURL,config);

    setPodcastSeriesData(response1.data)
    setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getPodcastData();
    
  }, [])
  

  const PodcastArtistThumbnail = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('PodcastSeriesScreen',{data:item})}}>
        <View className="h-33 w-32 rounded-xl  m-2">
          <View className="justify-center">
          <Avatar.Image size={100}  source={{ uri: item.image }} className="justify-center ml-3" />
          </View>
          <View>
            <Text className="text-lg text-black text-center">{item.artist}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  const renderPodcastSeries = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('PodcastSeriesScreen',{data:item})}}>
        <View className="h-56 w-52 rounded-xl mt-2">
          <View className="justify-center">
          <Image source={{ uri:item.podcastThumbnail }} className=" justify-center top-1 left-6 justify-items-center h-40 w-40 rounded-xl" />
          </View>
          {/* <Image source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRghTRcGozvp_H92lqdbOE3mHjShUeE8UI5Gc9zVy6CsTSzGeYckMLBQ3CGvQwa4faWz6c&usqp=CAU' }} className=" absolute justify-center right-6 top-2 justify-items-center h-12 w-12 rounded-xl" />   */}
          <View className=" justify-items-center">
            <Text className="text-center text-lg text-black mt-2 ">{item.podcastTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  const renderYouTubeSeries = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('YouTubeScreen',{item:{item:{articleUrl:item.playlistURL}}})}}>
        <View className="h-56 w-52 rounded-xl mt-2">
          <View className="justify-center">
          <Image source={{ uri:item.thumbnail }} className=" justify-center top-1 left-6 justify-items-center h-40 w-40 rounded-xl" />
          </View>
          <View className=" justify-items-center">
            <Text className="text-center text-lg text-black mt-2 ">{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View className="bg-cyan-500 pl-3 rounded-2xl">
          <View className="pt-6 mt-16 ">
            <Text className="text-2xl font-bold mb-2"> Some Mindful Suggestions for you </Text>
          </View>
        </View>

        <View>
          <Text className="text-2xl font-bold mt-4 ml-2"> Suggested Artists </Text>
          {isLoading ?(<ActivityIndicator size="large" color="#0000ff" />):(<View>
          <FlatList
              data={podcastSeries}
              renderItem={({ item }) => PodcastArtistThumbnail( item={item})}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
          </View>)}
        </View>

        <View>
          <Text className="text-2xl font-bold mb-2 ml-2"> Popular Podcast Series  </Text>
          {isLoading ?(<ActivityIndicator size="large" color="#0000ff" />): (<View>
          <FlatList
              data={podcastSeries}
              renderItem={({ item}) => renderPodcastSeries( item={item})}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
          </View>)}
        </View>

        <View>
          <Text className="text-2xl font-bold mt-4 ml-2"> You Tube channels for self development </Text>
          <View>
          <FlatList
              data={youTubePlaylist}
              renderItem={({ item}) => renderYouTubeSeries(item={item})}
              keyExtractor={item => item.playlistId.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default MoodLiftScreen;

