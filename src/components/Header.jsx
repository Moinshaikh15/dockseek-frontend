import React from "react";

export default function Header() {
  return (
    <div className="header">
      <div>
        <h3> dockSeek</h3>
        <ul>
          <li>HOME</li>
          <li>APPOINTMENTS</li>
          <li>PROFILE</li>
        </ul>
        <button>Logout</button>
      </div>
    </div>
  );
}
