import React, { useDebugValue, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../slices/userSlice";
import axiosClient from "../axiosConfig";
export default function DocPopup() {
  let { userInfo } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let [timeSlots, setTimeSlots] = useState({
    Mon: { available: [], booked: [] },
    Tue: { available: [], booked: [] },
    Wed: { available: [], booked: [] },
    Thur: { available: [], booked: [] },
    Fri: { available: [], booked: [] },
    Sat: { available: [], booked: [] },
    Sun: { available: [], booked: [] },

  });

  let saveDocInfo = async (obj) => {
    obj.docId = userInfo.docid;
    obj.timeSlots = timeSlots;

    obj.name = userInfo.name;
    console.log(obj);
    try {
      axiosClient.post(`doctor/new`, obj).then((res) => {
        let data = res.data;
      });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="doc-form">
      <h2>Hey Doc! Tell Us about your Self</h2>
      <div>
        <Formik
          initialValues={{
            qualification: "",
            experience: "",
            location: "",
            speciality: "",
            timeSlots: "",
            contact: "",
            hospital: "",
          }}
          validationSchema={Yup.object({
            qualification: Yup.string().required("Required"),
            experience: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            saveDocInfo(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="popup-Form">
              <div className="field">
                <label htmlFor="qualification">Qualification</label>
                <Field
                  type="text"
                  id="qualification"
                  name="qualification"
                  placeholder=""
                ></Field>
                <ErrorMessage
                  name="qualification"
                  className="err"
                ></ErrorMessage>
              </div>
              <div className="field">
                <label htmlFor="experience">Experience in Years</label>
                <Field type="number" id="experience" name="experience"></Field>
                <ErrorMessage name="experience" className="err"></ErrorMessage>
              </div>
              <div className="field">
                <label htmlFor="speciality">Specialities</label>
                <Field type="text" id="speciality" name="speciality"></Field>
                <ErrorMessage name="speciality" className="err"></ErrorMessage>
              </div>
              <div className="field">
                <label htmlFor="hospital">Hospital Name</label>
                <Field type="text" id="hospital" name="hospital"></Field>
                <ErrorMessage name="hospital" className="err"></ErrorMessage>
              </div>

              <div className="contact-div">
                <div className="field">
                  <label htmlFor="location">Location</label>
                  <Field type="text" id="location" name="location"></Field>
                  <ErrorMessage name="location" className="err"></ErrorMessage>
                </div>
                <div className="field">
                  <label htmlFor="contact">Contact Number</label>
                  <Field type="text" id="contact" name="contact"></Field>
                  <ErrorMessage name="contact" className="err"></ErrorMessage>
                </div>
              </div>

              <div className="time-slots-div">
                <label htmlFor="">Select Time Slots</label>
                <div className="slot-container">
                  {days.map((day) => (
                    <div key={day + Date.now()}>
                      <p>{day}</p>
                      <div className="slots">
                        <button
                          type="button"
                          onClick={() => {
                            let add = true;
                            timeSlots[day].available.map((range, index) => {
                              if (range[0] === 600) {
                                timeSlots[day].available.splice(index, 1);
                                add = false;
                                return;
                              }
                            });
                            if (add) {
                              let copy = timeSlots;
                              copy[day].available.push([600, 780]);
                              setTimeSlots(copy);
                            }
                          }}
                        >
                          10:00-13:00
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            let add = true;
                            timeSlots[day].available.map((range, index) => {
                              if (range[0] === 780) {
                                timeSlots[day].available.splice(index, 1);
                                add = false;
                                return;
                              }
                            });
                            if (add) {
                              let copy = timeSlots;
                              copy[day].available.push([780, 1020]);
                              setTimeSlots(copy);
                            }
                            // setTimeSlots({
                            //   ...timeSlots,
                            //   [day]: [...timeSlots[day], [780, 1020]],
                            // });
                          }}
                        >
                          13:00-17:00
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            let add = true;
                            timeSlots[day].available.map((range, index) => {
                              if (range[0] === 780) {
                                timeSlots[day].available.splice(index, 1);
                                add = false;
                                return;
                              }
                            });
                            if (add) {
                              let copy = timeSlots;
                              copy[day].available.push([1020, 1200]);
                              setTimeSlots(copy);
                            }
                            // setTimeSlots({
                            //   ...timeSlots,
                            //   [day]: [...timeSlots[day], [1020, 1200]],
                            // });
                          }}
                        >
                          17:00-20:00
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit">Save</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
