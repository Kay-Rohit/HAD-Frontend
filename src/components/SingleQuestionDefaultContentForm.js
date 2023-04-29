import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSingleQuestion } from "../reducers/defaultContentReducer";

function SingleQuestionDefaultContentForm({ formdata }) {
  const [newData, setNewData] = useState(formdata);
  const dispatch = useDispatch();
  return (
    <>
      <form className="form-control">
        <label></label>
        <div className="row m-1">
          <input
            value={newData.quesion}
            className="form-control"
            onChange={(e) => {
              setNewData({ ...newData, quesion: e.target.value });
            }}
          />
        </div>
        <div className="row mt-2">
          <div className="col">
            <input
              value={newData.option1}
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, option1: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <input
              value={newData.value1}
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, value1: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <input
              value={newData.option2}
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, option2: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <input
              value={newData.value2}
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, value2: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <input
              value={newData.option3}
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, option3: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <input
              value={newData.value3}
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, value3: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <input
              value={newData.option4}
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, option4: e.target.value });
              }}
            />
          </div>
          <div className="col">
            <input
              value={newData.value4}
              className="form-control"
              onChange={(e) => {
                setNewData({ ...newData, value4: e.target.value });
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-success mt-2"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              //delete the prev question and add new updated one
              updateSingleQuestion(newData)
            );
          }}
        >
          OK
        </button>
      </form>
    </>
  );
}

export default SingleQuestionDefaultContentForm;
