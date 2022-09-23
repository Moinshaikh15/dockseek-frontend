import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axiosClient from "../axiosConfig";
export default function PatPopup() {
  let { userInfo } = useSelector((state) => state.user);
  let [pastIssueFields, setPastIssueFields] = useState([
    { issueName: "", years: "" },
    { issueName: "", years: "" },
  ]);
  let [gender, setGender] = useState();
  let [bloodGroup, setBloodGroup] = useState();
  let savePatInfo = async (obj) => {
    let token = localStorage.getItem("accessToken");
    obj.patId = userInfo.patid;
    obj.gender = gender;
    obj.bloodGroup = bloodGroup;
    obj.pastIssues = { pastIssueFields };
    console.log(obj);
    try {
      axiosClient.post(`patient/new`, obj).then((res) => {
        let data = res.data;
        console.log(data);
      });
    } catch (err) {
      alert(err.message);
    }
  };

  let handleInputChange = (e, index) => {
    let data = [...pastIssueFields];
    data[index][e.target.name] = e.target.value;
    setPastIssueFields(data);
  };
  let addFields = () => {
    setPastIssueFields([...pastIssueFields, { issueName: "", years: "" }]);
  };
  return (
    <div className="popup-form">
      {" "}
      <div className="pat-form">
        <h2> Tell Us About Your Self</h2>
        <div>
          <Formik
            initialValues={{
              age: "",
              weight: "",
              location: "",
              bloodGroup: "",
              contact: "",
            }}
            validationSchema={Yup.object({
              age: Yup.string().required("Required"),
              weight: Yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              savePatInfo(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="popup-Form">
                <div className="contact-div">
                  <div className="field">
                    <label htmlFor="age">Age</label>
                    <Field
                      type="text"
                      id="age"
                      name="age"
                      placeholder=""
                    ></Field>
                    <ErrorMessage name="age" className="err"></ErrorMessage>
                  </div>
                  <div className="field">
                    <label htmlFor="weight">Weight</label>
                    <Field
                      type="number"
                      id="weight"
                      name="weight"
                      placeholder="in kg"
                    ></Field>
                    <ErrorMessage name="weight" className="err"></ErrorMessage>
                  </div>
                  <div className="field">
                    <label htmlFor="gender">Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="select gender" label="Select gender">
                        Select gender
                      </option>
                      <option value="male" label="Male">
                        Male
                      </option>
                      <option value="female" label="Female">
                        Female
                      </option>
                      <option value="other" label="Other">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                <div className="contact-div">
                  <div className="field">
                    <label htmlFor="location">Location</label>
                    <Field type="text" id="location" name="location"></Field>
                    <ErrorMessage
                      name="location"
                      className="err"
                    ></ErrorMessage>
                  </div>
                  <div className="field">
                    <label htmlFor="contact">Contact Number</label>
                    <Field type="contact" id="contact" name="contact"></Field>
                    <ErrorMessage name="contact" className="err"></ErrorMessage>
                  </div>
                  <div className="field">
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <select
                      name="bloodGroup"
                      id="bloodGroup"
                      onChange={(e) => setBloodGroup(e.target.value)}
                    >
                      <option value="select bloodGroup" label="Blood Groups">
                        Blood Groups
                      </option>
                      <option value="B+" label="B+">
                        B+
                      </option>
                      <option value="A+" label="A+">
                        A+
                      </option>
                      <option value="B-" label="B-">
                        B-
                      </option>
                      <option value="A-" label="A-">
                        A-
                      </option>
                      <option value="AB+" label="AB+">
                        AB+
                      </option>
                      <option value="AB-" label="AB-">
                        AB-
                      </option>
                      <option value="O+" label="O+">
                        O+
                      </option>
                      <option value="O-" label="O-">
                        O-
                      </option>
                    </select>
                  </div>
                </div>

                <div className="past-issues-container">
                  <label htmlFor="location">Past Issues</label>
                  {pastIssueFields.map((field, index) => {
                    return (
                      <div className="issues" key={Date.now() +'fff'+index}>
                        <input
                          type="text"
                          id="issue-name"
                          name="issueName"
                          placeholder="Issue name"
                          value={field.issueName}
                          onChange={(e) => handleInputChange(e, index, "name")}
                        ></input>
                        <input
                          type="text"
                          id="issue-year"
                          name="years"
                          placeholder="Issue last for"
                          value={field.years}
                          onChange={(e) => handleInputChange(e, index, "year")}
                        ></input>
                      </div>
                    );
                  })}
                  <button type="button" onClick={() => addFields()}>
                    Add more Fields
                  </button>
                </div>
                <button type="submit">Save</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
