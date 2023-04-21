import React from 'react'
import AdminNavbarComponent from '../../components/AdminNavbarComponent';

function AdminComponent() {
  const role = localStorage.getItem('role');
  return (
    <div>
      {
        (role === 'ROLE_ADMIN') ? (
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