import React, { useContext, useState } from "react";

import Sidebar from "../components/Sidebar";
import { LoggedInUserContext } from "../context/LoggedInUserContext";

import { FaUserEdit } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { BsCheck2All, BsCheckAll } from "react-icons/bs";
import axios from "axios";
import { baseURL } from "../assets/URLs";

const Profile = () => {
  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext);
  const user = loggedinUser.user;
  const token = loggedinUser.token;
  const doctor_name = `${user.firstName} ${user.middleName} ${user.lastName}`;

  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  
  const [updateUserDetails, setUpdateUserDetails] = useState({
    doctorID: user?.id,
    address: user?.address,
    contact: user?.contact,
    degree: user?.degree,
    patientLimit: user?.patientLimit,
    specialization: user?.specialisation,
  });

  //for modal ============================
  const [showResetPass, setShowResetPass] = useState(false);
  const handleCloseResetPass = () => setShowResetPass(false);
  const handleShowResetPass = () => setShowResetPass(true);

  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  const handleCloseUpdateDetails = () => setShowUpdateDetails(false);
  const handleShowUpdateDetails = () => setShowUpdateDetails(true);
  // ======================================

  let config = {
    headers: {
      Authorization: token,
      "ngrok-skip-browser-warning": "true",
    },
  };

  const updateUserPassword = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${baseURL}/doctor/reset-password`,
        {
          email: user?.email,
          password: resetPasswordDetails.newPassword,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        handleCloseResetPass();
        swal(
          "Password reset Successfull",
          "Please Login again with your new password",
          "success"
        );
        setLoggedinUser({ ...loggedinUser, role: null, token: null, user: {} });
      })
      .catch((err) => console.log(err));
  };


  const updateDoctorDetails = async(e) => {
    e.preventDefault();
    await axios
      .post(
        `${baseURL}/doctor/update/profile`,
        updateUserDetails,
        config
      )
      .then((res) => {
        console.log(res.data);
        handleCloseResetPass();
        swal(
          "Success",
          "Updated Details Successfully",
          "success"
        );
      })
      .catch((err) => console.log(err));
  };

  // console.log(user);
  return (
    <Sidebar name={doctor_name}>
      <section className="section about-section gray-bg" id="about">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <div className="about-avatar p-5 mx-5 my-4 ">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  title=""
                  alt=""
                />
              </div>

              <div className="about-text go-to">
                <h4 className="dark-color text-center">
                  Dr. {user.firstName} {user.middleName} {user.lastName}
                </h4>
                <h6 className="theme-color lead text-center mb-3">
                  Specialises in {user.specialisation}
                </h6>
              </div>
              <div>
                <div className="counter mt-4">
                  <div className="row justify-content-around">
                    <div className="col-6 px-5 mt-4 mb-2">
                      <div className="count-data text-center border rounded">
                        <h6 className="count h2" data-to="500" data-speed="500">
                          {user.userList.length}
                        </h6>
                        <p className="m-0px font-w-600">Active Patients</p>
                      </div>
                    </div>
                    <div className="col-6 px-5 mt-4 mb-2">
                      <div className="count-data text-center border rounded">
                        <h6 className="count h2" data-to="850" data-speed="850">
                          {user.patientLimit}
                        </h6>
                        <p className="m-0px font-w-600">Patient count limit</p>
                      </div>
                    </div>
                    <div className="col-6 px-5 mt-4 mb-2">
                      <div className="count-data text-center border rounded">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleShowResetPass}
                        >
                          Reset Your Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p> */}
            <div
              className="card col px-5 py-4 m-5"
              style={{ backgroundColor: "#d8d9d8" }}
            >
              <div className="row about-list">
                <div className="d-flex justify-content-between">
                  <h5>Professional Details</h5>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleShowUpdateDetails}
                  >
                    <FaUserEdit /> Edit Details
                  </button>
                </div>
                <div
                  className="card col-5 m-3"
                  style={{ backgroundColor: "#bfbebe" }}
                >
                  <p className="card-header text-center">Specialisation</p>
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {user.specialisation}
                    </h5>
                  </div>
                </div>
                <div
                  className="card col-5 m-3"
                  style={{ backgroundColor: "#bfbebe" }}
                >
                  <p className="card-header text-center">Degree</p>
                  <div className="card-body">
                    <h5 className="card-title text-center">{user.degree}</h5>
                  </div>
                </div>
                <div
                  className="card col-5 m-3"
                  style={{ backgroundColor: "#bfbebe" }}
                >
                  <p className="card-header text-center">Experience</p>
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {user.experience} years
                    </h5>
                  </div>
                </div>
                <div
                  className="card col-5 m-3"
                  style={{ backgroundColor: "#bfbebe" }}
                >
                  <p className="card-header text-center">Verified</p>
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {user.verified ? "Yes" : "No"}
                    </h5>
                  </div>
                </div>
                <h5 className="my-4">Contact</h5>

                <h6>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-house"
                    viewBox="0 0 15 19"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                  </svg>{" "}
                  Address{" "}
                </h6>

                <p className="mb-4">{user.address}</p>
                <h6>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="20"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 13 19"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>{" "}
                  E-mail
                </h6>
                <p className="mb-4">{user.email}</p>
                <h6>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="currentColor"
                    className="bi bi-telephone"
                    viewBox="0 0 13 17"
                  >
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>{" "}
                  Phone{" "}
                </h6>
                <p className="mb-4">{user.contact}</p>

                <h6>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-file-earmark-medical"
                    viewBox="0 0 13 19"
                  >
                    <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V5.5zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                  </svg>{" "}
                  Registration Number
                </h6>
                <p className="mb-4">{user.registrationNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor reset password */}
      <Modal
        show={showResetPass}
        onHide={handleCloseResetPass}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset your password!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateUserPassword}>
            <label className="form-label mb-3" htmlFor="email">
              Your registered email address
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              // placeholder="Enter new password"
              value={user?.email}
              // onChange={(event) => setEmail({...resetPasswordDetails,newPassword:event.target.value})}
              readOnly
            />
            <div className="row">
              <div className="col-lg col-12">
                <label className="form-label mt-3" htmlFor="email">
                  Enter your new password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={resetPasswordDetails.newPassword}
                  onChange={(event) =>
                    setResetPasswordDetails({
                      ...resetPasswordDetails,
                      newPassword: event.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-lg col-12">
                <label className="form-label mt-3" htmlFor="email">
                  Confirm password
                </label>
                <div className="d-flex justify-content-between">
                  <label>
                    {resetPasswordDetails.newPassword ===
                      resetPasswordDetails.confirmPassword &&
                      resetPasswordDetails.confirmPassword !== "" && (
                        <BsCheckAll />
                      )}
                  </label>
                  <input
                    type="passowrd"
                    id="new_password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={resetPasswordDetails.confirmPassword}
                    onChange={(event) =>
                      setResetPasswordDetails({
                        ...resetPasswordDetails,
                        confirmPassword: event.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={
                resetPasswordDetails.confirmPassword === "" ||
                resetPasswordDetails.newPassword === "" ||
                resetPasswordDetails.newPassword !==
                  resetPasswordDetails.confirmPassword
              }
            >
              Reset Password
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Doctor update profile */}
      <Modal
        show={showUpdateDetails}
        onHide={handleCloseUpdateDetails}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update your profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={() => {}}>
            <div className="row">
              <div className="col-lg col-12">
                <label className="form-label mt-3" htmlFor="contact">
                  Update your contact
                </label>
                <input
                  type="text"
                  id="contact"
                  className="form-control"
                  value={updateUserDetails.contact}
                  onChange={(event) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      contact: event.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-lg col-12">
                <label className="form-label mt-3" htmlFor="limit">
                  Update Patient Limit
                </label>
                <input
                  type="number"
                  id="limit"
                  className="form-control"
                  value={updateUserDetails.patientLimit}
                  onChange={(event) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      patientLimit: event.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="col-12">
            <label className="form-label mt-3" htmlFor="address">
                  Update Address
                </label>
              <textarea
                type="text"
                id="address"
                className="form-control"
                placeholder="Clinic Address"
                value={updateUserDetails.address}
                onChange={(event) =>
                  setUpdateUserDetails({
                    ...updateUserDetails,
                    address: event.target.value,
                  })
                }
                required
              />
            </div>
            <div className="row">
                <div className="col-lg col-12">
                <label className="form-label mt-3" htmlFor="degree">
                  Update Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  className="form-control"
                  value={updateUserDetails.degree}
                  onChange={(event) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      degree: event.target.value,
                    })
                  }
                  required
                />
                </div>
                <div className="col-lg col-12">
                <label className="form-label mt-3" htmlFor="specialisation">
                  Update your Specialisation
                </label>
                <input
                  type="text"
                  id="specialisation"
                  className="form-control"
                  value={updateUserDetails.specialization}
                  onChange={(event) =>
                    setUpdateUserDetails({
                      ...updateUserDetails,
                      specialization: event.target.value,
                    })
                  }
                  required
                />
                </div>
            </div>
            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={
                updateUserDetails.address==="" ||
                updateUserDetails.contact==="" ||
                updateUserDetails.degree==="" ||
                updateUserDetails.patientLimit==="" ||
                updateUserDetails.specialization===""
              }
            >
              Update Details
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </Sidebar>
  );
};

export default Profile;
