import { async } from '@firebase/util';
import { npm, doc, serverTimestamp, Timestamp, updateDoc , arrayUnion} from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { ChatContext } from '../../context/ChatContext'
import {v4 as uuid} from 'uuid'
import {db} from '../../config/FirebaseConfig'

function InputField() {

  const [text, setText] = useState("");

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const {data} = useContext(ChatContext);

  const handleSend = async() => {
    console.log("Inside handle send")

    //updating chats
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        _id: uuid(),
        text,
        senderId: currentUser.id,
        createdAt:Timestamp.now(),
        user:{
          _id: currentUser.id,
          name: `${currentUser.firstName} ${currentUser.lastName}` 
        }
      })
    });

    //updating user chats
    await updateDoc(doc(db, "userChats", `${currentUser.id}`), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    });

    setText("");
  
  
  // await updateDoc(doc(db, "userChats", `${data.user.id}`), {
  //   [data.chatId + ".lastMessage"]:{
  //     text
  //   },
  //   [data.chatId+".date"]: serverTimestamp()
  // });
  };

  const handleKey = e => {
    //if user press enter
    e.code==='Enter' && handleSend();
  };

  return (
    <div className='__input p-3 mx-5 mb-5'>
        <input className='send__input' type="text" placeholder='Type Here' style={{width:"80%"}}
          onChange={(e)=>setText(e.target.value)}
          value={text}
          onKeyDown={handleKey}
        />
        <div className='send'>
            <button 
              className='btn btn-primary'
              onClick={handleSend}
            >
              Send
            </button>
        </div>
    </div>
  )
}

export default InputField;