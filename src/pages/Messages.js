import { useContext } from "react";
import Chat from "../components/chat/Chat";
import Side from "../components/chat/Side";
import Sidebar from "../components/Sidebar";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

const Messages = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext)
    const doctor_name = `${loggedinUser.user.firstName} ${loggedinUser.user.middleName} ${loggedinUser.user.lastName}`;
    return (
        <>
            <Sidebar name={doctor_name}>
                <div className="home mx-2">
                    <Side />
                    <Chat/>
                </div>
            </Sidebar>
        </>
    );
}

 
export default Messages;