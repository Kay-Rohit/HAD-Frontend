import Sidebar from "../components/Sidebar";
import UsageTimeChart from "../components/UsageTimeChart";
import SeverityChart from "../components/SeverityChart";
import axios from "axios";
import { barChartData, severityData } from "../fakeData";
// import ProgressBar from 'react-bootstrap/ProgressBar'
import { FiRefreshCw } from "react-icons/fi";
import Requests from "../components/Requests";
import { baseURL, requestsURL, severityDataURL, avgUsageURL } from "../assets/URLs";
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { updateRequestState } from "../reducers/requests/requestReducer";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { BsCheckAll } from "react-icons/bs";
import { Modal } from "react-bootstrap";

const Dashboard = ({ token, user }) => {
  const dispatch = useDispatch();
  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext);
  const [patientSeverityData, setPatientSeverityData] = useState([{}]);
  const [avgUsageData, setAvgUsageData] = useState([{}]);

  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  //for modal ============================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ======================================

  token = loggedinUser.token;
  user = loggedinUser.user;

  useEffect(() => {
    fetchRequests();
    fetchSeverityData();
    fetchUsageTime();
    if (user?.forgotPassword === true) {
      handleShow();
    }
  }, []);

  useEffect(() => {
    //function to use data as required by graph
    setSvrtyData({
      labels: patientSeverityData.map((data) => data.severityLevel),
      datasets: [
        {
          label: "Usage time",
          data: patientSeverityData.map((data) => data.count),
        },
      ],
    });
  }, [patientSeverityData]);

  useEffect(() => {
    //function to use data as required by graph
    setUsageData({
      labels: avgUsageData.map((data) => data.usageTime),
      datasets: [
        {
          label: "Usage time",
          data: avgUsageData.map((data) => data.count),
        },
      ],
    });
  }, [avgUsageData]);

  let config = {
    headers: {
      Authorization: `${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  };

  async function fetchRequests() {
    await axios
      .get(`${requestsURL}${user.id}`, config)
      .then((response) => {
        console.log("requests returned", response.data);

        //save the requests in redux
        dispatch(updateRequestState(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchSeverityData() {
    await axios
      .get(`${severityDataURL}${user.id}`, config)
      .then((response) => {
        //   console.log("severity data", response.data);
        setPatientSeverityData(response.data);
        //save the requests in redux
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //function to use data as required by graph
  const [usageData, setUsageData] = useState({
    labels: barChartData.map((data) => data.usageTime),
    datasets: [
      {
        label: "Usage time",
        data: barChartData.map((data) => data.count),
      },
    ],
  });

  //function to use data as required by graph
  const [svrtyData, setSvrtyData] = useState({
    labels: severityData.map((data) => data.severityLevel),
    datasets: [
      {
        label: "Usage time",
        data: severityData.map((data) => data.count),
      },
    ],
  });

  async function fetchUsageTime(){
      await axios.get(`https://0ee4-119-161-98-68.ngrok-free.app/analytics/allUsage/f8044340-3290-4c44-b2f2-f66f1683838a`,config)
          .then((response) => {
              console.log("usage time returned",response.data);
              setAvgUsageData(response.data);
          })
          .catch((error) => {
              console.log(error);
          })
  }

  const doctor_name = `Dr. ${user?.firstName} ${user?.middleName} ${user?.lastName}`;

  const updateUserPassword = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${baseURL}/doctor/reset-password`,
        {
          email: user?.email,
          password: resetPasswordDetails.newPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        handleClose();
        setLoggedinUser({ ...loggedinUser, role: null, token: null, user: {} });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Sidebar name={doctor_name}>
        <div
          className="container-fluid p-5"
          style={{ height: "90vh", overflow: "auto" }}
        >
          <div
            style={{ backgroundColor: "#d8d9d8" }}
            className="col row-sm-6 justify-content-center"
          >
            <h5 className="row px-4 py-3">My Dashboard</h5>
            <div className="row">
              <div className="col-8 px-5">
                <UsageTimeChart data={usageData} />
                <div className="flex-row"></div>
              </div>
              <div className="col-4">
                <SeverityChart data={svrtyData} />
              </div>
            </div>
            <div className="row mt-5 p-5">
              <div
                className="card col m-2"
                style={{ backgroundColor: "#bfbebe" }}
              >
                <h5 className="card-header">Active Patients</h5>
                <div className="card-body">
                  <h5 className="card-title">{user?.userList?.length}</h5>
                </div>
              </div>
              <div
                className="card col m-2"
                style={{ backgroundColor: "#bfbebe" }}
              >
                <h5 className="card-header">Total Patients</h5>
                <div className="card-body">
                  <h5 className="card-title">{user?.patientCount}</h5>
                </div>
              </div>
              <div
                className="card col m-2"
                style={{ backgroundColor: "#bfbebe" }}
              >
                <h5 className="card-header">Patient Limit</h5>
                <div className="card-body">
                  <h5 className="card-title">
                    {user?.patientCount}/{user.patientLimit}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#d8d9d8", overflow: "auto" }}
            className="row justify-content-center py-2 mt-5"
          >
            <div className="col-12 d-flex justify-content-between">
              <h5>Requests</h5>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={fetchRequests}
              >
                <FiRefreshCw /> Refresh
              </button>
            </div>
            <Requests token={token} id={user.id} />
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
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
              <label className="form-label mt-3" htmlFor="email">
                Confirm password
              </label>
              <div className="d-flex justify-content-between">
                <label>
                  {resetPasswordDetails.newPassword ===
                    resetPasswordDetails.confirmPassword && <BsCheckAll />}
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
              <button
                className="btn btn-primary mt-3"
                type="submit"
                disabled={
                  resetPasswordDetails.newPassword !==
                  resetPasswordDetails.confirmPassword
                }
              >
                Reset Password
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </Sidebar>
    </>
  );
};

export default Dashboard;
