import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let goto = useNavigate();
  let logout = () => {
    localStorage.removeItem("userInfo");
    goto("/");
  };
  let [selected, setSelected] = useState("home");
  let url = window.location.href;
  useEffect(() => {
    if (url.split("main")[1].includes("/appointments")) {
      setSelected("appointments");
    }
    if (url.split("main")[1].includes("/profile")) {
      setSelected("profile");
    }
  }, []);
  return (
    <div className="header">
      <div>
        <h3> dockSeek</h3>
        <ul>
          <li
            onClick={() => {
              setSelected("home");
              goto("/main/");
            }}
            style={{ color: selected === "home" ? "#3a86ff" : "" }}
          >
            Home
          </li>
          <li
            onClick={() => {
              setSelected("appointments");
              goto("/main/appointments");
            }}
            style={{ color: selected === "appointments" ? "#3a86ff" : "" }}
          >
            Appointments
          </li>
          <li
            onClick={() => {
              setSelected("profile");
              goto("/main/profile");
            }}
            style={{ color: selected === "profile" ? "#3a86ff" : "" }}
          >
            Profile
          </li>
        </ul>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}
