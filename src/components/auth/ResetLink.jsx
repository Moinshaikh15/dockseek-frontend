import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosConfig";
export default function ResetLink() {
  let { code } = useParams();
  let goto = useNavigate();
  let passRef = useRef();
  let resetPass = async () => {
    try {
      axiosClient
        .post(`auth/${code}/resetpass`, { password: passRef.current.value })
        .then((res) => {
          let data = res.data;
          goto("/");
        });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="reset">
      <div className="reset-form">
        <label htmlFor="pass">Enter Password</label>
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="******"
          ref={passRef}
        />
        <button onClick={() => resetPass()}>Reset Password</button>
      </div>
    </div>
  );
}
