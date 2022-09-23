import { Routes, Route } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Main from "./Main";
import Home from "./Home";
import ResetLink from "./auth/ResetLink";
import Reqreset from "./auth/Reqreset";
import DocDetail from "./DocDetail";
import Appointments from "./Appointments";
import Profile from "./Profile";
import AppoDetails from "./AppoDetails";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />}>
          <Route path="/main/" element={<Home />} />
          <Route path="/main/:docid/docdetails" element={<DocDetail />} />
          <Route path="/main/appointments" element={<Appointments />} />
          <Route path="/main/profile" element={<Profile />} />
          <Route path="/main/appointments/details" element={<AppoDetails />} />
        </Route>
        <Route path="/reset/:code" element={<ResetLink />} />
        <Route path="/resetpass" element={<Reqreset />} />
      </Routes>
    </div>
  );
}

export default App;
