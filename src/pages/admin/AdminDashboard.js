import React, { useContext } from 'react'
import AdminNavbarComponent from '../../components/AdminNavbarComponent';
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

function AdminComponent() {
  // const role = localStorage.getItem('role');
  const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext)
  return (
    <div>
      {
        (loggedinUser.role === 'ROLE_ADMIN') ? (
          <AdminNavbarComponent />
        ) : (
          <div>
            <h2>ERROR ONLY ADMINS CAN ACCESS THIS PAGE</h2>
          </div>
        )
      }
    </div>
  )
}

export default AdminComponent;