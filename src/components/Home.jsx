import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocCard from "./DocCard";

export default function Home() {
  let { userInfo } = useSelector((state) => state.user);
  let { doctors, specialities } = useSelector((state) => state.otherInfo);
  let [showDocs, setShowDocs] = useState([]);
  let ref = useRef();
  let [showSpeciality, setShowSpeciality] = useState([]);
  let showSpecialities = (e) => {
    if (e.target.value !== "") {
      let arr = [];
      specialities.map((el) => {
        el = el.toLowerCase();
        if (el.includes(e.target.value)) {
          arr.push(el);
        }
      });
      setShowSpeciality(arr);
    } else {
      setShowSpeciality([]);
    }
  };
  let filterDocs = (filterEl, filterType) => {
    if (filterType === "speciality") {
      let resultArr = doctors.filter((el) => {
        el = { ...el };
        el.speciality = el.speciality.toLowerCase();
        if (el.speciality === filterEl || el.speciality.includes(filterEl)) {
          console.log("yy");
          return el;
        }
      });
      console.log(resultArr);
      setShowDocs(resultArr);
    } else if (filterType === "price") {
      let resultArr = doctors.filter(
        (el) => Number(el.fees) >= Number(filterEl)
      );
      setShowDocs(resultArr);
    }
  };

  useEffect(() => {
    setShowDocs(doctors);
    console.log(doctors);
  }, []);
  return (
    <div className="home">
      <h1>We care For you and Your health</h1>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        name="search"
        id="search"
        ref={ref}
        onChange={(e) => showSpecialities(e)}
      />
      <div className="showSearch">
        {showSpeciality.map((el) => (
          <p onClick={() => filterDocs(el, "speciality")} key={Date.now() + el}>
            {el}
          </p>
        ))}
      </div>
      <div className="docCard-container">
        {showDocs?.map((doc) =>
          userInfo.docid !== doc.docid ? (
            <DocCard doc={doc} key={doc.docid + Date.now()} />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}
