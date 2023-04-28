import React, { useContext, useEffect, useRef } from 'react'
import {  } from "firebase/firestore"
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

function OneMessage({message}) {
  const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext)
  const currentUser = loggedinUser.user;

  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollView({behaviour:"smooth"})
  }, [message]);

  return (
    <div className={`message ${message.senderId === currentUser.id && "owner"}`}>
        <div className='message-info'>
            <span>Date</span>
        </div>
        <div className='message-content'>
            <p>{message.text}</p>
        </div>
    </div>
  )
}

export default OneMessage;