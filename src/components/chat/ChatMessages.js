import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react'
import OneMessage from './OneMessage'
import {db} from '../../config/FirebaseConfig'
import { ChatContext } from '../../context/ChatContext';

function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);
  console.log("chat id",data.chatId);

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data());
    });

    return ()=>{
      unsub();
    }
  }, [data.chatId]);

  console.log(messages);
  return (
    <div className='__chat p-3 mx-5 overflow-auto'>
      {
        messages.messages?.map((msg, index) => {
          return(
            <OneMessage message={msg} key={index}/>
          )
        })
      }
    </div>
  )
}

export default ChatMessages;