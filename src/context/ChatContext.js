import {
    createContext,
    useContext,
    useReducer,
  } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    // const currentUser = JSON.parse(localStorage.getItem('user'));
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext);
    const currentUser = loggedinUser.user;
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:`chat-${currentUser.id}+${action.payload.uid}`
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };