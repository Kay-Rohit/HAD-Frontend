import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, Button, IconButton } from 'react-native-paper';
import { useState,useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PodcastSeriesScreen = ({route}) => {
    const navigation = useNavigation();
    const [podcastSeries,setPodcastSeries]=useState([]);
    const [podcastArtist,setPodcastArtist]=useState("");
    const [podcastThumbnail,setPodcastThumbnail]=useState("");
    
    useEffect(() => {
      setPodcastSeries(route.params.data.podcastEpisodes);
      setPodcastArtist(route.params.data.artist);
      setPodcastThumbnail(route.params.data.podcastThumbnail);
    }, [])
    
    const handlePress = (item) => {
      const navigationData={"artist":podcastArtist, "podcastDescription": item.episodeDescription, "podcastTitle":item.episodeTitle, "podcastURL":  item.episodeURL, "podcast_id": item.episodeNumber, "thumbnail": podcastThumbnail}
      navigation.navigate('AudioPlayerScreen',{data:navigationData});
      };

  return (
    <SafeAreaProvider>
    <ScrollView>
     <View className="bg-teal-500 pl-3 rounded-2xl">
       <View className="pt-6 mt-16 ">
          <Text className="text-2xl font-bold mb-2 text-center">{route.params.data.podcastTitle}</Text>
       </View>
     </View>
     <View style={styles.container}>
      {podcastSeries.map(item => (
        <Card key={item.episodeNumber} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View className="flex-col">
            <Avatar.Text color='black' className="bg-teal-500" size={42} label={item.episodeNumber} />
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{item.episodeTitle}</Text>
              <Text numberOfLines={3} style={styles.title}>{item.episodeDescription}</Text>
            </View>
           <View className="flex-col">
           <Avatar.Icon icon={item.isCompleted===true ? 'check-all':'timer-sand-complete'} color='white'size={42} className="mt-2 ml-2 bg-black" />
            <IconButton icon='play' className="bg-teal-500" size={32} onPress={() => handlePress(item)} />
           </View>
          </Card.Content>
        </Card>
      ))}
      
    </View>
    </ScrollView>
    </SafeAreaProvider>
  )

};
export default PodcastSeriesScreen ;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F1e5F5',
      padding: 4,
    },
    card: {
      borderRadius: 16,
      margin: 8,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 25,
      margin: 8,
    },
    details: {
      flex: 1,
      margin: 8,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 16,
      color: 'gray',
    },
  });