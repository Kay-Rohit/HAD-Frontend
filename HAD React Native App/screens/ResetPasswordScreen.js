import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/EmailValidator'
import axios from 'axios'
import { resetPassword } from '../services/URLs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })


  const sendResetPasswordEmail = async() => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }

    const token = await AsyncStorage.getItem('token');
    console.log(token);
    let config = {
      headers:{
          Authorization:token,
          "ngrok-skip-browser-warning":"69420"
      }
  }
  console.log(resetPassword+email.value)
    await axios.get(resetPassword+email.value,config).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

    Alert.alert("Email has been sent successfully","Please login using temporary password and update your password in profile section",[{text:"OK",onPress:()=>navigation.navigate('LoginScreen')}]);
    
    navigation.navigate('LoginScreen');
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      
      <Header>Reset Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Temporary Password
      </Button>
    </Background>
  )
}