import React, { startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setInfo } from "../slices/userSlice";
import DocPopup from "./DocPopup";
import PatPopup from "./PatPopup";
export default function Main() {
  let dispatch = useDispatch();
  let { userInfo, profile, info } = useSelector((state) => state.user);
  let [showPopup, setShowPopup] = useState(true);

  let getDocInfo = async () => {
    let docId = userInfo.docid;
    let token = localStorage.getItem("accessToken");
    try {
      let resp = await fetch(`http://localhost:8000/doctor/${docId}`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (resp.status === 200) {
        let data = await resp.json();
        dispatch(setInfo(data));
      } else {
        let err = await resp.text();
        alert(err);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  let getPatient = async () => {
    let patId = userInfo.patid;
    let token = localStorage.getItem("accessToken");
    try {
      let resp = await fetch(`http://localhost:8000/patient/${patId}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (resp.status === 200) {
        let data = await resp.json();
        dispatch(setInfo(data));
      } else {
        let err = await resp.text();
        alert(err);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    if (userInfo?.docId !== null) {
      getDocInfo();
    } else {
      getPatient();
    }

    if (info !== null) {
      setShowPopup(false);
    }
  }, []);
  return (
    <div className="main">
      {showPopup ? (
        <div className="popup-div">
          {" "}
          {userInfo.docId !== null ? <DocPopup /> : <PatPopup />}
        </div>
      ) : (
        ""
      )}

      <Outlet />
    </div>
  );
}
