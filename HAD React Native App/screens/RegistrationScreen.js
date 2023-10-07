import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity,ScrollView,Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/EmailValidator'
import { passwordValidator } from '../helpers/PasswordValidator'
import { nameValidator } from '../helpers/NameValidator'
import {registerUser } from '../services/URLs';
import axios from 'axios';


export default function RegistrationScreen({ navigation }) {

  const [fname, setfName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [mname, setmName] = useState({ value: '', error: '' })
  const [lname, setlName] = useState({ value: '', error: '' })
  const [gender, setGender] = useState({ value: '', error: '' })
  const [dateOfBirth, setDateOfBirth] = useState({ value: '', error: '' })
  const [contact,setContact]=useState({ value: '', error: '' });

  const onSignUpPressed = async() => {

    const nameError = nameValidator(fname.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setfName({ ...fname, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
      await axios.post (registerUser, {
              firstName:fname['value'],
              middleName:mname['value'],
              lastName:lname['value'],
              email: email['value'],
              password: password['value'],
              gender:gender['value'],
              dob:dateOfBirth['value'],
              contact:contact['value']
          }).then((response) => 
          {
            if(response.status==200)
            {
              Alert.alert(
                'User Registered !!',
                'Your data has been saved successfully',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'LoginScreen' }],
                    });
                  }
                  }
                ]
              );
            }
      })
      .catch((error) => {
          console.log(error);
          Alert.alert(
            'Oops an error occurred',
            'Please try again after some time',
            [
              {
                text: 'Continue',
                onPress: () => {}
              }
            ]
          );
      });

  }

  return (
    <ScrollView>
      <Background>
      <View>
        <Text className="text-2xl font-bold  mt-10 mb-10">Create Account</Text>
      </View>
      <TextInput
        label="First Name "
        returnKeyType="next"
        value={fname.value}
        onChangeText={(text) => setfName({ value: text, error: '' })}
        error={!!fname.error}
        errorText={fname.error}
      />
      <TextInput
        label="Middle Name "
        returnKeyType="next"
        value={mname.value}
        onChangeText={(text) => setmName({ value: text, error: '' })}
        error={!!mname.error}
        errorText={mname.error}
      />
      <TextInput
        label="Last Name "
        returnKeyType="next"
        value={lname.value}
        onChangeText={(text) => setlName({ value: text, error: '' })}
        error={!!lname.error}
        errorText={lname.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <View className="flex flex-row">
      <TextInput
        label="Gender(M/F)"
        returnKeyType="next"
        value={gender.value}
        onChangeText={(text) => setGender({ value: text, error: '' })}
        error={!!gender.error}
        errorText={gender.error}
        className="w-32 ml-36"
      />

      <TextInput  
        label="DOB(mm/dd/yyyy)"
        returnKeyType="next"
        value={dateOfBirth.value}
        onChangeText={(text) => setDateOfBirth({ value: text, error: '' })}
        error={!!dateOfBirth.error}
        errorText={dateOfBirth.error}
        className="w-40"
      />
      </View>

      <TextInput
        label="Contact(+91)"
        returnKeyType="next"
        value={contact.value}
        onChangeText={(text) => setContact({ value: text, error: '' })}
        error={!!contact.error}
        errorText={contact.error}
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
        
      >
        Sign Up
      </Button>
      <View style={styles.row} className="mb-20">
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 3,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})