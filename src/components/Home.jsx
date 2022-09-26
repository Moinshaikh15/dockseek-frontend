import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowDoc } from "../slices/infoSlice";
import DocCard from "./DocCard";

export default function Home() {
  let { userInfo } = useSelector((state) => state.user);
  let { doctors, specialities, showDocs } = useSelector(
    (state) => state.otherInfo
  );
  console.log(showDocs);
  // let [showDocs, setShowDocs] = useState([]);
  let ref = useRef();
  let dispatch = useDispatch();
  let [showSpeciality, setShowSpeciality] = useState([]);
  let [show, setShow] = useState(false);
  let [price, setPrice] = useState(500);

  let showSpecialities = (e) => {
    setShow(true);
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
    dispatch(setShowDoc({ filterEl, filterType }));
    // if (filterType === "speciality") {
    //   let resultArr = doctors.filter((el) => {
    //     el = { ...el };
    //     el.speciality = el.speciality.toLowerCase();
    //     if (el.speciality === filterEl || el.speciality.includes(filterEl)) {
    //       return el;
    //     }
    //   });
    //   setShowDocs(resultArr);
    // } else if (filterType === "price") {
    //   let resultArr = doctors.filter(
    //     (el) => Number(el.fees) <= Number(filterEl)
    //   );
    //   setShowDocs(resultArr);
    // }
  };

  useEffect(() => {
    if (showSpeciality.length > 0) {
      setShow(true);
    }
    // setShowDocs(doctors);
  }, []);
  return (
    <div className="home">
      <div className="home-main">
        <div className="home-top">
          <h1>We Care For You and Your Health</h1>
          <div className="find-doc">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Cardiologist"
              ref={ref}
              onChange={(e) => showSpecialities(e)}
            />
            <label htmlFor="search">
              <img src="../search.png" alt="" />
            </label>
          </div>
          <div
            className="showSearch"
            style={{ display: show ? "flex" : "none" }}
          >
            {showSpeciality.map((el) => (
              <p
                onClick={() => {
                  setShow(false);
                  filterDocs(el, "speciality");
                }}
                key={Date.now() + el}
              >
                {el}
              </p>
            ))}
          </div>

          <label htmlFor="range">
            Fees <p>₹ 100 {price !== "100" ? ` - ₹ ${price}` : ""} </p>
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            value={price}
            className="range"
            onChange={(e) => {
              filterDocs(e.target.value, "price");
              setPrice(e.target.value);
            }}
          />

          <img src="../doc.jpg" alt="" className="doc-pattern" />
        </div>
        <div className="doctors">
          <h4>Doctors</h4>
          <div className="docCard-container">
            {showDocs?.map((doc) =>
              userInfo?.docid !== doc?.docid ? (
                <DocCard doc={doc} key={doc?.docid + Date.now()} />
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
