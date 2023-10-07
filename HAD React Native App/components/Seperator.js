import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Seperator = () => {
  return (
    <View style={seperatorStyle}/>
  )
}

export default Seperator

const seperatorStyle = StyleSheet.create({
  marginTop:5,
  height:2,
  width:'100%',
  backgroundColor:'#ddd'
});

// import { View, Text,StyleSheet } from 'react-native'


//  export default Seperator =()=>