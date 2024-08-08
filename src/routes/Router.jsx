import { createBrowserRouter } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import NuevaCategoria from "../components/NuevaCategoria";
import Articles from "../components/Articles";
import EditarCategoria from "../components/EditarCategoria";
import EliminarCategoria from "../components/EliminarCategoria";
import CategoryArticles from "../components/CategoryArticles";
import NuevoArticulo from "../components/NuevoArticulo";
import EditarArticulo from "../components/EditarArticulo";
import EliminarArticulo from "../components/EliminarArticulo";
import EditArticleCategory from "../components/EditArticleCategory";

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
            {
                path:"categories/edit",
                element:<EditarCategoria />,
            },
            {
               path:"categories/delete",
               element:<EliminarCategoria />,
            },
            {
                path: "seccion/:categoriaNombre",
                element: <CategoryArticles />,
            },
            {
                path: "articles/new",
                element: <NuevoArticulo />,
            },
            {
                path: "articles/edit/:articleId",
                element: <EditarArticulo />,
            },
            {
                path: "articles/delete/:articleId",
                element: <EliminarArticulo />,
            },
            {
                path: "articles/:articleId/edit-categories",
                element: <EditArticleCategory />,
            },
        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
