import React from "react";
import { useSelector } from "react-redux";
import DocProfile from "./DocProfile";

import PatProfile from "./PatProfile";

export default function Profile() {
  let { userInfo, info } = useSelector((state) => state.user);

  console.log(userInfo, info);
  return (
    <div className="profile">
      {userInfo.docid === null ? <PatProfile /> : <DocProfile />}
    </div>
  );
}
