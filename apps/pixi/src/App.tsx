// import './App.css'

import { useEffect } from "react";
import Experience from "./components/Experience";
import socket from "./helper/socket";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./auth/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Profile } from "./pages/Profile";

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    socket.on("connection", () => {
      console.log(" A new user connected");
    });
  }, []);

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* <Route path="/main" element={<Experience />} /> */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/*" element={<h1>Not Found</h1>} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Experience />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
