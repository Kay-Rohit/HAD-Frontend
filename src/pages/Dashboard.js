import Sidebar from '../components/Sidebar'
import axios from 'axios'
// import ProgressBar from 'react-bootstrap/ProgressBar'

import Requests from '../components/Requests';
import {requestsURL} from '../assets/URLs';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRequestState } from '../reducers/requests/requestReducer';
import { LoggedInUserContext } from '../context/LoggedInUserContext';


const Dashboard = ({token, user}) => {

    const dispatch = useDispatch();
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext)

    // token = localStorage.getItem('jwt-token');
    // user = JSON.parse(localStorage.getItem('user'));

    token = loggedinUser.token;
    user = loggedinUser.user;

    useEffect(() => {
        fetchRequests();
    }, []);

    let config = {
        headers: {
            Authorization: `${token}`,
            'ngrok-skip-browser-warning':'true'
        }
    }

    async function fetchRequests(){
        await axios.get(`${requestsURL}${user.id}`,config)
            .then((response) => {
                console.log("requests returned",response.data);

                //save the requests in redux 
                dispatch(
                    updateRequestState(response.data)
                )
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const doctor_name = `${user?.firstName} ${user?.middleName} ${user?.lastName}`;

    return ( 
        <>
        <Sidebar name={doctor_name}>
        <div className="container-fluid p-5" style={{height:"80vh"}}>
            <div style={{backgroundColor:"#d8d9d8"}} className='row col-sm-6 justify-content-center'>
                <h5 style={{margin:'5px 5px'}} className='row'>My Dashboard</h5>
                <div className="col col-md-5 m-2" style={{backgroundColor:"#bfbebe"}}>
                    <div className="row align-items-start p-2">Active Patients</div>
                    <h4 className="row align-items-end p-2">{user?.userList?.length}</h4>
                </div>
                <div className="col col-md-5 m-2" style={{backgroundColor:"#bfbebe"}}>
                    <div className="row align-items-start p-2">Total Patients</div>
                    <h4 className="row align-items-end p-2">{user?.patientCount}</h4>
                </div>
            </div>
            <div style={{backgroundColor:"#d8d9d8", overflow:"auto"}} className='row justify-content-center py-2 mt-5'>
                <div className="col-12">
                    <h5>Requests</h5>
                </div>
                <Requests token={token} id={user.id}/>
            </div>
        </div>
        </Sidebar>
        </>
    );
}
 
export default Dashboard;