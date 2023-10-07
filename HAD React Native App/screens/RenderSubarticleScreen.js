import React, { useState } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View,Image } from 'react-native'
import { useRoute } from '@react-navigation/native';

// demo purposes only
function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

export default function RenderSubarticleScreen() {

  const route = useRoute();
  const text_data=route.params.data;
  const navigation = route.params.navigation;

//   const [cards, setCards] = useState()
  const [swipedAllCards, setSwipedAllCards] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState('')
  const [cardIndex, setCardIndex] = useState(0)
  
  const renderCard = (card) => {
    return (
        <View style={styles.card}>
        <View>
            <Image source={{ uri: card.imageURL }} style={styles.image} />
        </View>
        <Text style={styles.text}>{card.textData}</Text>
      </View>
    )
  };

  
  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
    setCardIndex(0);
  };

  const swipeLeft = () => {
    swiper.swipeLeft()
  };

  let swiper

  return (
    <View className="mt-8" style={styles.container}>
      <Swiper
        ref={ref => swiper = ref}
        // onSwiped={() => onSwiped('general')}
        // onSwipedLeft={() => onSwiped('left')}
        // onSwipedRight={() => onSwiped('right')}
        // onSwipedTop={() => onSwiped('top')}
        // onSwipedBottom={() => onSwiped('bottom')}
        onTapCard={swipeLeft}
        cards={text_data}
        cardIndex={cardIndex}
        cardVerticalMargin={80}
        renderCard={renderCard}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      >
        </Swiper>
      </View>
    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  image: {
    justifyContent:'center',
    width: 300,
    height: 300,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize:20,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})


