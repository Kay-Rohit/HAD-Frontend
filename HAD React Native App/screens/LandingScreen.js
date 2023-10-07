import React, { useState, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import ChatScreen from "./ChatScreen";
import SessionScreen from "./SessionScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InitialQuizScreen from "./InitialQuizScreen";
import ProfileScreen from "./ProfileScreen";
import MoodLiftScreen from "./MoodLiftScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialBottomTabNavigator();

const LandingScreen = ({ route }) => {
  const [userData, setUserData] = useState({});
  const [isIntialSessionCompleted, setInitialSessionCompleted] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const initialSession = async () => {
    const session = await AsyncStorage.getItem("initialSessionCompleted");
    setInitialSessionCompleted(session);
  };

  const reloadScreen = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const [reload, setReload] = useState(false);

  const reloadParent = () => {
    setReload(true);
    
  };

  useEffect(() => {
    initialSession();
    //getting user data
    // const data = route.params.data;
    // setUserData(data);
    // console.log(userData);
  }, [reload]);

  return (
    (isIntialSessionCompleted === "Yes" && (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor="teal"
        inactiveColor="black"
        activeBackgroundColor="gray"
        inactiveBackgroundColor="green"
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          onPress={reloadScreen}
          options={({ navigation }) => ({
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            screenProps: { navigation },
          })}
        />
        <Tab.Screen
          name="SessionScreen"
          component={SessionScreen}
          onPress={reloadScreen}
          options={({ navigation })=>({
            tabBarLabel: "Session",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="calendar-today"
                color={color}
                size={26}
              />
            ),
            screenProps: { navigation },
          })}
        />
        <Tab.Screen
          name="Relax"
          component={MoodLiftScreen}
          onPress={reloadScreen}
          options={{
            tabBarLabel: "MoodLift",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="baby-face-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          onPress={reloadScreen}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="message" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          onPress={reloadScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    )) ||
    (isIntialSessionCompleted === "No" && (
      <InitialQuizScreen onPress={reloadParent} />
    ))
  );
};

export default LandingScreen;
