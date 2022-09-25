import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
let initialState = {
  doctors: [],
  appointments: [],
  upcomingAppointments: [],
  pastAppointments: [],
  availableSlots: [],
  todaysAppointments: [],
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
      } else if (filterType === "price") {
        let resultArr = doctors.filter(
          (el) => Number(el.fees) <= Number(filterEl)
        );
        state.showDocs = resultArr;
      }
    },
    sortAppointments: (state, action) => {
      let d = new Date();
      let todaysFullDate = () => {
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        return [year, month, day].join("-");
      };

      let todaysDate = todaysFullDate();
      let { docid, patid } = action.payload;
      let appointments = state.appointments;
      let upcomingAppointments = [];
      let pastAppointments = [];
      let todaysAppointments = [];
      appointments.map((el) => {
        if (el.docid === docid || el.patid === docid || el.patid === patid) {
          el = { ...el };
          let AppoDate = el.date.split("T")[0];
          el.date = AppoDate;
          if (todaysDate === AppoDate) {
            if (d.toTimeString() < el.starttime) {
              todaysAppointments.push(el);
            } else {
              pastAppointments.push(el);
            }
          } else if (todaysDate > AppoDate) {
            pastAppointments.push(el);
          } else {
            upcomingAppointments.push(el);
          }

          // if (el.flag === "pending") {
          //   upcomingAppointments.push(el);
          // } else {
          //   pastAppointments.push(el);
          // }
        }
      });
      state.upcomingAppointments = upcomingAppointments;
      state.pastAppointments = pastAppointments;
      state.todaysAppointments = todaysAppointments;
    },
  },
});

export default userSlice.reducer;
export const { setDoctors, setAppointments, setShowDoc, sortAppointments } =
  userSlice.actions;
