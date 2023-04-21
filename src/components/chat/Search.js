import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import {db} from '../../config/FirebaseConfig'
import { ChatContext } from '../../context/ChatContext';

function Search() {
  
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const {data} = useContext(ChatContext)

  const handleSearch = async() =>{

      //serach for registered patients
      const q = query(collection(db, `doc-${currentUser.id}`), where("name", "==", username))

      try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUser(doc.data());
        });
      }
      catch(error){
        console.log(error);
      }
  };

  //enter key will trigger this action
  const handleKey = e => {
    e.code==='Enter' && handleSearch();
  };

  const handleSelect = async() => {
    //check whether group exists or not (group - chats collection in firestore), if doen't exist. create new one 
    //chatid = "chat-<doctorid>+<patientid>"
    const combinedId = `chat-${currentUser.id}+${user.uid}`

    try{

      const res = await getDoc(doc(db,"chats", combinedId));
      console.log(res.exists());
      console.log("from search",data.chatId);

      //check if chats already exists ?
      if(!res.exists()){

        //creat new chat
        await setDoc(doc(db, "chats", combinedId),{messages: []});

        // The below is our structure
        // userChats:{
        //   user's id:{
        //     combinedId:{
        //       userInfo:{
        //          dn, id
        //       },
        //       lastMessage:"",
        //       date:
        //     }
        //   }
        // }
        await updateDoc(doc(db, "userChats", currentUser.id), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            name: user.name
          },
          [combinedId+".date"]:serverTimestamp()
        });

        //for making an empty user chats, as it is responsible for populating already available chats
        await updateDoc(doc(db, "userChats", user.id), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.name
          },
          [combinedId+".date"]:serverTimestamp()
        });

      }
    }
    catch(error){
        console.log(error);
    }
    
    setUser(null);
    setUsername("");
  }

  return (
    <div className='search-bar p-3'>
        <h5>Messsages</h5>
        <div className='searchForm mt-3'>
            <input
              type="text"
              placeholder='New Chat'
              className='search__input'
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)} 
              value={username}
            />
        </div>
        <div className='user-search' onClick={handleSelect}>
            <img src="" alt=""/>
            <div className='user-chat-info'>
                <span>{user?.name}</span>
            </div>
        </div>
    </div>
  )
}

export default Search;