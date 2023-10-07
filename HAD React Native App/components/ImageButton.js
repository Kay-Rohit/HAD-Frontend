import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const ImageButton = ({ source, title, onPress ,description}) => {
  return (
    <TouchableOpacity className="h-28" onPress={onPress}>
      <Image style={styles.image} source={source} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};
export default ImageButton

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '80%',
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },

  description: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
});
