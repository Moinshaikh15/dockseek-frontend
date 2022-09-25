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
        <img
          src={doc.img !== null ? doc.img : "../medical-team.png"}
          alt="img"
        />
      </div>
      <div className="doc-info">
        <h4>Dr.{doc.name}</h4>

        <p style={{ fontSize: "14px", color: "gray" }}>{doc.speciality}</p>
        <p>{doc.qualification}</p>
        {/* <p>
          {doc.experience} {doc.experience === 1 ? "year" : "years"} of
          experience
        </p> */}
        <p>₹{doc.fees}</p>
        <p>⭐⭐⭐⭐ </p>
      </div>
    </div>
  );
}
