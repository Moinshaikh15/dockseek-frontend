import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  userInfo: null,
  info: null,
  profile: "",
};
if (localStorage.getItem("userInfo") !== "undefined") {
  initialState.userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      if (state.userInfo.docid !== null) {
        state.profile = "doc";
      } else {
        state.profile = "pat";
      }
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser,setInfo } = userSlice.actions;
