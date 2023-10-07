import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import FlipCard from 'react-native-flip-card'

const FlipCardComponent = (itemData,indexData) => {
  const item = itemData.item;
  const index = indexData.index;
  return (
    <View>
        <FlipCard 
            style={  [styles.card, index % 2 === 0 ?  { backgroundColor: '#'+index+'0b2b2'} :  { backgroundColor: '#'+index+'fa927'}]}
            friction={7}
            perspective={600}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={(isFlipEnd)=>{{}}}>
            <View>           
                <Text className ="text-lg">{item.setup}</Text>
            </View>
            <View>
                <Text className="text-lg font-bold">{item.punchline}</Text>
            </View>
        </FlipCard>
    </View>
  )
}

export default FlipCardComponent


const styles = StyleSheet.create({
    card: {
      shadowColor:'black',
      shadowOffset:6,
      borderRadius: 15,
      elevation:10,
      padding: 10,
      marginHorizontal: 10,
      width: 150,
      height: 150,
    }
  });