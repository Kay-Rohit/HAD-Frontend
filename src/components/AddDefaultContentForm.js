import React, { useEffect, useState } from "react";
import SingleQuestionDefaultContentForm from "./SingleQuestionDefaultContentForm";
import { useSelector } from "react-redux";

function AddDefaultContentForm({weekNo, sessionNo}) {
  const questions = useSelector((state) => state.questions.value);
//   console.log("redux state", questions, weekNo, sessionNo)

  const dataToBeSent = {...questions, weekNumber:weekNo, sessionNumber: sessionNo}

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
            console.log(dataToBeSent)
        }}>
            SAVE TO THE DATABASE
        </button>
    </div>
  );
}

export default AddDefaultContentForm;
