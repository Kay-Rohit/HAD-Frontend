import { View, Text,Button,Image,ActivityIndicator, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import MCQQuestion from './QuizComoponentMCQ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { postInitialSessionResponse } from '../services/URLs';

const SessionQuizComponent = ({route}) => {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [questions,setQuestions]=useState(route.params.item);
  const [answers,setAnswers]= useState([]);
  const [answerOption,setAnswerOption]=useState([]);
  const [weekNumber,setWeekNumber]=useState(route.params.item.currentWeek)
  const [sessionNumber,setSessionNumber]=useState(route.params.item.currentSession)
  const [isNextButtonInvisible,setIsNexButtonVisible]=useState(false)

  const handleSubmit=async()=>{
    const token = await AsyncStorage.getItem('token');
    const patientId = await AsyncStorage.getItem('id');

    let config = {
      headers: {
          Authorization: token,
          'ngrok-skip-browser-warning':'true'
          }
    };

    const sum = answers.reduce((total, current) => {
      return total + current;
    });

    try 
    {
      // Find week number and session number 
      console.log("weekNummber --- "+weekNumber);
      console.log("sessionNumber ----- "+sessionNumber);
      const responseData = await axios.post(postInitialSessionResponse, {
        patientId:patientId,
        weekNumber:weekNumber,
        sessionNumber:sessionNumber,
        answer_value:answers,
        answer_options:answerOption
        }, config);  
      
      } catch (error) 
      {
        console.log(error);
      }

      return (
        Alert.alert("Your answers has been submitted successfully..",
        "Thanks for completing the session.",
        [{
          text:"Continue",
          onPress:()=>{
            
          }
        }])
      )
    }

  const handleAnswer = (optionValue,option) => {
    setIsNexButtonVisible(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionValue;
    setAnswers(newAnswers);

    const newAnswerOption  = [...answerOption];
    newAnswerOption[currentQuestion] = option;
    setAnswerOption(newAnswerOption);

  };

  const handleNextQuestion = () => {
    
    setIsNexButtonVisible(false);
    if(currentQuestion== questions.length-2)
    { setIsVisible(true); 
      setIsNexButtonVisible(true);  
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
    }
  };


  const handlePreviousQuestion = () => {
    if(currentQuestion<questions.length)
    setIsVisible(false);
    if (currentQuestion > 0 ) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      console.log(answers); // Do something with the answers
    }
  };

  return (
    <ScrollView> 
      <View className=" p-1">
        <MCQQuestion
              question={questions[currentQuestion].quesion}
              option1={questions[currentQuestion].option1}
              option2={questions[currentQuestion].option2}
              option3={questions[currentQuestion].option3}
              option4={questions[currentQuestion].option4}
              value1={questions[currentQuestion].value1}
              value2={questions[currentQuestion].value2}
              value3={questions[currentQuestion].value3}
              value4={questions[currentQuestion].value4}
              onSelect={handleAnswer}
              imageLocation = {questions[currentQuestion].imageLocation}
        />
      </View>
          <View className="flex-row justify-between ml-3 mr-3 pt-3">
            <Button title="Previous" onPress={handlePreviousQuestion} />
            <>
            {(isNextButtonInvisible) && <Button title="  Next  " onPress={handleNextQuestion} />}
          </>
          </View>
          <View className="w-36 text-white font-bold py-2 px-4 rounded ml-28 justify-center">
          {isVisible && ( 
          <Button 
          title="Submit"
          onPress={handleSubmit}/>
          )}
          </View>
        </ScrollView>
  )
}

export default SessionQuizComponent