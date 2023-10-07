import "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./screens/OnboardingScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import LandingScreen from "./screens/LandingScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import InitialQuizScreen from "./screens/InitialQuizScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AudioPlayerScreen from "./screens/AudioPlayerScreen";
import ArticleComponent from "./components/ArticleComponent";
import ReadingScreen from "./screens/ReadingScreen";
import VideoPlayerScreen from "./screens/VideoPlayerScreen";
import SessionScreen from "./screens/SessionScreen";
import ChatScreen from "./screens/ChatScreen";
import RequestDoctorScreen from "./screens/RequestDoctorScreen";
import PredefinedArticleScreen from "./screens/PredefinedArticleScreen";
import RenderSubarticleScreen from "./screens/RenderSubarticleScreen";
import YouTubeScreen from "./screens/YouTubeScreen";
import MoodLiftScreen from "./screens/MoodLiftScreen";
import PodcastSeriesScreen from "./screens/PodcastSeriesScreen";
import SessionQuizComponent from "./components/SessionQuizComponent";
import { useTranslation } from "react-i18next";
import { AppState } from "react-native";
import { GlobalContext } from "./services/GlobalContext";

//=================for notifications=======================================================
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
// --======================================================================================

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const Stack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  //==================================================================================================

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [appEntryTimeStamp, setAppEntryTime] = useState('');

  //function to store token into the database
  const storeToken = async (token) => {
    console.log("Token to be stored", token);
    // await axios.post(``).then((res) => {
    //   console.log(res.data)
    // })
    // .catch(err => console.log(err));
  };

  useEffect(() => {
    let entryTime = new Date();
    setAppEntryTime(entryTime);
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      storeToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    //========code to unsubscribe=======
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // ==================================================================================================

  React.useEffect(() => {
    async function initialLaunch() {
      const appData = await AsyncStorage.getItem("isAppFirstLaunched");
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem("isAppFirstLaunched", "false");
      } else {
        setIsAppFirstLaunched(false);
      }
    }
    initialLaunch();

    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);

  return (
    isAppFirstLaunched != null && (
      <GlobalContext.Provider value={{expoPushToken, appEntryTimeStamp}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAppFirstLaunched && (
              <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
              />
            )}
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="MoodLiftScreen" component={MoodLiftScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SessionScreen" component={SessionScreen} />
            <Stack.Screen
              name="AudioPlayerScreen"
              component={AudioPlayerScreen}
            />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
              name="InitialQuizScreen"
              component={InitialQuizScreen}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <Stack.Screen
              name="ArticleComponent"
              component={ArticleComponent}
            />
            <Stack.Screen
              name="VideoPlayerScreen"
              component={VideoPlayerScreen}
            />
            <Stack.Screen name="ReadingScreen" component={ReadingScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen
              name="RequestDoctorScreen"
              component={RequestDoctorScreen}
            />
            <Stack.Screen
              name="PredefinedArticleScreen"
              component={PredefinedArticleScreen}
            />
            <Stack.Screen
              name="RenderSubarticleScreen"
              component={RenderSubarticleScreen}
            />
            <Stack.Screen name="YouTubeScreen" component={YouTubeScreen} />
            <Stack.Screen
              name="PodcastSeriesScreen"
              component={PodcastSeriesScreen}
            />
            <Stack.Screen
              name="SessionQuizComponent"
              component={SessionQuizComponent}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalContext.Provider>
    )
  );
};

export default App;
