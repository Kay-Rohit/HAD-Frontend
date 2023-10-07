import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { baseURL } from '../services/URLs'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ArticleComponent = ({ item }) => {
  const navigation = item.navigation;

  const [articleItem, setArticleItem] = useState({});

  useEffect(() => {

    setArticleItem(item.item);
    console.log(articleItem);
  }, [])

  const handleArticle = async (item) => {
    const token = await AsyncStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
        "ngrok-skip-browser-warning": "69420"
      }
    }

    await axios.post(`${baseURL}/user/update/personal-article-completion/${item.item.id}`, {}, config)
      .then((res) => {
        console.log(res)
      })
      .catch(err => console.log(err))

    if (item.item.articleType === 'audio') {
      console.log(item.item)
      const navigationData = {
        "artist": item.item.articleAuthor,
        "podcastDescription": "Some important thing to hear",
        "podcastTitle": item.item.articleTitle,
        "podcastURL": item.item.articleUrl,
        "thumbnail": item.item.articleThumbnail
      }

      navigation.navigate('AudioPlayerScreen', { data: navigationData });
    }
    else if (item.item.articleType === 'video') {
      navigation.navigate('VideoPlayerScreen', { item });
    }
    else if (item.item.articleType === 'reading') {
      navigation.navigate('ReadingScreen', { item });
    }
    else if (item.item.articleType === 'you tube') {
      navigation.navigate('YouTubeScreen', { item });
    }

  }

  return (
    <TouchableOpacity onPress={() => handleArticle(item)}>
      <View className="h-40 w-32 rounded-xl bg-cyan-500  m-3">
        <ImageBackground source={{ uri: ((articleItem.articleThumbnail === "" || articleItem.articleThumbnail === null || articleItem.articleThumbnail === undefined) ? "https://img.freepik.com/free-vector/sharing-articles-concept-illustration_114360-5517.jpg?w=2000" : articleItem.articleThumbnail) }} className=" flex-1 bg-cover  justify-center" />

        <Text className="justify-center text-center text-lg">

          <Icon name={articleItem.completed ? "check-box" : "check-box-outline-blank"} size={20} />
          {articleItem.articleType}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleComponent

