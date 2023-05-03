// import avatar from "../assets/avatar.png"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { allPatientsURL } from "../assets/URLs";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { updateUserState } from "../reducers/users/userReducer";

import Card from "react-bootstrap/Card";
import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import ProgressBar from "react-bootstrap/esm/ProgressBar";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Patients = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const patients = useSelector((state) => state.users.value);
  const [query, setQuery] = useState("");
  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    fetchPatients();
  }, []);

  const token = loggedinUser.token;
  const user = loggedinUser.user;

  const doctor_name = `Dr. ${user.firstName} ${user.middleName} ${user.lastName}`;

  let config = {
    headers: {
      Authorization: token,
      "ngrok-skip-browser-warning": "true",
    },
  };

  async function fetchPatients() {
    await axios
      .get(`${allPatientsURL}${user.id}`, config)
      .then((response) => {
        console.log("My patients", response.data);
        dispatch(updateUserState(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Sidebar name={doctor_name}>
      <div
        className="container-fluid mt-3"
        style={{ overflow: "auto", height: "80%" }}
      >
        <div className="search__container col-md-3 mx-md-4 col-12">
          <input
            className="search__input"
            type="text"
            placeholder="Search Patient"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {/* <div className="row m-3 align-items-center">
            {
              patients?.filter(patient => {
                if (query === '') {
                  return patient;
                } else if (patient.firstName.toLowerCase().includes(query.toLowerCase())) {
                  return patient;
                }
                else if (patient.lastName.toLowerCase().includes(query.toLowerCase())) {
                  return patient;
                }
              }).map((patient) => (
                  <Card border="light" className="col-md-3 col-12 col-sm-6 p-3 my-2" key={patient.id}>
                      <Card.Header>
                          <div className='avatar rounded-circle'>
                              <img alt="image" src={avatar} style={{objectFit:"contain", width:"25%"}}/>
                          </div>
                          <div className=''>
                              <Card.Title>{patient.firstName} {patient.lastName}</Card.Title>
                              <Card.Text>Patient ID: {patient.id}</Card.Text>
                          </div>
                      </Card.Header>
                      <div className='my-2'>
                          <div style={{backgroundColor:"#d8d8d9"}} className="p-2">
                              <Card.Text>
                                  mail: {patient.email} <br/>
                                  gender: {patient.gender}
                              </Card.Text>
                              <Link to={`/patients/${patient.id}`}>
                                <button className='btn btn-secondary'>More</button>
                              </Link>
                          </div>
                      </div>
                  </Card>
            ))
            }
          </div> */}
        <div className="row m-3 align-items-center">
          {patients
            ?.filter((patient) => {
              if (query === "") {
                return patient;
              } else if (
                patient.firstName.toLowerCase().includes(query.toLowerCase())
              ) {
                return patient;
              } else if (
                patient.lastName.toLowerCase().includes(query.toLowerCase())
              ) {
                return patient;
              }
            })
            .map((patient, index) => (
              <Accordion key={index}>
                <Accordion.Item eventKey={index} className="m-1">
                  <Accordion.Header>
                    <div
                      key={patient?.id}
                      className="col-12 row align-items-center justify-content-between p-2 my-2"
                    >
                      <img
                        alt="user profile image"
                        src={avatar}
                        width="50"
                        height="50"
                        className="d-inline-block col-md-auto col-2"
                      />
                      <div className="col-sm-2">
                        <b>
                          {patient?.firstName} {patient?.lastName}
                        </b>
                      </div>
                      <div className="col-sm-6 ">
                        <div className="md-3">Current Severity:</div>

                        {
                          <ProgressBar
                            variant={
                              patient?.depressionSeverity < 60
                                ? patient?.depressionSeverity < 30
                                  ? "success"
                                  : "warning"
                                : "danger"
                            }
                            now={patient?.depressionSeverity}
                          />
                        }
                      </div>
                      <div className="col-sm-2">
                        Gender: <b>{patient?.gender}</b>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row justify-content-center">
                      <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                        <b>Contact: </b>
                        {patient?.contact}{" "}
                      </div>

                      <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                        <b>DOB: </b>
                        {patient?.dob}{" "}
                      </div>
                      {/* <div className="col-md-4 col-sm-6 col-12 mt-2">
                        <b>Patient ID: </b>
                        {patient?.id}
                      </div> */}
                      <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                        <b>Email: </b>
                        {patient?.email}{" "}
                      </div>

                      <div className="col-md-3 col-sm-6 col-12 mt-2 justify-content-center">
                        <b>Address: </b>
                        {patient?.address === null ? "NA" : patient?.address}
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-5 justify-content-center">
                        {" "}
                        <div className="row justify-content-center">
                          <b>Current week:</b>
                        </div>
                        <div
                          className="row mx-1"
                          style={{ width: 100, height: 100 }}
                        >
                          <CircularProgressbar
                            value={patient?.weekDone + 1}
                            maxValue={5}
                            text={patient?.weekDone + 1}
                          />
                        </div>
                      </div>
                      <div className="col-4 justify-content-center">
                        {" "}
                        <div className="row">
                          <b>Current session:</b>
                        </div>
                        <div
                          className="row mx-2"
                          style={{ width: 100, height: 100 }}
                        >
                          <CircularProgressbar
                            value={patient?.sessionDone + 1}
                            maxValue={5}
                            text={patient?.sessionDone + 1}
                          />
                        </div>
                      </div>
                      <div className="col-2 px-1 py-3">
                        <Link to={`/patients/${patient.id}`}>
                          <button className="btn btn-secondary">
                            More Patient Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default Patients;
