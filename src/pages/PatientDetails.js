import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import avatar from "../assets/avatar.png";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import ProgressChart from "../components/ProgressChart";
import PatientUsageChart from "../components/PatientUsageChart";
import { progressData, patUsageData } from "../fakeData";

import { FiRefreshCw } from "react-icons/fi";
import { MdOutlineDoneOutline } from "react-icons/md";

// import {assignedArticles} from '../fakeData'
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useEffect, useState } from "react";
// import AddPersonalizedContentForm from '../components/AlreadyAddedPersonalisedContentForm';
import AlreadyAddedPersonalizedContentForm from "../components/AlreadyAddedPersonalisedContentForm";
import AddContentForm from "../components/AddContentForm";
import {
  addPersonalisedContentURL,
  deleteAssignedArticleURL,
  fetchAlreadyAddedArticlesURl,
  patientUsageURL,
  patientProgressDataURL,
  baseURL,
} from "../assets/URLs";
import { updateArticleState } from "../reducers/articleReducer";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import swal from "sweetalert";

const PatientDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext);
  const patients = useSelector((state) => state.users.value);
  const articles = useSelector((state) => state.articles.value);
  const [expoDeviceToken, setExpoDeviceToken] = useState("");

  const token = loggedinUser.token;
  const user = loggedinUser.user;

  const [assignedArticles, setAssignedArticle] = useState([]);

  let { patientId } = useParams();
  let doctorId = user?.id;
  //constant for rendering no. of forms on add button
  // const [noOfForms, setNoOfForms] = useState(1);

  //for modal ============================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ======================================

  // console.log(patientId);
  const doctor_name = `${user?.firstName} ${user?.middleName} ${user?.lastName}`;
  const [patientUsageData, setPatientUsageData] = useState([]);
  const [patientProgressData, setPatientProgressData] = useState([{}]);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2020);

  const fetchExpoDeviceToken = async () => {
    console.log("inside expo token fetch func");
    await axios
      .post(
        `${baseURL}/get-device-token`,
        {
          patientId: patientId,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setExpoDeviceToken(res.data);
      })
      .catch((err) => console.log(err));
  };

  async function sendPushNotification() {
    console.log("push notifications called!!!!");
    const message = {
      to: `${expoDeviceToken}`,
      sound: "default",
      title: "Hey user!",
      body: `Dr. ${doctor_name} added new content for you!`,
      data: {},
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const addPersonalisedContent = async () => {
    console.log("Articles to be sent to patient", articles);
    const request = new Request(`${addPersonalisedContentURL}`, {
      method: "POST",
      body: JSON.stringify(articles),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    await fetch(request)
      .then((res) => {
        console.log(res);

        sendPushNotification();
      })
      .catch((err) => console.log(err));

    handleClose();
    dispatch(updateArticleState([]));
  };

  let config = {
    headers: {
      Authorization: token,
      "ngrok-skip-browser-warning": "69420",
    },
  };

  // }

  const fetchAssignedContent = async () => {
    let config = {
      headers: {
        Authorization: token,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    await axios
      .get(`${fetchAlreadyAddedArticlesURl}${patientId}`, config)
      .then((res) => {
        console.log("Assigned Content", res.data);
        setAssignedArticle(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAssignedContent();
    fetchExpoDeviceToken();
    fetchUsageData();
    fetchProgressData();
  }, []);

  const deleteAssignedContent = async (articleId) => {
    console.log("articleId", articleId);
    const request = new Request(`${deleteAssignedArticleURL}${articleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    await fetch(request)
      .then((res) => {
        console.log(res.data);
        swal("Deleted", "deleted your item successfully", "success");
        fetchAssignedContent();
      })
      .catch((err) => console.log(err));
    // console.log(response);
  };

  useEffect(() => {
    //function to use data as required by graph
    setPrgrsData({
      labels: patientProgressData.map((data) => data.weekNumber),
      datasets: [
        {
          label: "Progress",
          data: patientProgressData.map((data) => data.score),
        },
      ],
    });
  }, [patientProgressData]);

  useEffect(() => {
    //function to use data as required by graph
    setUsgData({
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      datasets: [
        {
          data: patientUsageData,
        },
      ],
    });
  }, [patientUsageData]);

  async function fetchProgressData() {
    await axios
      .get(`${patientProgressDataURL}${patientId}`, config)
      .then((response) => {
          console.log("progress data", response.data);
        setPatientProgressData(response.data);
        //save the requests in redux
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchUsageData() {
    console.log("month = ", month, "and year =", year);
    await axios
      .get(`${patientUsageURL}${patientId}/${month}/${year}`, config)
      .then((response) => {
        console.log("usage data", response.data);
        setPatientUsageData(response.data);
        //save the requests in redux
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [prgrsData, setPrgrsData] = useState({
    labels: progressData.map((data) => data.weekNumber),
    datasets: [
      {
        label: "Progress",
        data: progressData.map((data) => data.score),
      },
    ],
  });

  const [usgData, setUsgData] = useState({
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    datasets: [
      {
        data: patUsageData,
      },
    ],
  });

  const monthOptions = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  const yearOptions = [
    { value: 2020, label: "2020" },
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
  ];

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Personalised Content for your Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="">
            {/* Rendering prepopulated Data */}
            {articles?.map((article, index) => {
              return (
                <div key={index} className="border-bottom p-2 mb-2">
                  <AlreadyAddedPersonalizedContentForm
                    article={article}
                    doctorId={doctorId}
                  />
                </div>
              );
            })}
            <AddContentForm doctorId={doctorId} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPersonalisedContent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Sidebar name={doctor_name}>
        <div className="container-fluid">
          {/* This is patient details page */}
          <div className="row mt-2" style={{ height: "90vh" }}>
            <div className="col-md-5">
              <div className="row">
                {patients
                  .filter((patient) => {
                    if (patient.id === patientId) {
                      return patient;
                    }
                  })
                  .map((patient) => {
                    return (
                      <Card
                        border="light"
                        className="my-2 text-center"
                        key={patient.id}
                      ><div className="row">
                      <div className="col-6">
                        <Card.Header>
                          
                          <div className="avatar rounded-circle" >
                            <img
                              alt="image"
                              src={avatar}
                              style={{ objectFit: "contain", width: "82%" }}
                            />
                          </div>
                          <div className="">
                            
                            {/* <Card.Text>Patient ID: {patient?.id}</Card.Text> */}
                           
                            </div>
                          
                        </Card.Header>
                        </div>
                        <div className="col-6">
                        <div className="my-2">
                          <div
                            style={{ backgroundColor: "#d8d8d9" }}
                            className="p-2 text-center"
                          >
                            <Card.Title>
                              {patient?.firstName} {patient?.lastName}
                            </Card.Title>
                            {/* <i>Patient Details</i> */}
                            <Card.Text>
                              {/* mail: {patient?.email} <br /> */}
                              gender: {patient?.gender} <br />
                              {/* address: {patient?.address} <br /> */}
                              contact: {patient?.contact} <br />
                              DOB: {patient?.dob.month} {patient?.dob.year}
                            </Card.Text>
                            <button
                              className="btn btn-secondary"
                              onClick={() => {
                                navigate("/chats  ");
                              }}
                            >
                              Message Patient
                            </button>
                          </div>
                        </div>
                        </div>
                        </div>
                      </Card>
                    );
                  })}
              </div>
              <div
                className="row border-light p-2 rounded overflow-auto mt-5"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <div className="d-flex justify-content-between">
                  <i style={{ fontSize: "large", fontWeight: "bold" }}>
                    Assigned Personalised Articles
                  </i>

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={handleShow}
                  >
                    Add content
                  </button>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={fetchAssignedContent}
                  >
                    <FiRefreshCw />
                  </button>
                </div>
                {/* <div className='container-fluid'> */}
                {assignedArticles?.map((article, index) => {
                  return (
                    <div key={index} className="row my-2">
                      <div
                        className="col-3"
                        style={{ backgroundColor: "#bfbebe" }}
                      >
                        {article?.completed && <MdOutlineDoneOutline />} &nbsp;
                        {article?.articleType}
                      </div>
                      <div
                        className="col-4"
                        style={{ backgroundColor: "#bfbebe" }}
                      >
                        {article?.articleTitle}
                      </div>
                      <div
                        className="col-3"
                        style={{ backgroundColor: "#bfbebe" }}
                      >
                        <a
                          href={article?.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          link
                        </a>
                      </div>
                      <button
                        className="btn btn-sm btn-danger col-2"
                        onClick={() => {
                          deleteAssignedContent(article.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
                {/* </div> */}
              </div>
            </div>
            <div className="chart-details col-md-7">
              <div className="col">
                <div
                  className="row border-light p-2 rounded"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <i style={{ fontSize: "large", fontWeight: "bold" }}>
                    {" "}
                    Progress
                  </i>
                  <div
                    className="chart-container "
                    style={{
                      position: "relative",
                      height: "40vh",
                      width: "80vw",
                    }}
                  >
                    <ProgressChart data={prgrsData} />
                  </div>
                </div>
                <div
                  className="row-4 border-light p-2 rounded"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <i style={{ fontSize: "large", fontWeight: "bold" }}>
                    {" "}
                    App Usage
                  </i>
                  <div className="row">
                    <div className="col-5">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          setMonth(e.target.value);
                          // fetchUsageData();
                        }}
                      >
                        {monthOptions.map((op) => {
                          return (
                            <option key={op.value} value={op.value}>
                              {op.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-5">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          setYear(e.target.value);
                          // fetchUsageData();
                        }}
                      >
                        {yearOptions.map((op) => {
                          return (
                            <option key={op.value} value={op.value}>
                              {op.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-sm btn-light"
                        onClick={fetchUsageData}
                      >
                        <FiRefreshCw /> Refresh
                      </button>
                    </div>
                  </div>

                  <div
                    className="chart-container"
                    style={{
                      position: "relative",
                      height: "35vh",
                      width: "45vw",
                    }}
                  >
                    <PatientUsageChart data={usgData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default PatientDetails;
