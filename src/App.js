import "./sass/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext";
import { ScheduleProvider } from "./contexts/ScheduleContext";
import { OriginalWorkerProvider } from "./contexts/OriginalWorkerContext";
import { WorkerProvider } from "./contexts/WorkerContext";
import NavBar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import OneMonthOverview from "./pages/OneMonthOverview";
import SixMonthsOverview from "./pages/SixMonthsOverview";
import UserSettings from "./pages/UserSettings";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { wakeUpServer } from "./functions/wakeUpServer";

function App() {
  wakeUpServer();

  return (
    <AuthenticationProvider>
      <GlobalProvider>
        <OriginalWorkerProvider>
          <WorkerProvider>
            <ScheduleProvider>
              <BrowserRouter>
                <NavBar />
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route
                    path="/oneMonthSchedule"
                    element={<OneMonthOverview />}
                  />
                  <Route
                    path="/sixMonthSchedule"
                    element={<SixMonthsOverview />}
                  />
                  <Route path="/userSettings" element={<UserSettings />} />
                </Routes>
              </BrowserRouter>
            </ScheduleProvider>
          </WorkerProvider>
        </OriginalWorkerProvider>
      </GlobalProvider>
    </AuthenticationProvider>
  );
}

export default App;
