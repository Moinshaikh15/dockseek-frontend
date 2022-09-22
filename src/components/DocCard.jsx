import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DocCard({ doc }) {
  let goto = useNavigate();
  return (
    <div
      className="doc-Card"
      onClick={() => {
        goto(`/main/${doc.docid}/docdetails`);
      }}
    >
      <div className="img-div">
        <img src="" alt="img" />
      </div>
      <div className="doc-info">
        <h4>Dr.{doc.name}</h4>
        <p>{doc.qualification}</p>
        <p>{doc.speciality}</p>
        <p>{doc.experience} year of experience</p>
        <p>₹{doc.fees}</p>
      </div>
    </div>
  );
}
