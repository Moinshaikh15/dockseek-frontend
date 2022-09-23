import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  let { userInfo, info } = useSelector((state) => state.user);

  console.log(userInfo, info);
  return (
    <div className="profile">
      <div className="left">
        <p>Past Health Issues</p>
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
        <h2>Hi {userInfo?.name}</h2>
        <div>
          <p>Age: {info?.age}</p>
          <p>Weight:{info?.weight}</p>
        </div>
        <div>
          <p>Gender:{info?.gender}</p> <p>Blood Group: {info?.bloodgroup}</p>
        </div>
      </div>
    </div>
  );
}
