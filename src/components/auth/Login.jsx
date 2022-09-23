import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import axiosClient from "../../axiosConfig";
export default function Login() {
  let dispatch = useDispatch();
  let goto = useNavigate();
  let login = async (obj) => {
    try {
      axiosClient.post("/auth/login", obj).then((res) => {
        let data = res.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(setUser(data.userInfo));
        goto("/main");
      });
    } catch (err) {
      alert(err.message);
    }
  };

  //   let handleChange = (e) => {
  //     setEmail(e.target.value);
  //   };
  return (
    <div className="login">
      <h2>DockSeek</h2>
      <img src="../dockSeekLogin.png" alt="" className="pattern"/>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address"),
            password: Yup.string().min(4, "Must be 4 characters long"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            login(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="authForm">
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
                <Link to={"/resetpass"}>Forgot password?</Link>
              </div>

              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
        <p>
          Dont' have an Account <Link to={"/signup"}>Signup here</Link>
        </p>
      </div>
    </div>
  );
}
