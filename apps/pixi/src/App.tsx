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
import AvatarsPage from "./pages/AvatarsPage";

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
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/*" element={<h1>Not Found</h1>} />
            <Route
              path="/arena"
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
            <Route
              path="/avatars"
              element={
                <ProtectedRoute>
                  <AvatarsPage />
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
