import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosClient from "../axiosConfig";
import { addNoteLocally, markCancel } from "../slices/infoSlice";
export default function AppoDetails() {
  let dispatch = useDispatch();
  let { state } = useLocation();
  let { userInfo } = useSelector((state) => state.user);
  let el = state.el;
  let status = state.status;
  let noteRef = useRef();
  let [start, setStart] = useState();
  let rating = ["⭐", "⭐", "⭐", "⭐", "⭐"];
  let [selectedRate, setSelectedRate] = useState("");
  let markDone = () => {
    axiosClient
      .post(`appointment/${el.id}/update`, { flag: "done" })
      .then((res) => {
        return dispatch(markDone(el.id));
      })
      .catch((err) => {
        alert(err.message);
      });
    //add  fees to earning
    axiosClient
      .post(`doctor/${el.docid}/addearnings`, { fees: el.fees })
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
      });
  };
  let addRatings = () => {
    axiosClient
      .post(`doctor/${el.docid}/addratings`, { newRating: selectedRate + 1 })
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
      });
    axiosClient
      .post(`appointment/${el.id}/addratings`, { ratings: selectedRate + 1 })
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
      });
  };
  let addNote = () => {
    axiosClient
      .post(`appointment/${el.id}/addnote`, { note: noteRef.current.value })
      .then((res) => {
         dispatch(
          addNoteLocally({ id: el.id, note: noteRef.current.value })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  let cancelAppointment = () => {
    axiosClient
      .post(`appointment/${el.id}/update`, { flag: "canceled" })
      .then((res) => {
        return dispatch(markCancel(el.id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    if (el.rating > 0) setSelectedRate(el.rating);
  }, []);

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
  console.log(el);
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
            start ? (
              <button className="start">Start Meeting</button>
            ) : (
              ""
            )
          ) : status === "past" ? (
            <>
              <div style={{ display: "flex" }}>
                {rating.map((elem, indx) => (
                  <p
                    style={{
                      filter:
                        indx <= selectedRate ? "invert(0)" : "invert(50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (el.rating <= 0) setSelectedRate(indx);
                    }}
                  >
                    {elem}
                  </p>
                ))}
              </div>
              {el.rating > 0 ? (
                ""
              ) : (
                <button className="start" onClick={() => addRatings()}>
                  Rate doctor
                </button>
              )}
            </>
          ) : (
            ""
          )}

          {el.flag !== "pending" ? (
            <p
              style={{
                color:
                  el.flag === "done"
                    ? "green"
                    : el.flag === "canceled"
                    ? "red"
                    : "",
              }}
            >
              APPOINTMENT {el.flag?.toUpperCase()}
            </p>
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
              ""
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
