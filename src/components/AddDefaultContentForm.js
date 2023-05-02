import React, { useContext, useEffect, useState } from "react";
import SingleQuestionDefaultContentForm from "./SingleQuestionDefaultContentForm";
import { useSelector } from "react-redux";
import axios from "axios";
import { LoggedInUserContext } from "../context/LoggedInUserContext";
import { baseURL } from "../assets/URLs";
import swal from "sweetalert";

function AddDefaultContentForm({weekNo, sessionNo, handleClose}) {
  const questions = useSelector((state) => state.questions.value);
  const { loggedinUser, setLoggedinUser } = useContext(LoggedInUserContext)
  // console.log("redux state", questions);

  const updateSessionQuestionaire = async() => {
    console.log("Inside update questionaire", typeof(sessionNo), typeof(weekNo));
    await axios.post(`${baseURL}/admin/update/questions/${weekNo}/${sessionNo}`, questions, {
      headers:{
        Authorization: loggedinUser?.token,
        "ngrok-skip-browser-warning":"true"
      }
    })
    .then((res) => {
      console.log(res.data);
      swal("Added","Questionaire Updated Successfully", "success");
      handleClose();
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="col-12 justify-center">
        <p className="text-center"><b>NOTE :</b> Lower the points, lesser the depression value</p>
        {questions?.map((d, i) => {
          return (
            <div key={i}>
              <SingleQuestionDefaultContentForm formdata={d} />
            </div>
          );
        })}
        <button className="btn btn-primary mt-5 " onClick={() => {
          console.log("Updated list", questions);
          updateSessionQuestionaire();
        }}>
            SAVE TO THE DATABASE
        </button>
    </div>
  );
}

export default AddDefaultContentForm;
