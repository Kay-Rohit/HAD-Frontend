import Sidebar from "../components/Sidebar";
import UsageTimeChart from "../components/UsageTimeChart";
import SeverityChart from "../components/SeverityChart";
import axios from "axios";
import { barChartData, severityData } from "../fakeData";
// import ProgressBar from 'react-bootstrap/ProgressBar'

import Requests from '../components/Requests';
import {requestsURL} from '../assets/URLs';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRequestState } from '../reducers/requests/requestReducer';
import { LoggedInUserContext } from "../context/LoggedInUserContext";


const Dashboard = ({token, user}) => {

    const dispatch = useDispatch();
    const {loggedinUser, setLoggedinUser} = useContext(LoggedInUserContext);

    // const [requests, setRequests] = useState([]);
    // const requests = useSelector((state)=>state.requests.value);
    // console.log("from dashboard: ",user);

    token = loggedinUser.token;
    user = loggedinUser.user;

  useEffect(() => {
    fetchRequests();
  }, []);

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

  const [usageData, setUsageData] = useState({
    labels: barChartData.map((data) => data.usageTime),
    datasets: [
      {
        label: "Usage time",
        data: barChartData.map((data) => data.count),
      },
    ],
  });
  const [svrtyData, setSvrtyData] = useState({
    labels: severityData.map((data) => data.severityLevel),
    datasets: [
      {
        label: "Usage time",
        data: severityData.map((data) => data.count),
      },
    ],
  });

  // async function fetchUsageTime(){
  //     await axios.get(`${usageTimesURL}${user.id}`,config)
  //         .then((response) => {
  //             console.log("usage time returned",response.data);

  //             //save the requests in redux
  //             dispatch(
  //                 updateRequestState(response.data)
  //             )
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         })
  // }

  const doctor_name = `Dr. ${user?.firstName} ${user?.middleName} ${user?.lastName}`;

  return (
    <>
      <Sidebar name={doctor_name} >
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
                <div className="flex-row">
                </div>
              </div>
              <div className="col-4">
                <SeverityChart data={svrtyData} />
              </div>
            </div>
            <div className="row mt-5 p-5">
              <div className="card col m-2"
                              style={{ backgroundColor: "#bfbebe" }}
              >
                <h5 className="card-header">Active Patients</h5>
                <div className="card-body">
                  <h5 className="card-title">{user?.userList?.length}</h5>
                </div>
              </div>
              <div className="card col m-2"
                              style={{ backgroundColor: "#bfbebe" }}
              >
                <h5 className="card-header">Total Patients</h5>
                <div className="card-body">
                  <h5 className="card-title">{user?.patientCount}</h5>
                </div>
              </div>
              <div className="card col m-2"
                              style={{ backgroundColor: "#bfbebe" }}
              >
                <h5 className="card-header">Patient Limit</h5>
                <div className="card-body">
                  <h5 className="card-title">{user?.patientCount}/{user.patientLimit}</h5>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#d8d9d8", overflow: "auto" }}
            className="row justify-content-center py-2 mt-5"
          >
            <div className="col-12">
              <h5>Requests</h5>
            </div>
            <Requests token={token} id={user.id} />
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Dashboard;
