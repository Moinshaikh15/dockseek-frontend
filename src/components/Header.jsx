import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let goto = useNavigate();
  let logout = () => {
    localStorage.removeItem("userInfo");
    goto("/");
  };
  return (
    <div className="header">
      <div>
        <h3> dockSeek</h3>
        <ul>
          <li onClick={() => goto("/main/")}>HOME</li>
          <li onClick={() => goto("/main/appointments")}>APPOINTMENTS</li>
          <li onClick={() => goto("/main/profile")}>PROFILE</li>
        </ul>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}
