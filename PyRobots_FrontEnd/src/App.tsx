import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateRobot from "./features/newrobot/CreateRobot";
import EmailValidationPage from "./features/register/emailValidation";
import HistoryResults from "./features/results/results";
import Home from "./features/directories/Home";
import ListMatches from "./features/listMatches/ListMatches";
import NewGame from "./features/newGame/NewGame";
import NewSimulation from "./features/board/NewSimulation";
import NotFound from "./features/NotFound";
import PersistLogin from "./features/PersistLogin";
import RequiereAuth from "./features/RequiereAuth";
import RobotLibrary from "./features/listRobotsAndStats/RobotLibrary";
import SignIn from "./features/login/SignIn";
import SignUp from "./features/register/SignUp";
import PassRecover from "./features/passwordRecovery/PassRecover";
import Profile from "./features/profile/profile";
import ChangePassword from "./features/profile/changePassword";

import "./App.css";


function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/validate" element={<EmailValidationPage />} />
          <Route path="/recoverPassword" element={<PassRecover/>} />

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequiereAuth />}>
              <Route path="/robotLibrary" element={<RobotLibrary />} />
              <Route path="/Simulation/" element={<NewSimulation />} />
              <Route path="/createRobot" element={<CreateRobot />} />
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<HistoryResults />} />
              <Route path="/listMatches" element={<ListMatches />} />
              <Route path="/newGame" element={<NewGame />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/changePassword" element={<ChangePassword />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
