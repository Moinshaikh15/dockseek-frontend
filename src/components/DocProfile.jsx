import React from "react";
import { useSelector } from "react-redux";

export default function DocProfile() {
  let { userInfo, info } = useSelector((state) => state.user);
  return (
    <>
      <div className="left">
        <p>Total Earnings</p>
        <div>
          {info?.pastissues?.pastIssueFields.map((issue) =>
            issue.issueName !== "" ? (
              <div key={Date.now() + issue.issueName + issue.years}>
                <p>{issue.issueName}</p>
                <p>{issue.years} year</p>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div className="right">
        <h2>Dr.{userInfo?.name}</h2>
        <div>
          <p>Qualification: {info?.qualification}</p>
          <p>Speciality:{info?.speciality}</p>
        </div>
        <div>
          <p>Experience:{info?.experience} years</p>
          <p>Hospital:{info?.hospital} years</p>
        </div>
      </div>
    </>
  );
}
