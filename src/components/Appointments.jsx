import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosConfig";
import { setAppointments, sortAppointments } from "../slices/infoSlice";
let todaysDate;
export default function Appointments() {
  let dispatch = useDispatch();
  let goto = useNavigate();
  let { userInfo } = useSelector((state) => state.user);
  let { todaysAppointments, upcomingAppointments, pastAppointments } =
    useSelector((state) => state.otherInfo);
  const d = new Date();

  let getAllAppo = () => {
    try {
      axiosClient.get(`appointment/`).then((res) => {
        let data = res.data;
        dispatch(setAppointments(data));
        dispatch(
          sortAppointments({ docid: userInfo.docid, patid: userInfo.patid })
        );
      });
    } catch (err) {
      alert(err.message);
    }
  };
  let todaysFullDate = () => {
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    todaysDate = [year, month, day].join("-");

    return [year, month, day].join("-");
  };

  //let getAppo = () => {
  // let upcomingAppointments = [];
  // let pastAppointments = [];
  // appointments.map((el) => {
  //   if (
  //     el.docid === userInfo.docid ||
  //     el.patid === userInfo.docid ||
  //     el.patid === userInfo.patid
  //   ) {
  //     el = { ...el };
  //     let AppoDate = el.date.split("T")[0];
  //     el.date = AppoDate;
  // if (todaysDate === AppoDate) {
  //   console.log(d.toLocaleTimeString() < el.starttime);
  //   if (d.toLocaleTimeString() < el.starttime) {
  //     upcomingAppointments.push(el);
  //   } else {
  //     pastAppointments.push(el);
  //   }
  // } else if (todaysDate > AppoDate) {
  //   pastAppointments.push(el);
  // } else {
  //   upcomingAppointments.push(el);
  // }
  //   if (el.flag === "pending") {
  //     upcomingAppointments.push(el);
  //   } else {
  //     pastAppointments.push(el);
  //   }
  // }
  //   });
  //   // setUpcomingAppointments(upcomingAppointments);
  //   // setPastAppointments(pastAppointments);
  // };
  // todaysFullDate();

  useEffect(() => {
    getAllAppo();
    // getAppo();
  }, []);
  return (
    <div className="appointments">
      <div className="appo-container">
        <h4>Todays Appointments</h4>
        <div className="appoCard-container">
          {todaysAppointments.length === 0 ? (
            <p>No Appointments Today</p>
          ) : (
            todaysAppointments.map((el) => (
              <div
                className="appointment-Card"
                onClick={() =>
                  goto("/main/appointments/details", {
                    state: { el, status: "today" },
                  })
                }
                key={Date.now() + el.id}
              >
                <h4>
                  {el.day}, {el.date}
                </h4>
                <p>Time: {el.starttime}</p>
                <div className="doc-name">
                  {userInfo.docid === null ? (
                    <h4>Dr.{el.docname}</h4>
                  ) : (
                    <h4> Patient {el.patname}</h4>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="appo-container">
        <h4>Upcoming Appointments</h4>
        <div className="appoCard-container">
          {upcomingAppointments.length === 0 ? (
            <p>No Upcoming Appointments Yet</p>
          ) : (
            upcomingAppointments.map((el) => (
              <div
                className="appointment-Card"
                onClick={() =>
                  goto("/main/appointments/details", {
                    state: { el, status: "upcoming" },
                  })
                }
                key={Date.now() + el.id}
              >
                <h4>
                  {el.day}, {el.date}
                </h4>
                <p>Time: {el.starttime}</p>
                <div
                  className="doc-name"
                  style={{
                    backgroundColor:
                      el.flag === "done"
                        ? "green"
                        : el.flag === "canceled"
                        ? "red"
                        : "",
                  }}
                >
                  {userInfo.docid === null ? (
                    <h4>Dr.{el.docname}</h4>
                  ) : (
                    <h4>
                      {" "}
                      <span style={{ fontWeight: "400" }}>Patient:</span>{" "}
                      {el.patname}
                    </h4>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="appo-container">
        <h4>Past Appointments</h4>
        <div className="appoCard-container">
          {pastAppointments.length === 0 ? (
            <p>No Past Appointments</p>
          ) : (
            pastAppointments.map((el) => (
              <div
                className="appointment-Card"
                onClick={() =>
                  goto("/main/appointments/details", {
                    state: { el, status: "past" },
                  })
                }
                key={Date.now() + el.id}
              >
                <h4>
                  {el.day}, {el.date}
                </h4>
                <p> {el.starttime}</p>
                <div className="doc-name">
                  {userInfo.docid === null ? (
                    <h4>Dr.{el.docname}</h4>
                  ) : (
                    <h4> Patient {el.patname}</h4>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
