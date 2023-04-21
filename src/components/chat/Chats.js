import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import {db} from '../../config/FirebaseConfig';
import { ChatContext } from '../../context/ChatContext';

function Chats() {

    const {dispatch} = useContext(ChatContext);
    const [chats, setChats] = useState([{}]);
    useEffect(()=>{
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const unsub = onSnapshot(doc(db, "userChats", `${currentUser.id}`), (doc) => {
            setChats(doc.data());
            console.log(doc.data())
        });

        return ()=>{
            unsub();
        };

    }, []);

    const handleSelect = (u) => {
        console.log(u)
        dispatch({type:"CHANGE_USER", payload: u});
    };

    // console.log(Object.entries(chats[0]));

  return (
    <div className='chats'>
        {
            (chats.length !== 0) ?
            Object?.entries(chats)?.map((chat)=>{
                console.log("from chats", chat[1].userInfo?.name)
                return(
                    <div className='user-chat p-2 mx-2 border' key={chat[0]} style={{borderColor:"#6c757d"}}>
                        <img src="" alt=""/>
                        <div className='user-chat-info' onClick={() => handleSelect(chat[1].userInfo)}>
                            <span className='text-capitalize' 
                                style={{fontWeight:"bold"}}
                            >
                                {chat[1].userInfo?.name}
                            </span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                );
            }) : (
                null
            )
        }
    </div>
  )
}

export default Chats;