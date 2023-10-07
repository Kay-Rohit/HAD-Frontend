import React, { useState, useEffect, useCallback } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { View } from "react-native";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  onSnapshot,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RequestDoctorScreen from "./RequestDoctorScreen";
import { getUserProfile } from '../services/URLs';
import axios from "axios";

export function ChatScreen({navigation}) {


  const [isModelVisible, setIsModelVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [doctorAssigned, setDoctorAssigned] = useState(true);
  // const patientId = "38dbfec8-4a72-48a0-bca0-92f21db6840e";
  // const doctorId = "f8044340-3290-4c44-b2f2-f66f1683838a"; //userid+doctorid = combined id -> used to uniquely identify chats
  // const chatID = `chat-${doctorId}+${patientId}`;

  // const [docId, setDocId] = useState("");
  const [patId, setpatId] = useState("");
  const [chatId, setChatId] = useState("");
  const [useChat, setUseChat] = useState(false);
  const [patName, setPatName] = useState('');


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
          setDoctorAssigned(false);
        } else {
          setDoctorAssigned(true);
        }
    })
      .catch(err => {
        console.log(err)});
    };

    
  useEffect(() => {
    getUserProfileData();
  }, [])
  

  const closeModel=()=>{
    navigation.reset({
      index: 0,
      routes: [{ name: 'LandingScreen'}],
    });
  }

  //this function initializes the chat details required for connecting to the firease
  const createChat = async () => {
    //initializing doctorid and patient id for use
    const doctorID = await AsyncStorage.getItem("assignedDoctorId");
    const patientID = await AsyncStorage.getItem("id");
    const firstName = await AsyncStorage.getItem('firstName');
    const middleName = await AsyncStorage.getItem('middleName');
    const lastName = await AsyncStorage.getItem('lastName');
    const chat_id = `chat-${doctorID}+${patientID}`;
    setChatId(chat_id);
    if (doctorID === null) {
      setDoctorAssigned(false);
    } else {
      setDoctorAssigned(true);
      setpatId(patientID);
      setPatName(`${firstName} ${middleName} ${lastName}`);
      setUseChat(true);
    }
  };

  useEffect(() => {

    //this function is used to initialize doctor, patient and chat IDs
    (async() => {
      await createChat();
    })();

    if (useChat) {
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        const allMessages = doc.data().messages;

        //sorting all messages by timestamp
        allMessages.sort(function (x, y) {
          return y.createdAt - x.createdAt;
        });
        doc.exists() &&
          setMessages(
            allMessages?.map((msg) => {
              return {
                ...msg,
                createdAt: msg.createdAt.toDate(), //converting firebase Timestamp to Date -> required by gifted chats
              };
            })
          );
      });

      return () => {
        //unsubscribe from firebase -> stop listening
        unsub();
      };
    }
  }, [useChat]);

  const onSend = async (messageArray) => {
    const msg = messageArray[0];
    const myMsg = {
      ...msg,
      senderId: patId,
    };
    try {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messageArray)
      );
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          ...myMsg,
          createdAt: Timestamp.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {doctorAssigned ? (
        <View style={{ flex: 1 }} className="mt-8">
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: patId,
              name: patName,
            }}
            renderBubble={(props) => {
              return (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    right: {
                      backgroundColor: "grey",
                    },
                  }}
                />
              );
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }} className="mt-8">
          <RequestDoctorScreen visible={true} onClose={closeModel} />
        </View>
      )}
    </>
  );
}

export default ChatScreen;
