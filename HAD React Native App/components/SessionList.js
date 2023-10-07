import { View, Text,FlatList } from 'react-native';
import React from 'react';
import { useEffect,useState } from 'react';

import allSessionData from '../dummy_data/session_data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

const SessionList = ({sessionData}) => {
  console.log("Insise SessionList");

  console.log(sessionData);

    useEffect(() => {

    }, [])


    const renderItem = ({ item, index }) => {
        return (
                <View>
                    <View className="m-3 ">
                        <Text>{item.session_id}</Text>
                        <Text>{item.session_number}</Text>
                        <Text>{item.session_image_url}</Text>
                        <Text>{item.session_title}</Text>
                        <Text>{item.session_description}</Text>
                    </View>
                </View>
        );
      };
    
    
  return (
    <View>
        <FlatList
          data={sessionData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item,session_id) => session_id.toString()}
          renderItem={renderItem}
        />
    </View>
  )
}

export default SessionList