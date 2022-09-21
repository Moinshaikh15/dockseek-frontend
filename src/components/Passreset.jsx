import React, { useRef } from "react";

export default function Passreset() {
  let emailRef = useRef();
  let resetPass = async () => {
    try {
      let resp = await fetch("http://localhost:8000/auth/reqreset", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailRef.current.value }),
      });
      if (resp.status === 200) {
        let data = await resp.json();
        console.log(data);
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
