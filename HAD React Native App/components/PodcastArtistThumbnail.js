import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';

const PodcastArtistThumbnail = ({item}) => {
  
  return (
    <TouchableOpacity>
      <View className="h-40 w-32 rounded-xl bg-blue-500  m-3">
        <View className="justify-center m-3">
        <Avatar.Image size={100}  source={{ uri: item.thumbnail }} className="justify-center" />
        </View>
        <View className=" justify-items-center ">
          <Text className="ml-8 text-lg text-white ">{item.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PodcastArtistThumbnail