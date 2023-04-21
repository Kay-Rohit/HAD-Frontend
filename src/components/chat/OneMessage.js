import React, { useEffect, useRef } from 'react'
import {  } from "firebase/firestore"

function OneMessage({message}) {
  const currentUser = JSON.parse(localStorage.getItem('user'));

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