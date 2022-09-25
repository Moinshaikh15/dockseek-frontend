import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../axiosConfig";
export default function PatProfile() {
  let { userInfo, info } = useSelector((state) => state.user);
  let [gender, setGender] = useState();
  let [bloodGroup, setBloodGroup] = useState();
  let [showEdit, setShowEdit] = useState(false);
  let ageRef = useRef();
  let weightRef = useRef();
  let bloodRef = useRef();
  let genderRef = useRef();
  let editPatInfo = () => {
    let obj = {};
    obj.age = ageRef?.current?.value;
    obj.weight = weightRef?.current?.value;
    obj.gender = genderRef?.current?.value;
    obj.bloodGroup = bloodRef?.current?.value;
console.log(obj)
    // axiosClient
    //   .post(`patient/${userInfo.patid}/edit`, obj)
    //   .then((res) => {
    //     let data = res.data;
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };
  return (
    <>
      <div className="left">
        <h3>Past Health Issues</h3>
        <div className="issues-div">
          {info?.pastissues?.pastIssueFields.map((issue) =>
            issue.issueName !== "" ? (
              <div
                key={Date.now() + issue.issueName + issue.years}
                className="issue"
              >
                <p>{issue.issueName}</p>
                <p>For {issue.years} year</p>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div className="right">
        <div>
          <h2>Hi {userInfo?.name}</h2>
          <h4>Your Personal Information</h4>
          <div>
            <p>Age: {info?.age}</p>
            <p>Weight: {info?.weight} kg</p>
          </div>
          <div>
            <p>Gender: {info?.gender}</p> <p>Blood Group: {info?.bloodgroup}</p>
          </div>
        </div>
        <div className="edit-container-main">
          <button className="edit" onClick={() => setShowEdit(!showEdit)}>
            Edit Info
          </button>

          <div
            className="edit-div"
            style={{ display: showEdit ? "flex" : "none" }}
          >
            <div className="first-div">
              <div className="field">
                <label htmlFor="weight">Weight</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={info?.weight}
                  ref={weightRef}
                />
              </div>
              <div className="field">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={info?.age}
                  ref={ageRef}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                value={info?.gender}
                ref={genderRef}
              >
                <option value="select gender" label="Select gender">
                  Select gender
                </option>
                <option value="male" label="Male">
                  Male
                </option>
                <option value="female" label="Female">
                  Female
                </option>
                <option value="other" label="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select
                name="bloodGroup"
                id="bloodGroup"
                onChange={(e) => setBloodGroup(e.target.value)}
                value={info?.bloodgroup}
                ref={bloodRef}
              >
                <option value="select bloodGroup" label="Blood Groups">
                  Select Blood Group
                </option>
                <option value="B+" label="B+">
                  B+
                </option>
                <option value="A+" label="A+">
                  A+
                </option>
                <option value="B-" label="B-">
                  B-
                </option>
                <option value="A-" label="A-">
                  A-
                </option>
                <option value="AB+" label="AB+">
                  AB+
                </option>
                <option value="AB-" label="AB-">
                  AB-
                </option>
                <option value="O+" label="O+">
                  O+
                </option>
                <option value="O-" label="O-">
                  O-
                </option>
              </select>
            </div>
            <button className="save" onClick={editPatInfo()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
