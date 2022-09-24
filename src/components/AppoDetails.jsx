import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosClient from "../axiosConfig";
export default function AppoDetails() {
  let { state } = useLocation();
  let { userInfo } = useSelector((state) => state.user);
  let el = state.el;
  let noteRef = useRef();
  let addNote = () => {
    try {
      axiosClient
        .post(`appointment/${el.id}/addnote`, { note: noteRef.current.value })
        .then((res) => {});
    } catch (err) {
      alert(err.message);
    }
  };
  let cancelAppointment = () => {
    try {
      axiosClient
        .post(`appointment/${el.id}/update`, { flag: "cancel" })
        .then((res) => {});
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="appo-Details">
      <div>
        <div className="app-info">
          <h3>
            {el.day}, {el.date}
          </h3>
          <p>
            Time: {el.starttime} - {el.endtime}
          </p>
          <p>Doctor: Dr.{el.docname}</p>
          <p>Patient's Name: {el.patname}</p>
          <p>Fees: ₹{el.fees}</p>
        </div>
        <div className="note-div">
          <p style={{fontSize:"18px"}}>Note/Remark</p>
          <p>{el.note}</p>
        </div>
        {userInfo.docid !== null ? (
          <div className="notes-container">
            <label htmlFor="note">Add note/remark</label>
            <textarea
              name="note"
              id="note"
              cols="30"
              rows="10"
              ref={noteRef}
            ></textarea>
            <button onClick={() => addNote()}>Add note</button>
            {el.flag === "pending" ? (
              <button onClick={() => cancelAppointment()}>
                Cancel Appointment
              </button>
            ) : (
              <p>{el.flag}</p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
