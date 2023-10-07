import React from 'react';
import { View, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const images = [
  {
    id: 1,
    url: 'https://cdn.vox-cdn.com/thumbor/gZcTCPlyVAXI7ZYG7GtYwm-zdns=/0x0:2480x1747/1200x800/filters:focal(1063x718:1459x1114)/cdn.vox-cdn.com/uploads/chorus_image/image/70159160/GettyImages_1324376942.0.jpg',
  },
  {
    id: 2,
    url: 'https://cdn.memiah.co.uk/uploads/counselling-directory.org.uk/image_gallery/Mind-1612365176.jpg',
  },
  {
    id: 3,
    url: 'https://img.freepik.com/premium-vector/support-group-depression-supports-therapy-with-psychotherapist-helping-network-female-problems-tired-woman-need-help-vector-concept_53562-17661.jpg?w=2000',
  },
  {
    id: 4,
    url: 'https://cdn.vox-cdn.com/thumbor/gZcTCPlyVAXI7ZYG7GtYwm-zdns=/0x0:2480x1747/1200x800/filters:focal(1063x718:1459x1114)/cdn.vox-cdn.com/uploads/chorus_image/image/70159160/GettyImages_1324376942.0.jpg',
  },
  {
    id: 5,
    url: 'https://cdn.memiah.co.uk/uploads/counselling-directory.org.uk/image_gallery/Mind-1612365176.jpg',
  },
  {
    id: 6,
    url: 'https://img.freepik.com/premium-vector/support-group-depression-supports-therapy-with-psychotherapist-helping-network-female-problems-tired-woman-need-help-vector-concept_53562-17661.jpg?w=2000',
  },
];

const CarouselWithImages = () => {
  const renderItem = ({ item }) => (
    <View className="mt-3">
      <View className="w-full h-44 ">
        <Image className="w-full h-full rounded-lg" source={{ uri: item.url }} />
      </View>
    </View>
  );

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={400}
      itemWidth={300}
      loop={true}
      autoplay={true}
      autoplayInterval={6000}
    />
  );
};

export default CarouselWithImages;
