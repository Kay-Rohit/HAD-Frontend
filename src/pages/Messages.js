import Chat from "../components/chat/Chat";
import Side from "../components/chat/Side";
import Sidebar from "../components/Sidebar";

const Messages = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const doctor_name = `${user.firstName} ${user.middleName} ${user.lastName}`;
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