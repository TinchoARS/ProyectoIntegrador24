// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
