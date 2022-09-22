import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  doctors: [],
  appointments: [],
  availableSlots: [],
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
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setDoctors, setAppointments } = userSlice.actions;
