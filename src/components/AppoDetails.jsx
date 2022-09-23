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
        <p>Date: {el.date}</p>
        <p>Time: {el.starttime}</p>
        <p>Doctor: Dr.{el.docname}</p>
        <p>Patient Name:{el.patname}</p>
        <p>fees:{el.fees}</p>
      </div>
      <div>
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
  );
}
