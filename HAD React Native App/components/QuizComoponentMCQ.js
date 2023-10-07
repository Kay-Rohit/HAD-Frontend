import React, { useState,useEffect } from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MCQQuestion = ({ question, option1,option2,option3,option4,value1,value2,value3,value4, onSelect,imageURL }) => {
  
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [options,setOptions]=useState([]);
  const [optionValue,setOptionValue]=useState({});

  const handleSelectOption = (option,index) => {
    setSelectedOption(option);
    let data= "option"+(index+1);
    onSelect(optionValue[data],option);
  };

  const setOptionValues=()=>{
    setOptionValue({
      option1:value1,
      option2:value2,
      option3:value3,
      option4:value4
    })

  }

  useEffect(() => {
    setOptions([option1,option2,option3,option4]);
    setOptionValues();
  }, [option1])
  

  return (
    <SafeAreaProvider>
      <View>
        <View>
        <Image source={require('../assets/ballon.png')} />
          <Text className=" font-bold text-xl p-2">{question}</Text>
          {options.map((option,index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectOption(option,index)}
              style={{
                backgroundColor: option === selectedOption ? 'lime' : 'white',
                padding: 10,
                margin: 8,
                borderRadius:8,
              }}>
              <Text className="text-lg text-black font-bold">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default MCQQuestion;
