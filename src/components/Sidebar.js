import React, { useContext } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink , Link} from 'react-router-dom';
import {AiOutlineLogout} from 'react-icons/ai'
import Header from './Header';
import { LoggedInUserContext } from '../context/LoggedInUserContext';


const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: "columns"
  },
  {
    name: "Patients",
    path: "/patients",
    icon: "users"
  },
  {
    name: "Messages",
    path: "/chats",
    icon: "comments"
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "user-md"
  },
]

const Sidebar = (props) => {
  const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext)
  const name=props.name;
  return (
    <div className='main-cnt'>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#000000" backgroundColor="#d9d9d9">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              Welcome Doctor!
            </a>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              {
                routes.map((route, index) => (
                  <div key={index} className='navLink'>
                    <NavLink exact to={route.path} activeclassname="activeClicked">
                      <CDBSidebarMenuItem icon={route.icon} textColor="#000000">{route.name}</CDBSidebarMenuItem>
                    </NavLink>
                  </div>
                ))
              }
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
              <Link to={`/login`}>
                <button className='btn btn-secondary'
                  onClick={()=>{
                    setLoggedinUser({...loggedinUser, role:null, token:null, user:{}});
                  }}
                >Logout <icon><AiOutlineLogout/></icon></button>
              </Link>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
        <div className='page-components w-100'>
          <Header name={name}/>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;