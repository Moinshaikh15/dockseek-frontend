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
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setDocInfo: (state, action) => {
      let copyInfo = state.info;
      let obj = action.payload;
      copyInfo.qualification = obj.qualification;
      copyInfo.speciality = obj.speciality;
      copyInfo.experience = obj.experience;
      copyInfo.hospital = obj.hospital;
      state.info = copyInfo;
    },
    setPatInfo: (state, action) => {
      let copyInfo = state.info;
      let obj = action.payload;
      copyInfo.age = obj.age;
      copyInfo.weight = obj.weight;
      copyInfo.bloodgroup = obj.bloodgroup;
      copyInfo.gender = obj.gender;
      state.info = copyInfo;
    },
    addInfo:(state,action)=>{

    }
  },
});

export default userSlice.reducer;
export const { setUser, setInfo, setDocInfo,setPatInfo,addInfo } = userSlice.actions;
