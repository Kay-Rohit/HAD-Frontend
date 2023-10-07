import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getUserProfile } from '../services/URLs';

import { ScrollView } from "react-native-gesture-handler";
import { IconButton, Card, Button, Modal } from "react-native-paper";
import Seperator from "../components/Seperator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseURL } from "../services/URLs";


const ProfileScreen = ({ navigation }) => {



  const [userDetails, setUserDetails] = useState({
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    email: "testmail@gmail.com",
    gender: "Male",
    dob: "1234567890",
    contact: "8520741963",
    address: "IIIT bangalore",
    password: "",
  });
  useEffect(() => {
    (async() => {
        const email = await AsyncStorage.getItem('email');
      // const id = await AsyncStorage.setItem("id");
        const firstName = await AsyncStorage.getItem("firstName");
        const contact = await AsyncStorage.getItem("contact");
        const dob = await AsyncStorage.getItem("dob");
        const middleName = await AsyncStorage.getItem("middleName");
        const lastName = await AsyncStorage.getItem("lastName");
        const token=await AsyncStorage.getItem("token");
      setEmailId(email);
      setToken(token);
      setUserDetails({...userDetails,firstName:firstName, middleName:middleName, lastName:lastName, email: email, dob: dob, contact:contact})
    })();
    getUserProfileData();
   }, []);

  const [emailId,setEmailId]=useState("");
  const [token, setToken] = useState("")
  const [passwordOne,setPasswordOne]=useState("")
  const [passwordTwo,setPasswordTwo]=useState("")
  const [currentPassword,setCurrentPassword]=useState("")
    //for showing edit profile form
  const [showForm, setShowForm] = useState(false);
  const [isModelVisible, setIsModalVisible] = useState(false)
  const [isDoctorModelVisible, setIsDoctorModalVisible] = useState(false)

  const [doctorAssigned,setDoctorAssigned]=useState({});
    
    const getUserProfileData=async()=>{
    
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
      const userProfileURL = getUserProfile+id;
  
      let config = {
        headers:{
            Authorization:token,
            "ngrok-skip-browser-warning":"69420"
        }
    }
  
    await axios.get(userProfileURL,config)
        .then((res) => {
          if (res.data.doctor === null) {
            setDoctorAssigned(null);
          } else {
            setDoctorAssigned(res.data.doctor);
          }
      })
        .catch(err => {
          console.log(err)});
      };


  const submitPassword=async()=>
  { 

    console.log(emailId)
    if(passwordOne===passwordTwo)
    {
      await axios.post(`${baseURL}/user/reset-password`, {
        email: emailId,
        oldPassword: currentPassword,
        newPassword: passwordTwo
      }, {
        headers:{
          Authorization: token,
          "ngrok-skip-browser-warning":"true"
        }
      })
      .then((res)=>{
        console.log(res.data);
        Alert.alert("Successfull", "Your password has been changed successfully", [
          {
            text: "OK",
            onPress: handleLogout,
          },
        ]);
      }).catch(err=>console.log(err))
    }
    else 
    return (
      Alert.alert("Password didn't match Please enter correct password..","",[{
        text:"Try Again",
        onPress:null
      },
    {
      text:"Continue",
      onPress:null
    }])
    )
  }

  const isDoctorModelVisibleFunction = () => {

    setIsDoctorModalVisible(!isDoctorModelVisible);
  }

  const isModelVisibleFunction = () => {

    setIsModalVisible(!isModelVisible);
  }

  const handleSave = () => {
    Alert.alert("Saved Successfully", "Your data has been saved successfully", [
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
    ]);
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  const editProfileDetails = async () => {
    setShowForm(!showForm);
  };

  // console.log(userDetails.firstName)

  return (
    <>
      <ScrollView>
        <View className="flex-1">
          <View className="h-96">
            <Image
              source={require("../assets/profile.png")}
              className="h-full w-full rounded-b-3xl"
            />
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-blue-200 rounded-lg absolute top-10 right-3"
          >
            <View className="flex-row">
              <IconButton icon="logout" onPress={handleLogout} />
            </View>
          </TouchableOpacity>

          <>
          {
            (doctorAssigned != null) >0 && (<TouchableOpacity
            onPress={isDoctorModelVisibleFunction}
            className="bg-blue-200 rounded-lg absolute top-10 left-3"
            >
            <View className="flex-row">
              <IconButton icon="eye" onPress={isDoctorModelVisibleFunction} />
              <Text className="mt-3 mr-2 text-lg font-bold">Your Doctor</Text>
            </View>
          </TouchableOpacity>)
          }
          </>

          <View className="justify-between flex-row p-6">
            <Text className="text-2xl font-bold mb-4">
              {showForm ? "Edit Details" : "Profile Details"}
            </Text>
            <Text>
              {" "}
              <IconButton icon="pencil" onPress={editProfileDetails} />
            </Text>
          </View>

          {showForm ? (
            <View className="px-6">
              <View className="mb-4">
                <Text className="text-gray-600 text-lg">Contact</Text>
                <TextInput
                  value={userDetails.contact}
                  onChangeText={(e) => {
                    setUserDetails({ ...userDetails, contact: e });
                  }}
                  className="border-2 border-gray-400 p-2 rounded"
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-600 text-lg">Address</Text>
                <TextInput
                  value={userDetails.address}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(e) => {
                    setUserDetails({ ...userDetails, address: e });
                  }}
                  className="border-2 border-gray-400 p-2 rounded"
                />
              </View>

              <View className="mb-4">
                <TouchableOpacity
                  onPress={handleSave}
                  className="bg-blue-500 py-2 px-4 rounded text-white"
                >
                  <Text className="text-center font-bold text-lg">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Card className="mx-6">
              <Card.Title
                title={`${userDetails.firstName} ${userDetails.middleName} ${userDetails.lastName}`}
              />
              <Card.Content>
                <Text className="mt-3 text-purple-700 font-bold text-30">Email</Text>
                <Text variant="bodyMedium">{userDetails.email}</Text>
                <Seperator />
                <Text className="mt-3 text-purple-700 font-bold text-36">Gender</Text>

                <Text variant="bodyMedium">{userDetails.gender}</Text>
                <Seperator />
                <Text className="mt-3 text-purple-700 font-bold text-36">DOB</Text>

                <Text variant="bodyMedium">{userDetails.dob}</Text>
                <Seperator />
                <Text className="mt-3 text-purple-700 font-bold text-36">Contact</Text>

                <Text variant="bodyMedium">{userDetails.contact}</Text>
                <Seperator />
                <Text className="mt-3 text-purple-700 font-bold text-36">Address</Text>

                <Text variant="bodyMedium">{userDetails.address}</Text>

                <Button className="mt-2 font-bold" onPress={isModelVisibleFunction}>
                  <Text className="text-red-700">Change Password</Text></Button>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>

      <Modal visible={isModelVisible} className="bg-white mt-96 rounded-t-2xl" >
        <View className="bg-white">
            <IconButton size={40} icon='close' onPress={isModelVisibleFunction} />
          <Text className="justify-center text-center m-4 font-bold text-lg">Change Your Password</Text>
          <Text className="ml-5">Current Password</Text>
          <TextInput
                  value={currentPassword}
                  multiline={true}
                  numberOfLines={1}
                  onChangeText={(e) =>setCurrentPassword(e)}
                  className="border-2 mx-5 border-gray-400 p-2 rounded"
          />
          <Text className="ml-5 mt-2">New Password</Text>
          <TextInput
                  value={passwordOne}
                  multiline={true}
                  onChangeText={(e) =>setPasswordOne(e)}
                  className="border-2 mx-5 border-gray-400 p-2 rounded"
          />
          <Text className="ml-5 mt-2">Retype New Password</Text>
          <TextInput
                  value={passwordTwo}
                  multiline={true}
                  onChangeText={(e) => setPasswordTwo(e)}
                  returnKeyType="done"
                  className="border-2 mx-5 border-gray-400 p-2 rounded"
          />
          <Button onPress={submitPassword} className="justify-center text-purple-700 justify-items-center mx-20 mt-4 mb-40 ">
            <Text className="text-lg">Submit Password</Text>
          </Button>
        </View>
      </Modal>

      <Modal visible={isDoctorModelVisible} className="bg-white mt-96 rounded-t-2xl" >
        <View className="bg-white">
            <IconButton size={40} icon='close' onPress={isDoctorModelVisibleFunction} />
          <Text className="justify-center text-center mb-8 font-bold text-3xl">Your Companion</Text>
          <Text  className="justify-center text-center font-bold mt-2 text-lg">Name :- {doctorAssigned.firstName} {doctorAssigned.middleName}</Text>
          <Text  className="justify-center text-center font-bold mt-2 text-lg">Specialisation :- {doctorAssigned.specialisation} </Text>
          <Text  className="justify-center text-center font-bold mt-2 text-lg">Doctor Degree :- {doctorAssigned.degree} </Text>
          <Text  className="justify-center text-center font-bold mt-2 text-lg">Email :-{doctorAssigned.email} </Text>

        </View>
      </Modal>
    </>
  );
};

export default ProfileScreen;
