import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosConfig";
import { setAppointments } from "../slices/infoSlice";
let todaysDate;
export default function Appointments() {
  let dispatch = useDispatch();
  let goto = useNavigate();
  let { userInfo } = useSelector((state) => state.user);
  let { appointments } = useSelector((state) => state.otherInfo);
  let [upcomingAppointments, setUpcomingAppointments] = useState([]);
  let [pastAppointments, setPastAppointments] = useState([]);
  const d = new Date();

  let getAllAppo = () => {
    try {
      axiosClient.get(`appointment/`).then((res) => {
        let data = res.data;
        dispatch(setAppointments(data));
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

  let getAppo = () => {
    let upcomingAppointments = [];
    let pastAppointments = [];
    appointments.map((el) => {
      if (
        el.docid === userInfo.docid ||
        el.patid === userInfo.docid ||
        el.patid === userInfo.patid
      ) {
        el = { ...el };
        let AppoDate = el.date.split("T")[0];
        el.date = AppoDate;
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
        if (el.flag === "pending") {
          upcomingAppointments.push(el);
        } else {
          pastAppointments.push(el);
        }
      }
    });
    setUpcomingAppointments(upcomingAppointments);
    setPastAppointments(pastAppointments);
  };
  todaysFullDate();

  useEffect(() => {
    getAllAppo();
    getAppo();
  }, []);
  return (
    <div className="appointments">
      <div className="appo-container">
        <h4>Upcoming Appointments</h4>
        <div className="appoCard-container">
          {upcomingAppointments.map((el) => (
            <div
              className="appointment-Card"
              onClick={() =>
                goto("/main/appointments/details", { state: { el } })
              }
              key={Date.now()+el.id}
            >
              <p>Date: {el.date}</p>
              <p>Time: {el.starttime}</p>
              <p>Doctor: Dr.{el.docname}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="appo-container">
        <h4>Past Appointments</h4>
        <div className="appoCard-container">
          {pastAppointments.map((el) => (
            <div
              className="appointment-Card"
              onClick={() =>
                goto("/main/appointments/details", { state: { el } })
              }
              key={Date.now()+el.id}
            >
              <p>Date: {el.date}</p>
              <p>Time: {el.starttime}</p>
              <p>Doctor: Dr.{el.docname}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
