import React from 'react';
import { View, TextInput } from 'react-native';


const SearchBar = () => {
  return (
    <View className='bg-gray-100 rounded-3xl p-3'>
      <TextInput className='text-gray-800' placeholder="Search..." />
    </View>
  );
};

export default SearchBar;
