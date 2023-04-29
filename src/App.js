import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//component imports
// import Sidebar from './components/Sidebar';
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import PatientDetails from "./pages/PatientDetails";
import LoginComponent from "./pages/Login";
import swal from "sweetalert";
import Registration from "./pages/Registration";
import { useContext, useEffect, useState } from "react";
import AdminComponent from "./pages/admin/AdminDashboard";
import VerifyDoctors from "./pages/admin/VerifyDoctors";
import { LoggedInUserContext } from "./context/LoggedInUserContext";
import { ChatContextProvider } from "./context/ChatContext";
import AddContent from "./pages/admin/AddContent";

function App() {
  const [loggedinUser, setLoggedinUser] = useState({
    token: null,
    user: {},
    role: null,
  });

  const loggedInUser = loggedinUser.user;
  const token = loggedinUser.token;
  const role = loggedinUser.role;

  const ProtectedRoute = ({ children }) => {
    if (role === null) {
      // swal('Please Login','you cannot access the page without login!', 'error');
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  useEffect(() => {
    console.log("userdetails",loggedinUser);
  },[loggedinUser])

  return (
    <LoggedInUserContext.Provider value={{ loggedinUser, setLoggedinUser }}>
      <ChatContextProvider>
        <Router>
          <Routes>
            {/* open routes */}

            <Route exact path="/login" element={<LoginComponent />} />

            <Route path="/register" element={<Registration />} />

            {/* Admin routes */}
            {role === "ROLE_ADMIN" && (
              <>
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      {/* <AdminComponent /> */}
                      <VerifyDoctors />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/addContent"
                  element={
                    <ProtectedRoute>
                      {/* <VerifyDoctors /> */}
                      <AddContent />
                    </ProtectedRoute>
                  }
                />
              </>
            )}

            {/* Doctor Routes */}

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard toke={token} user={loggedInUser} />
                </ProtectedRoute>
              }
            >
              DashBoard
            </Route>

            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <Patients toke={token} user={loggedInUser} />
                </ProtectedRoute>
              }
            >
              Patients
            </Route>

            <Route
              path="/patients/:patientId"
              element={
                <ProtectedRoute>
                  <PatientDetails />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/chats"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            >
              Messages
            </Route>

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile token={token} user={loggedInUser} />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Dashboard toke={token} user={loggedInUser} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ChatContextProvider>
    </LoggedInUserContext.Provider>
  );
}

export default App;
