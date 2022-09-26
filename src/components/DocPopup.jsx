import React, { useDebugValue, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../slices/userSlice";
import axiosClient from "../axiosConfig";
export default function DocPopup() {
  let { userInfo } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let [image, setImage] = useState("");
  let imgRef = useRef();
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
  let [selectedSlots, setSelectedSlots] = useState([]);
  let saveDocInfo = async (obj) => {
    let newForm = new FormData();
    newForm.append("qualification", obj.qualification);
    newForm.append("experience", obj.experience);
    newForm.append("location", obj.location);
    newForm.append("speciality", obj.speciality);
    newForm.append("contact", obj.contact);
    newForm.append("hospital", obj.hospital);
    newForm.append("img", imgRef?.current.files[0]);
    newForm.append("name", userInfo.name);
    newForm.append("timeSlots", JSON.stringify(timeSlots));
    newForm.append("docId", userInfo.docid);
    newForm.append("fees", obj.fees);

    axiosClient
      .post(`doctor/new`, newForm)
      .then((res) => {
        let data = res.data;
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
    //get data after added
    axiosClient
      .get(`doctor/${userInfo.docid}`)
      .then((res) => {
        let data = res?.data;
        dispatch(setInfo(data));
      })
      .catch((err) => {
        // alert(err.message);
      });
  };

  return (
    <div className="doc-form">
      <h2>Hey Doc! Tell Us About Your Self</h2>
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
            fees: "",
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
              <div className="profile-div">
                <div className="avatar-div">
                  <label htmlFor="img">
                    <img src={image === "" ? "/avatar.png" : image} alt="" />
                  </label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    ref={imgRef}
                    className="inputfile inputfile-1"
                    data-multiple-caption="{count} files selected"
                    multiple
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        setImage(() =>
                          URL.createObjectURL(event.target.files[0])
                        );
                      }
                    }}
                  />
                </div>
                <div className="contact-div">
                  <div>
                    <div className="field">
                      <label htmlFor="location">Location</label>
                      <Field type="text" id="location" name="location"></Field>
                      <ErrorMessage
                        name="location"
                        className="err"
                      ></ErrorMessage>
                    </div>
                    <div className="field" style={{ marginTop: "10px" }}>
                      <label htmlFor="fees">Fees</label>
                      <Field
                        type="text"
                        id="fees"
                        name="fees"
                        placeholder="₹"
                      ></Field>
                      <ErrorMessage name="fees" className="err"></ErrorMessage>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="contact">Contact Number</label>
                    <Field type="text" id="contact" name="contact"></Field>
                    <ErrorMessage name="contact" className="err"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div className="field">
                <label htmlFor="qualification">Qualification</label>
                <Field
                  type="text"
                  id="qualification"
                  name="qualification"
                  placeholder="MBBS"
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
                                let idx = selectedSlots.indexOf(
                                  `${day}:10:00-13:00`
                                );
                                let copySelected = selectedSlots;
                                copySelected.splice(idx, 1);
                                setSelectedSlots(copySelected);
                                return;
                              }
                            });

                            if (add) {
                              setSelectedSlots([
                                ...selectedSlots,
                                `${day}:10:00-13:00`,
                              ]);
                              let copy = timeSlots;
                              copy[day].available.push([600, 780]);
                              setTimeSlots(copy);
                            }
                          }}
                          style={{
                            backgroundColor: selectedSlots.includes(
                              `${day}:10:00-13:00`
                            )
                              ? "rgb(65, 155, 73)"
                              : "",
                            color: selectedSlots.includes(`${day}:10:00-13:00`)
                              ? "white"
                              : "",
                          }}
                        >
                          10:00 - 13:00
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            let add = true;
                            timeSlots[day].available.map((range, index) => {
                              if (range[0] === 780) {
                                timeSlots[day].available.splice(index, 1);
                                add = false;
                                let idx = selectedSlots.indexOf(
                                  `${day}:13:00-17:00`
                                );
                                let copySelected = selectedSlots;
                                copySelected.splice(idx, 1);
                                setSelectedSlots(copySelected);
                                return;
                              }
                            });
                            if (add) {
                              setSelectedSlots([
                                ...selectedSlots,
                                `${day}:13:00-17:00`,
                              ]);
                              let copy = timeSlots;
                              copy[day].available.push([780, 1020]);
                              setTimeSlots(copy);
                            }
                            // setTimeSlots({
                            //   ...timeSlots,
                            //   [day]: [...timeSlots[day], [780, 1020]],
                            // });
                          }}
                          style={{
                            backgroundColor: selectedSlots.includes(
                              `${day}:13:00-17:00`
                            )
                              ? "rgb(65, 155, 73)"
                              : "",
                            color: selectedSlots.includes(`${day}:13:00-17:00`)
                              ? "white"
                              : "",
                          }}
                        >
                          13:00 - 17:00
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            let add = true;
                            timeSlots[day].available.map((range, index) => {
                              if (range[0] === 780) {
                                timeSlots[day].available.splice(index, 1);
                                add = false;
                                let idx = selectedSlots.indexOf(
                                  `${day}:17:00-20:00`
                                );
                                let copySelected = selectedSlots;
                                copySelected.splice(idx, 1);
                                setSelectedSlots(copySelected);
                                return;
                              }
                            });
                            if (add) {
                              setSelectedSlots([
                                ...selectedSlots,
                                `${day}:17:00-20:00`,
                              ]);
                              let copy = timeSlots;
                              copy[day].available.push([1020, 1200]);
                              setTimeSlots(copy);
                            }
                          }}
                          style={{
                            backgroundColor: selectedSlots.includes(
                              `${day}:17:00-20:00`
                            )
                              ? "rgb(65, 155, 73)"
                              : "",
                            color: selectedSlots.includes(`${day}:17:00-20:00`)
                              ? "white"
                              : "",
                          }}
                        >
                          17:00 - 20:00
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className="save-btn">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
