import React, { useRef } from "react";
import axiosClient from "../../axiosConfig";
export default function Reqreset() {
  let emailRef = useRef();
  let resetPass = async () => {
    try {
      axiosClient
        .post(`auth/reqreset`, { email: emailRef.current.value })
        .then((res) => {
          let data = res.data;
          console.log(data);
        });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="reset">
      <div className="reset-form">
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="user@mail.com"
          ref={emailRef}
        />
        <button onClick={() => resetPass()}>Get Link</button>
      </div>
    </div>
  );
}
