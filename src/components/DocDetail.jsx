import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { json, useParams } from "react-router-dom";
import axiosClient from "../axiosConfig";
export default function DocDetail() {
  let { userInfo } = useSelector((state) => state.user);
  let { doctors } = useSelector((state) => state.otherInfo);
  let { docid } = useParams();
  const d = new Date();
  let todaysDay = d.getDay();
  let todaysDate = d.getDate();
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let [selectedDay, setSelectedDay] = useState(days[todaysDay]);
  let [selectedSlot, setSelectedSlot] = useState();
  let docInfo;
  doctors.map((doc) => {
    if (doc.docid === docid) {
      docInfo = doc;
    }
  });
  let timeSlots = docInfo?.timeslots;

  let todaysFullDate = (selectedDay) => {
    let diff = days.indexOf(selectedDay) - todaysDay;
    let d = new Date();
    let totalDaysOfMonth = new Date(
      d.getFullYear(),
      d.getMonth() + 2,
      0
    ).getDate();

    let day = d.getDate() + diff;
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    if (totalDaysOfMonth < day) {
      month += 1;
      day -= totalDaysOfMonth;
    }
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  let bookAppointment = () => {
    let date = todaysFullDate(selectedDay);

    var timeParts = selectedSlot.split(":");
    let timeInMinutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);
    let endTime = timeInMinutes + 30;
    var hours = Math.floor(endTime / 60);
    var minutes = endTime % 60;
    endTime = hours + ":" + minutes;

    let data = {
      fees: docInfo.fees,
      docName: docInfo.name,
      docId: docInfo.docid,
      patId: userInfo.patid !== null ? userInfo.patid : userInfo.docid,
      patName: userInfo.name,
      startTime: selectedSlot,
      endTime: endTime,
      date: date,
      flag: "pending",
    };
    console.log(data);
    // try {
    //   axiosClient.post(`appointment/new`, data).then((res) => {
    //     let data = res.data;
    //   });
    // } catch (err) {
    //   alert(err.message);
    // }

    let copySlots = JSON.parse(JSON.stringify(docInfo.timeslots));

    copySlots[selectedDay].booked.push(selectedSlot);
    console.log(copySlots)
    try {
      axiosClient
        .post(`doctor/${docInfo.docid}/update`, { timeSlots: copySlots })
        .then((res) => {
          let data = res.data;
        });
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="doc-details">
      <div>
        <div className="left">
          <div>
            <img src="" alt="" />
          </div>

          <div className="doc-info">
            <h3>Dr.{docInfo?.name}</h3>
            <p>{docInfo?.qualification}</p>
            <p>{docInfo?.speciality}</p>
            <p>{docInfo?.experience} year of experience</p>
            <p>₹{docInfo?.fees}</p>
          </div>
        </div>

        <div className="time-slots">
          <div className="time-slots-div">
            <label htmlFor="">Select Time Slots</label>
            <div className="slot-container">
              <div className="days">
                {days.map((el, indx) => {
                  if (indx >= todaysDay) {
                    return (
                      <div
                        style={{
                          backgroundColor:
                            selectedDay === el ? "lightblue" : "",
                        }}
                      >
                        {todaysDay === indx ? (
                          <p onClick={() => setSelectedDay(el)}>Today</p>
                        ) : (
                          <p onClick={() => setSelectedDay(el)}>{el}</p>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="availableSlots-container">
                {timeSlots[selectedDay].available?.length === 0 ? (
                  <div>
                    <p>No slots availabe on this day</p>
                  </div>
                ) : (
                  timeSlots[selectedDay].available?.map((el) => {
                    return (
                      <div
                        onClick={() => setSelectedSlot(el)}
                        style={{
                          backgroundColor:
                            selectedSlot === el ? "lightblue" : "",
                        }}
                      >
                        <p>{el}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <button onClick={() => bookAppointment()}>Book Appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
