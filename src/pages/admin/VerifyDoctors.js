import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import Accordion from 'react-bootstrap/Accordion'
import { baseURL, unverifiedDoctorsURL, verifyDoctorURL } from '../../assets/URLs';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AdminComponent from './AdminDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctor, updateDoctorState } from '../../reducers/doctors/doctorReducer';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

function VerifyDoctors() {

    const [doctor, setDoctor] = useState({});
    // const token = localStorage.getItem('jwt-token');
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext);
    const unverifiedDoctors = useSelector((state)=>state.doctors.value);
    const dispatch = useDispatch();
    const token = loggedinUser.token;

    const config = {
        headers:{
            Authorization: token,
            'ngrok-skip-browser-warning': true
        }
      };

    useEffect(()=>{
        getUnverifiedDoctors();
    },[]);

    const getUnverifiedDoctors = async() => {

        await axios.get(`${unverifiedDoctorsURL}`, config)
        .then((response) => {
            console.log(response.data);

            dispatch(
                updateDoctorState(response.data)
            )
        })
        .catch(error => {
            console.log(error);
        })
    }

    const verifyDoctor = async(id) => {
        console.log(id);
        await axios.post(`${verifyDoctorURL}`,{
            doctorId: id
        },config)
        .then((response)=>{
            console.log(response.data);
            createChatsDB(doctor?.id);
            dispatch(
                deleteDoctor({id: doctor?.id})
            )
        })
        .catch((err)=>{console.log(err)});
    }

    const createChatsDB = async(id) => {
            //creating userChats to get track of the last set messages in userChats collection for a doctor,
            // only initialize when doctor is verified 
            console.log(id)
            await setDoc(doc(db, "userChats", `${id}`), {});
    }


  return (
    <>
    <div className='sticky-top'>
        <AdminComponent />
    </div>
    <div className="container-fluid">
        <div className='col-sm-10 offset-sm-1'>
        <h4 className='mt-5'>List of Unverified Doctors</h4>
        <div className="row d-flex justify-content-center">
        {
            unverifiedDoctors?.map((doctor, index) => {
                return(
                    <Accordion key={index}>
                        <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                            <div key={doctor.id} className="col-12 row align-items-center justify-content-between p-2 my-2">
                              <img
                                alt="doctor profile image"
                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                width="50"
                                height="50"
                                className="d-inline-block col-md-auto col-2"
                                />                            
                                <div className="col-sm-2" >{doctor.firstName} {doctor.middlename} {doctor.lastName}</div>
                                <div className="col-sm-2" ><b>Specialisation:</b><br /> {doctor.specialisation}</div>
                                <div className="col-sm-2" ><b>Registration Number</b>:<br /> {doctor.registrationNumber}</div>
                                <div className="col-sm-2" ><b>Contact:</b><br /> {doctor.contact}</div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className='row'>
                                <i className='col-12 my-3 border-bottom'>Personal Information</i>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Name: </b>{doctor?.firstName} {doctor?.middlename} {doctor?.lastName}</div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Email: </b>{doctor?.email} </div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Gender: </b>{doctor?.gender} </div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Languages Spoken: </b>
                                {
                                    doctor?.languages.map(lan => (
                                        {lan,}
                                        ))
                                    }
                                </div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Address: </b>{doctor?.address} </div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Contact: </b>{doctor?.contact} </div>
                            </div>
                            <div className='row mt-2'>
                                <i className='col-12 my-3 border-bottom'>Professional Information</i>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Degree: </b>{doctor?.degree}</div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Specialisation: </b>{doctor?.specialisation} </div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Experience: </b>{doctor?.experience} </div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Registration Number: </b>{doctor?.registrationNumber} </div>
                                <div className='col-md-4 col-sm-6 col-12 mt-2'><b>Registration Stamp: </b>{doctor?.registrationStamp} </div>
                                <div className='row mt-5 float-end'>
                                    <button 
                                        className='btn btn-success'
                                        onClick={() => {
                                            // setDoctor(doctor)
                                            verifyDoctor(doctor.id);
                                        }}
                                    >
                                        Verify Doctor
                                    </button>
                                </div>
                            </div>
                            
                        </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            })
        }
        </div>
    </div>
    </div>
    </>
  )
}

export default VerifyDoctors;