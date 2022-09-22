import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DocCard from "./DocCard";

export default function Home() {
  let { doctors } = useSelector((state) => state.otherInfo);
  console.log(doctors);
  return (
    <div className="home">
      <h1>We care For you and Your health</h1>
      <div className="docCard-container">
        {doctors.map((doc) => {
          return <DocCard doc={doc} key={doc.docid + Date.now()} />;
        })}
      </div>
    </div>
  );
}
