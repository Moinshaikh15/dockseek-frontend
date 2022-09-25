import React, { startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setInfo } from "../slices/userSlice";
import DocPopup from "./DocPopup";
import PatPopup from "./PatPopup";
import axiosClient from "../axiosConfig";
import Header from "./Header";
import { setDoctors } from "../slices/infoSlice";
export default function Main() {
  let dispatch = useDispatch();
  let { userInfo, profile, info } = useSelector((state) => state.user);
  let [showPopup, setShowPopup] = useState(true);

  //get users info if he is a doc
  let getDocInfo = async () => {
    let docId = userInfo?.docid;

    axiosClient
      .get(`doctor/${docId}`)
      .then((res) => {
        let data = res.data;
        dispatch(setInfo(data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // get users inof if he is patient
  let getPatient = async () => {
    let patId = userInfo?.patid;

    axiosClient
      .get(`patient/${patId}`)
      .then((res) => {
        let data = res.data;
        dispatch(setInfo(data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //get all doc's
  let getAllDocs = () => {
    axiosClient
      .get(`doctor/`)
      .then((res) => {
        let data = res.data;
        dispatch(setDoctors(data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  console.log(info);
  useEffect(() => {
    if (userInfo?.docid !== null) {
      getDocInfo();
    } else {
      getPatient();
    }
    getAllDocs();
  }, []);
  return (
    <div className="main">
      {info === null || info === "" ? (
        <div className="popup-div">
          {userInfo.docid !== null ? <DocPopup /> : <PatPopup />}
        </div>
      ) : (
        ""
      )}

      <Header />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
