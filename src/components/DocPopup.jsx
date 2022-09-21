import React, { useDebugValue, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../slices/userSlice";
export default function DocPopup() {
  let { userInfo } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let [timeSlots, setTimeSlots] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thur: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });

  let saveDocInfo = async (obj) => {
    let token = localStorage.getItem("accessToken");
    obj.docId = userInfo.docid;
    obj.timeSlots = timeSlots;
    console.log(obj)

    try {
      let resp = await fetch(`http://localhost:8000/doctor/new`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body:JSON.stringify(obj)
      });

      if (resp.status === 200) {
        let data = await resp.json();
      } else {
        let err = await resp.text();
        alert(err);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="doc-form">
      <h2> Tell Us about your Self</h2>
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
              <div>
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
              <div>
                <label htmlFor="experience">Experience in Years</label>
                <Field type="number" id="experience" name="experience"></Field>
                <ErrorMessage name="experience" className="err"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="speciality">Specialities</label>
                <Field type="text" id="speciality" name="speciality"></Field>
                <ErrorMessage name="speciality" className="err"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="hospital">Hospital Name</label>
                <Field type="text" id="hospital" name="hospital"></Field>
                <ErrorMessage name="hospital" className="err"></ErrorMessage>
              </div>

              <div className="contact-div">
                <div>
                  <label htmlFor="location">Location</label>
                  <Field type="text" id="location" name="location"></Field>
                  <ErrorMessage name="location" className="err"></ErrorMessage>
                </div>
                <div>
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
                            timeSlots[day].map((range, index) => {
                              if (range[0] === 600) {
                                timeSlots[day].splice(index, 1);
                                add = false;
                                return;
                              }
                            });
                            if (add)
                              setTimeSlots({
                                ...timeSlots,
                                [day]: [...timeSlots[day], [600, 780]],
                              });
                          }}
                        >
                          10:00-13:00
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            let add = true;
                            timeSlots[day].map((range, index) => {
                              if (range[0] === 780) {
                                timeSlots[day].splice(index, 1);
                                add = false;
                                return;
                              }
                            });
                            if (add)
                              setTimeSlots({
                                ...timeSlots,
                                [day]: [...timeSlots[day], [780, 1020]],
                              });
                          }}
                        >
                          13:00-17:00
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            let add = true;
                            timeSlots[day].map((range, index) => {
                              if (range[0] === 780) {
                                timeSlots[day].splice(index, 1);
                                add = false;
                                return;
                              }
                            });
                            if (add)
                              setTimeSlots({
                                ...timeSlots,
                                [day]: [...timeSlots[day], [1020, 1200]],
                              });
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
