// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import NuevaCategoria from "./components/NuevaCategoria";
import Articles from "./components/Articles";
import EditarCategoria from "./components/EditarCategoria";
import EliminarCategoria from "./components/EliminarCategoria";
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
                    <Route path="/categories/new" element={<NuevaCategoria />} />
                    <Route path="articles" element={<Articles />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/categories/edit" element={<EditarCategoria />} />
                    <Route path="/categories/delete" element={<EliminarCategoria />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;