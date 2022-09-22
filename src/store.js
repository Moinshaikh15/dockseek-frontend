import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import otherInfoReducer from "./slices/infoSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    otherInfo: otherInfoReducer,
  },
});
export default store;
