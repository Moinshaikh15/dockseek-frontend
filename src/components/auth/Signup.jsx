import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

export default function Signup() {
  let dispatch = useDispatch();
  let goto = useNavigate();

  let [selected, setSelected] = useState(null);

  let signUp = async (obj) => {
    if (selected === null) {
      alert("please select who are you");
      return;
    }
    if (selected === "doc") {
      let id = Math.floor(Math.random() * (90000 - 10000)) + 10000;
      id = "2" + id;
      obj.docId = id;
    } else if (selected === "pat") {
      let id = Math.floor(Math.random() * (90000 - 10000)) + 10000;
      id = "1" + id;
      obj.patId = id;
      console.log(id);
      return;
    }
    try {
      let resp = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      if (resp.status === 200) {
        goto("/main");
      } else {
        let err = await resp.text();
        alert(err);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup">
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(4, "Must be 4 characters long")
              .required("Required"),
            email: Yup.string().email("Invalid email address"),
            password: Yup.string().min(4, "Must be 4 characters long"),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password")],
              "Your passwords does not match"
            ),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            signUp(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="authForm">
              <div>
                <label htmlFor="name">UserName</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="username"
                ></Field>
                <ErrorMessage
                  name="name"
                  className="err"
                  style={{ color: "red" }}
                ></ErrorMessage>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="user@mail.com"
                ></Field>
                <ErrorMessage name="email" className="err"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="******"
                ></Field>
                <ErrorMessage name="password" className="err"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="******"
                ></Field>
                <ErrorMessage
                  name="confirmPassword"
                  className="err"
                ></ErrorMessage>
              </div>
              <div className="doc-pat">
                <label htmlFor="">I am a</label>
                <button
                  onClick={() => setSelected("doc")}
                  style={{
                    backgroundColor: selected === "doc" ? "blueviolet" : "",
                    color: selected === "doc" ? "white" : "",
                  }}
                  type="button"
                >
                  Doctor
                </button>
                <button
                  onClick={() => setSelected("pat")}
                  style={{
                    backgroundColor: selected === "pat" ? "blueviolet" : "",
                    color: selected === "pat" ? "white" : "",
                  }}
                  type="button"
                >
                  Patient
                </button>
              </div>

              <button type="submit">Signup</button>
            </Form>
          )}
        </Formik>
        <p>
          Already has an Account <Link to={"/"}>login here</Link>
        </p>
      </div>
    </div>
  );
}
