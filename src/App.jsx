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
import Reactions from "./components/Reactions";
import ArticleDetails from "./components/ArticleDetails";
import CategoryArticles from "./components/CategoryArticles";
import NuevoArticulo from "./components/NuevoArticulo";
import EditarArticulo from "./components/EditarArticulo";
import EliminarArticulo from "./components/EliminarArticulo";
import EditArticleCategory from "./components/EditArticleCategory";

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
                    <Route path="/articles/:id" element={<ArticleDetails />} />
                    <Route path="reactions" element={<Reactions />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/categories/edit" element={<EditarCategoria />} />
                    <Route path="/categories/delete" element={<EliminarCategoria />} />
                    <Route path="/seccion/:categoriaNombre" element={<CategoryArticles />} />
                    <Route path="/articles/new/" element={<NuevoArticulo />} />
                    <Route path="/articles/edit/:articleId" element={<EditarArticulo />} />
                    <Route path="/articles/delete/:articleId" element={<EliminarArticulo />} />
                    <Route path="articles/:articleId/edit-categories" element={<EditArticleCategory />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;