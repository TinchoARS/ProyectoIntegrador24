// src/Router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Auth/Login';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';
import Comments from '../components/Comments';

const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true, // path: "/"
        element: <Home />,
      },
      {
        path: 'articles',
        children: [
          {
            index: true,
            element: <h1>Artículos</h1>,
          },
          {
            path: 'add',
            element: (
              <ProtectedRoute>
                <ArticleForm />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'comments',
        element: <Comments />,
      },
    ],
  },
  {
    path: '*',
    element: <h1>Not Found</h1>,
  },
]);

export { Router };
