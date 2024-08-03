import { createBrowserRouter } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import NuevaCategoria from "../components/NuevaCategoria";
import Articles from "../components/Articles";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                element: <Home />,
            },
            {
                path: "articles",
                element: <Articles />,
                children: [
                    {
                        index: true,
                        element: <h1>Artículos</h1>,
                    },
                    {
                        path: "add",
                        element: (
                            <ProtectedRoute>
                                <ArticleForm />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path:"categories/new",
                element:<NuevaCategoria />,
            },
        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
