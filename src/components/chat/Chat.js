import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext';
import ChatMessages from './ChatMessages'
import InputField from './InputField'

function  Chat() {
  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className='chat-info p-3 border-dark border-bottom mx-5 pb-2'>
        <h3 className='mx-2 text-bolder text-capitalize'>{data.user?.name}</h3>
        <div className='chatIcons'></div>
      </div>
        <ChatMessages />
        <InputField />
    </div>
  )
}

export default  Chat