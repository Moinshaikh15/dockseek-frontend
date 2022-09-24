import React from "react";
import { useSelector } from "react-redux";
export default function PatProfile() {
  let { userInfo, info } = useSelector((state) => state.user);
  return (
    <>
      <div className="left">
        <h3>Past Health Issues</h3>
        <div className="issues-div">
          {info?.pastissues?.pastIssueFields.map((issue) =>
            issue.issueName !== "" ? (
              <div key={Date.now() + issue.issueName + issue.years} className='issue'>
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
        <h2>Hi {userInfo?.name}</h2>
        <div>
          <p>Age: {info?.age}</p>
          <p>Weight: {info?.weight} kg</p>
        </div>
        <div>
          <p>Gender: {info?.gender}</p> <p>Blood Group: {info?.bloodgroup}</p>
        </div>
      </div>
    </>
  );
}
