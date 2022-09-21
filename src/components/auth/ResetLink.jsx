import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetLink() {
  let { email } = useParams();
  let goto = useNavigate();
  let passRef = useRef();
  let resetPass = async () => {
    try {
      let resp = await fetch(`http://localhost:8000/auth/${email}/resetpass`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ password: passRef.current.value }),
      });
      if (resp.status === 200) {
        let data = await resp.json();
        console.log(data);
        goto("/");
      } else {
        let err = await resp.text();
        alert(err);
      }
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
