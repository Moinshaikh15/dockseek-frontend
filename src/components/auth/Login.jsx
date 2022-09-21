import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
export default function Login() {
  let dispatch = useDispatch();
  let goto = useNavigate();
  let ref = useRef();
  let [email, setEmail] = useState("");
  console.log(email);
  let login = async (obj) => {
    try {
      let resp = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      if (resp.status === 200) {
        let data = await resp.json();
        console.log(data);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(setUser(data.userInfo));
        goto("/main");
      } else {
        let err = await resp.text();
        alert(err);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  //   let handleChange = (e) => {
  //     setEmail(e.target.value);
  //   };
  return (
    <div className="login">
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
