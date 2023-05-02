import React, { useContext, useEffect, useState } from "react";
import AdminComponent from "./AdminDashboard";
import { questionaireDataURL } from "../../assets/URLs";
import axios from "axios";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import AddDefaultContentForm from "../../components/AddDefaultContentForm";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../../reducers/defaultContentReducer";

function AddContent() {
  const [data, setData] = useState([{}]);
  const dispatch = useDispatch();
  //see week 1 questionaire
  const [weekNo, setWeekNo] = useState(1);
  const [sessionNo, setSessionNo] = useState(1);
  const [questionaire, setQuestionaire] = useState([{}]);
  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext);
  const token = loggedinUser.token;

  //for modal ============================
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true);
    //change redux store value with questions in session selected
    dispatch(
      updateQuestion(questionaire)
    );
  }
  // ======================================

  const config = {
    headers: {
      Authorization: token,
      "ngrok-skip-browser-warning": true,
    },
  };

  const weekOptions = [
    { value: 1, label: "week 1" },
    { value: 2, label: "week 2" },
    { value: 3, label: "week 3" },
    { value: 4, label: "week 4" },
    { value: 5, label: "week 5" },
  ];

  const sessionOptions = [
    { value: 1, label: "Session 1" },
    { value: 2, label: "Session 2" },
    { value: 3, label: "Session 3" },
    { value: 4, label: "Session 4" },
    { value: 5, label: "Session 5" },
  ];


  const getQuestionaireData = async () => {
    await axios
      .get(`${questionaireDataURL}${weekNo}`, config)
      .then((res) => {
        console.log("api call", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuestionaireData();
  }, [weekNo]);

  useEffect(() => {
    console.log(sessionNo);
    var ind = sessionNo - 1;
    setQuestionaire(data[ind]?.sessionQuestions);
  }, [sessionNo])

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Questionaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddDefaultContentForm weekNo={weekNo} sessionNo={sessionNo} handleClose={handleClose}/>
        </Modal.Body>
      </Modal>

      <div className="sticky-top">
        <AdminComponent />
      </div>
      <div className="row mt-3">
        <div className="col-5 offset-1">
          <select
            className="form-select"
            onChange={(e) => {
              setWeekNo(parseInt(e.target.value));
            }}
          >
            {weekOptions.map((op) => {
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
              setSessionNo(parseInt(e.target.value));
            }}
          >
            {sessionOptions.map((op) => {
              return (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="row mt-3">
          <div className="card px-3 col-12 col-lg-6 offset-lg-3">
            {questionaire?.map((q, index) => {
              return (
                <div className="mt-3" key={index}>
                  <b>Question:</b> {q.quesion} <br />
                  <b>option1:</b> {q.option1} <br />
                  <b>option2:</b> {q.option2} <br />
                  <b>option3:</b> {q.option3} <br />
                  <b>option4:</b> {q.option4}
                </div>
              );
            })}
            <button className="btn btn-success m-3" onClick={handleShow}>Add/Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddContent;
