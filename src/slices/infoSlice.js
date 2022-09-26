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

        if (month < 10) month = +month;
        if (day < 10) day = "0" + day;

        return [day, month, year].join("-");
      };

      let todaysDate = todaysFullDate();
      let [day1, month1, year1] = todaysDate.split("-");
      let todaysDate2 = new Date(+year1, month1 - 1, +day1);
      let { docid, patid } = action.payload;
      let appointments = JSON.parse(JSON.stringify(state.appointments));
      let upcomingAppointments = [];
      let pastAppointments = [];
      let todaysAppointments = [];

      appointments.map((el) => {
        if (el.docid === docid || el.patid === docid || el.patid === patid) {
          let appoDate = el.date.split("T")[0];
          let [day, month, year] = appoDate.split("-");
          el.date = appoDate;
          appoDate = new Date(+year, month - 1, +day);

          if (todaysDate === el.date) {
            if (d.toTimeString() < el.starttime) {
              todaysAppointments.push(el);
            } else {
              pastAppointments.push(el);
            }
          } else if (todaysDate2 > appoDate) {
            pastAppointments.push(el);
          } else {
            upcomingAppointments.push(el);
          }
        }
      });
      state.upcomingAppointments = upcomingAppointments;
      state.pastAppointments = pastAppointments;
      state.todaysAppointments = todaysAppointments;
    },
    markDone: (state, action) => {
      let id = action.payload;
      let appointments = JSON.parse(JSON.stringify(state.appointments));
      appointments.map((el) => (el.flag = el.id === id ? "done" : "pending"));
      state.appointments = appointments;
    },
    markCancel: (state, action) => {
      let id = action.payload;
      let appointments = JSON.parse(JSON.stringify(state.appointments));
      appointments.map(
        (el) => (el.flag = el.id === id ? "canceled" : "pending")
      );
      state.appointments = appointments;
    },
    addNoteLocally: (state, action) => {
      let { id, note } = action.payload;
      let appointments = JSON.parse(JSON.stringify(state.appointments));
      console.log(appointments);
      appointments.map((el) => {
        console.log(el.id, id);
        if (el.id === id) {
          el.note = note;
        }
      });
      state.appointments = appointments;
    },
  },
});

export default userSlice.reducer;
export const {
  setDoctors,
  setAppointments,
  setShowDoc,
  sortAppointments,
  markDone,
  markCancel,
  addNoteLocally,
} = userSlice.actions;
