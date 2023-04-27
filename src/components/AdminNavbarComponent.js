import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { LoggedInUserContext } from '../context/LoggedInUserContext';

function AdminNavbarComponent() {
    const navigate = useNavigate();
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext)
  return (
    <div className=''>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">ADMIN PORTAL</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                    <a className='nav-link' onClick={() => {
                        navigate("/admin")
                    }} >Home</a>
                    </li> */}
                    <li className="nav-item">
                    <a className='nav-link' onClick={() => {
                        navigate("/verify");
                    }} >Doctors</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link">Add Content</a>
                    </li>
                </ul>
                <span className="navbar-text">
                    <button className='btn btn-sm btn-primary'
                        onClick={() => {
                            setLoggedinUser({...loggedinUser, token:null, role:null, user:{}});
                            navigate("/login")
                        }}
                    >Logout</button>
                </span>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default AdminNavbarComponent