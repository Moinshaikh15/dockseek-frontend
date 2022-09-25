import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
let initialState = {
  doctors: [],
  appointments: [],
  availableSlots: [],
  specialities: [
    "Gynecologist",
    "Dentist",
    "General Physician",
    "Dermatologist",
    "Ear-nose-throat(ent)Specialist",
    "Homoeopath",
    "Ayurveda",
    "Orthopedics",
    "BDS",
    "Neurosciences",
  ],
  showDocs: [],
};
if (localStorage.getItem("userInfo") !== "undefined") {
  initialState.userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

const userSlice = createSlice({
  name: "info",
  initialState: initialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
      state.showDocs = state.doctors;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setShowDoc: (state, action) => {
      let { filterType, filterEl } = action.payload;
      let doctors = state.doctors;
      if (filterType === "speciality") {
        let resultArr = doctors.filter((el) => {
          el = { ...el };
          el.speciality = el.speciality.toLowerCase();
          if (el.speciality === filterEl || el.speciality.includes(filterEl)) {
            return el;
          }
        });
        state.showDocs = resultArr;
        // setShowDocs(resultArr);
      } else if (filterType === "price") {
        let resultArr = doctors.filter(
          (el) => Number(el.fees) <= Number(filterEl)
        );
        state.showDocs = resultArr;
        //  setShowDocs(resultArr);
      }
    },
  },
});

export default userSlice.reducer;
export const { setDoctors, setAppointments, setShowDoc } = userSlice.actions;
