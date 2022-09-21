import { Routes, Route } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Main from "./Main";
import Home from "./Home";
import ResetLink from "./auth/ResetLink";
import Passreset from "./Passreset";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />}>
          <Route path="/main/" element={<Home />} />
        </Route>
        <Route path="/reset/:code" element={<ResetLink />} />
        <Route path="/resetpass" element={<Passreset />} />
      </Routes>
    </div>
  );
}

export default App;
