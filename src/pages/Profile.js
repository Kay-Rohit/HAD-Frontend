import React, { useContext } from 'react';

import Sidebar from "../components/Sidebar";
import { LoggedInUserContext } from '../context/LoggedInUserContext';

const Profile = () => {
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext);
    // const token = localStorage.getItem('jwt-token');
    // const user = JSON.parse(localStorage.getItem('user'));

    const token = loggedinUser.token;
    const user = loggedinUser.user;
    const doctor_name = `${user.firstName} ${user.middleName} ${user.lastName}`;

    let config = {
        headers: {
            Authorization: token,
            'ngrok-skip-browser-warning':'true'
        }
    }

    // console.log(user);
    return (
        <Sidebar name={doctor_name}>
            <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h4 className="dark-color mt-md-2">Hello! {user.firstName} {user.middleName} {user.lastName}</h4>
                            <h6 className="theme-color lead">A leading {user.specialisation} &amp; based in India</h6>
                            {/* <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p> */}
                            <div className="row about-list">
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>Specialisation</label>
                                        <p>{user.specialisation}</p>
                                    </div>
                                    <div className="media">
                                        <label>Degree</label>
                                        <p>{user.degree}</p>
                                    </div>
                                    <div className="media">
                                        <label>Experience</label>
                                        <p>{user.experience} yrs</p>
                                    </div>
                                    <div className="media">
                                        <label>Address</label>
                                        <p>{user.address}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>E-mail</label>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="media">
                                        <label>Phone</label>
                                        <p>{user.contact}</p>
                                    </div>
                                    <div className="media">
                                        <label>Registration Number</label>
                                        <p>{user.registrationNumber}</p>
                                    </div>
                                    <div className="media">
                                        <label>Verified</label>
                                        <p>{
                                            (user.verified) ? "Yes" : "No" 
                                            }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
                        </div>
                    </div>
                </div>
                <div className="counter">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="500" data-speed="500">{user.userList.length}</h6>
                                <p className="m-0px font-w-600">Active Patients</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="150" data-speed="150">{user.rating}</h6>
                                <p className="m-0px font-w-600">Star rating</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="850" data-speed="850">{user.patientLimit}</h6>
                                <p className="m-0px font-w-600">Patient count limit</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="190" data-speed="190">{user.patientCount}</h6>
                                <p className="m-0px font-w-600">Sucess stories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </Sidebar>
    );
}
 
export default Profile;