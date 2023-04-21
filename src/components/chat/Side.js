import React from 'react'
import Chats from './Chats';
import Search from './Search';

function Side() {
  return (
    <div className='side'>
      <Search />
      <Chats />
    </div>
  )
}

export default Side;