import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosClient from "../axiosConfig";
export default function AppoDetails() {
  let { state } = useLocation();
  let { userInfo } = useSelector((state) => state.user);
  let el = state.el;
  let status = state.status;
  let noteRef = useRef();
  let [start, setStart] = useState();
  let markDone = () => {
    axiosClient
      .post(`appointment/${el.id}/update`, { flag: "done" })
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
      });
  };
  let addNote = () => {
    axiosClient
      .post(`appointment/${el.id}/addnote`, { note: noteRef.current.value })
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
      });
  };
  let cancelAppointment = () => {
    axiosClient
      .post(`appointment/${el.id}/update`, { flag: "cancel" })
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
      });
  };
  let showStart = () => {
    let d = new Date();
    let todaysFullDate = () => {
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      return [year, month, day].join("-");
    };
    let todaysDate = todaysFullDate();
    if (todaysDate === el.date) {
      if (d.toTimeString() > el.starttime && d.toTimeString() < el.endtime) {
        setStart(true);
      }
    }
  };

  return (
    <div className="appo-Details">
      <div style={{ width: "1000px" }}>
        <div className="app-info">
          <h3>
            {el.day}, {el.date}
          </h3>
          <p>
            Time:{" "}
            <span style={{ fontWeight: "600" }}>
              {el.starttime} - {el.endtime}
            </span>
          </p>
          {userInfo?.docid === null ? (
            <p>Doctor: Dr.{el.docname}</p>
          ) : (
            <p>
              Patient's Name:{" "}
              <span style={{ fontWeight: "600" }}>{el.patname}</span>{" "}
            </p>
          )}

          <p>Fees: ₹{el.fees}</p>
          {userInfo.docid !== null ? (
            !start ? (
              <button className="start">Start Meeting</button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
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
            {status === "upcoming" ? (
              <button onClick={() => cancelAppointment()} className="cancel">
                Cancel Appointment
              </button>
            ) : el.flag === "pending" || el.flag === null ? (
              <button className="done" onClick={() => markDone()}>
                Mark Done
              </button>
            ) : (
              <p
                style={{
                  color:
                    el.flag === "done"
                      ? "green"
                      : el.flag === "cancel"
                      ? "red"
                      : "",
                }}
              >
                {el.flag?.toUpperCase()}
              </p>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="note-div">
          <p style={{ fontSize: "18px" }}>Note/Remark</p>
          <p>{el.note}</p>
        </div>
      </div>
    </div>
  );
}
