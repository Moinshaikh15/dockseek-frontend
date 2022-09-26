import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../axiosConfig";
import { setDocInfo } from "../slices/userSlice";
export default function DocProfile() {
  let { userInfo, info } = useSelector((state) => state.user);
  let [showEdit, setShowEdit] = useState(false);
  let qualRef = useRef();
  let specRef = useRef();
  let expeRef = useRef();
  let hospRef = useRef();
  let dispatch = useDispatch();

  let editDocInfo = () => {
    let obj = {};
    obj.qualification =
      qualRef?.current?.value !== ""
        ? qualRef?.current?.value
        : info.qualification;
    obj.experience =
      expeRef?.current?.value !== ""
        ? expeRef?.current?.value
        : info.experience;
    obj.speciality =
      specRef?.current?.value !== ""
        ? specRef?.current?.value
        : info.speciality;
    obj.hospital =
      hospRef?.current?.value !== "" ? hospRef?.current?.value : info.hospital;
    axiosClient
      .post(`doctor/${userInfo.docid}/edit`, obj)
      .then((res) => {
        let data = res.data;
        setShowEdit(false);
        dispatch(setDocInfo(obj));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <div className="left">
        <h3>Total Earnings: ₹ {info?.earning}</h3>
      </div>
      <div className="right">
        <div className="main-info">
          <div className="img-div">
            <img
              src={info?.img !== "" ? info?.img : "../medical-team.png"}
              alt="img"
            />
          </div>
          <div>
            <h2>Dr.{userInfo?.name}</h2>
            <p style={{ color: "rgb(219, 232, 237)" }}>{info?.speciality}</p>
            <p style={{ fontSize: "18px" }}>{info?.qualification}</p>
          </div>
        </div>
        <div>
          <p>Experience: {info?.experience} years</p>
          <p>Hospital: {info?.hospital}</p>
        </div>
        <div className="edit-container-main">
          <button className="edit" onClick={() => setShowEdit(!showEdit)}>
            Edit Info
          </button>

          <div
            className="edit-div"
            style={{ display: showEdit ? "flex" : "none" }}
          >
            <div className="field">
              <label htmlFor="qualification">Qualification</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                //value={info?.weight}
                ref={qualRef}
              />
            </div>

            <div className="field">
              <label htmlFor="speciality">Specialities</label>
              <input
                type="text"
                id="speciality"
                name="speciality"
                //value={info?.weight}
                ref={specRef}
              />
            </div>

            <div className="field">
              <label htmlFor="experience">Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                //value={info?.weight}
                ref={expeRef}
              />
            </div>
            <div className="field">
              <label htmlFor="hospital">Hospital</label>
              <input
                type="text"
                id="hospital"
                name="hospital"
                //value={info?.weight}
                ref={hospRef}
              />
            </div>

            <button className="save" onClick={() => editDocInfo()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
