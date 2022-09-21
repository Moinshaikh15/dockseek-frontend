import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
export default function PatPopup() {
  let { userInfo } = useSelector((state) => state.user);

  let savePatInfo = async (obj) => {
    let token = localStorage.getItem("accessToken");
    obj.patId = userInfo.patid;
    console.log(obj);

    try {
      let resp = await fetch(`http://localhost:8000/patient/new`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(obj),
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
              gender: "",
              contact: "",
            }}
            validationSchema={Yup.object({
              qualification: Yup.string().required("Required"),
              experience: Yup.string().required("Required"),
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
                    <select>
                      <option value="male" label="Select gender">
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
                </div>

                <div className="past-issues-container">
                  <label htmlFor="location">Past Issues</label>
                  <div></div>
                  <div className="issues">
                    <Field
                      type="text"
                      id="issue-name"
                      name="issue-name"
                      placeholder="Issue name"
                    ></Field>
                    <Field
                      type="text"
                      id="issue-year"
                      name="issue-year"
                      placeholder="Issue last for"
                    ></Field>
                  </div>
                  <div className="issues">
                    <Field
                      type="text"
                      id="issue-name"
                      name="issue-name"
                      placeholder="Issue name"
                    ></Field>
                    <Field
                      type="text"
                      id="issue-year"
                      name="issue-year"
                      placeholder="Issue last for"
                    ></Field>
                  </div>
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
