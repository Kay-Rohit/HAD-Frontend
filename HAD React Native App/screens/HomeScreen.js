import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  AppState,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Avatar, Button, IconButton } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import Carousel from "../components/Carousel";
import { MD3Colors } from "react-native-paper";
import FlipCardComponent from "../components/FlipCard";
// import doctorArticleData from '../dummy_data/doctors_article'
import ArticleComponent from "../components/ArticleComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PredefinedArticles from "../components/PredefinedArticles";
import { getDoctorSuggestedArticle, baseURL } from "../services/URLs";
import axios from "axios";
import { GlobalContext } from "../services/GlobalContext";

const HomeScreen = ({ navigation }) => {
  const appState = useRef(AppState.currentState);
  const {appEntryTimeStamp} = useContext(GlobalContext);

  const [randomJokes, setRandomJokes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const [articleLoading, setArticleLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [suggestionLoading, setSuggestionsLoading] = useState(false);
  const [suggestedArticle, setSuggestedArticle] = useState([]);
  const [userId, setUserId] = useState("");

  //this is device stoken
  const { expoPushToken } = useContext(GlobalContext);

  useEffect(() => {
    getUserID();
    getTenRandomJokes();
    getArticleList();
    //api to save device token in database
    saveDeviceToken();
  }, []);

  // =========================check app is running in background and call api if yes ==================
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        const token = await AsyncStorage.getItem("token");
        const email = await AsyncStorage.getItem("email");
        let config = {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "69420",
          },
        };

        //call this function if app goes from active to background state
        if (appState.current.match(/active/) && nextAppState === "background") {
          var exitTimeStamp = new Date();
          console.log(
            "entry time is",
            appEntryTimeStamp, //time when app was opened
            "and exit time is",
            exitTimeStamp //time when app is closed
          );
          //sending the app opening and usage time to the server
          await axios.post(`${baseURL}/user/update-timestamp`, {
            username:email,
            entryTime: appEntryTimeStamp,
            exitTime: exitTimeStamp
          }, config)
          .then(res=>console.log(res.data))
          .catch(err => console.log(err));
        }
      }
    );
    return()=>{
      subscription.remove();
    }
  },
   []);

  const saveDeviceToken = async () => {
    // console.log('save device token called with token = ', expoPushToken, 'and', userId)
    await axios
      .post(
        `${baseURL}/add-device-token`,
        {
          patientId: userId,
          token: expoPushToken,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getTenRandomJokes = async () => {
    const value = await AsyncStorage.getItem("firstName");
    setFirstName(value);
    setLoading(true);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_ten"
      );
      const jokes = await response.json();
      setRandomJokes(jokes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserID = async () => {
    const id = await AsyncStorage.getItem("id");
    setUserId(id);
  };

  const getArticleList = async () => {
    setArticleLoading(true);
    console.log(userId);

    const token = await AsyncStorage.getItem("token");
    let config = {
      headers: {
        Authorization: token,
        "ngrok-skip-browser-warning": "69420",
      },
    };
    let url = getDoctorSuggestedArticle + userId;
    await axios
      .get(url, config)
      .then((res) => {
        setArticlesList(res.data);
        setArticleLoading(false);
      })
      .catch((err) => {
        setArticleLoading(false);
        console.log(err);
      });
  };

  const goToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleRefresh = () => {
    getTenRandomJokes();
    saveDeviceToken();
  };

  const handleRefreshDoctorSuggestion = () => {
    getArticleList();
    console.log(articlesList);
  };

  return (
    <ScrollView>
      <View className="bg-cyan-500 pl-3 rounded-b-3xl">
        <View className="pt-3 mt-8 ">
          <View className="flex-row justify-between">
            <View>
              <Text className="m-4 font-bold text-xl">
                Welcome Back, <Text style={{ fontSize: 25 }}>{firstName}</Text>{" "}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                goToScreen("ProfileScreen");
              }}
            >
              <View className="mr-3">
                <Avatar.Image
                  size={50}
                  source={{
                    uri: `http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/10/Happy-Whatsapp-DP-Profile-Images-4.jpg`,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* <View className="m-3 ml-1">
            <SearchBar/>
            </View> */}
        </View>
      </View>
      <View className="flex-row bg-slate-50">
        <Carousel />
      </View>
      <View className="mt-5 ml-1 mr-2">
        <View className=" justify-between h-24 w-full bg-cyan-500 rounded-lg p-3">
          <View>
            <Text className="text-white text-xl  ">
              {" "}
              Continue With Your Progress
            </Text>
          </View>

          <Button
            icon="run"
            buttonColor="white"
            onPress={() => {
              goToScreen("SessionScreen");
            }}
          >
            Complete your journey with us..
          </Button>
        </View>
      </View>

      <View className="ml-1 mt-2 ">
        <View className="flex-row justify-between	">
          <Text className="text-xl mt-3 ml-3 font-bold">Happy Thoughts</Text>

          <TouchableOpacity onPress={handleRefresh}>
            <View className="flex-row">
              <Text className="mt-3 font-bold text-lg">Refresh</Text>
              <IconButton
                icon="refresh"
                iconColor={MD3Colors.primary20}
                size={25}
                onPress={() => {}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View className=" p-1">
              <FlatList
                data={randomJokes}
                renderItem={({ item, index }) =>
                  FlipCardComponent((item = { item }), (index = { index }))
                }
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              />
            </View>
          )}
        </>
      </View>
      <View>
        <PredefinedArticles navigation={navigation} />
      </View>

      <>
        <View className="flex-row justify-between	">
          <Text className="text-xl mt-3 ml-3 font-bold">
            {" "}
            Your companion's suggestions
          </Text>

          <TouchableOpacity onPress={handleRefreshDoctorSuggestion}>
            <View className="flex-row">
              <Text className="mt-3 font-bold text-lg">Refresh</Text>
              <IconButton
                icon="refresh"
                iconColor={MD3Colors.primary20}
                size={25}
                onPress={() => {}}
              />
            </View>
          </TouchableOpacity>
        </View>

        {articleLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          articlesList.length > 0 && (
            <View className="ml-1 mt-2 ">
              <FlatList
                data={articlesList}
                renderItem={({ item }) => (
                  <ArticleComponent
                    item={{ item: item, navigation: navigation }}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              />
            </View>
          )
        )}
      </>
    </ScrollView>
  );
};
export default HomeScreen;
