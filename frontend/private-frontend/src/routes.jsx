/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ManagePosts from './pages/ManagePosts/ManagePosts';

// Placeholder components for sub-routes

const ManageComments = () => <div>Manage Comments</div>;
const ManageUsers = () => <div>Manage Users</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <Login /> },
      {
        path: '/admin',
        element: <ProtectedRoute adminOnly={true} />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'posts', element: <ManagePosts /> },
          { path: 'comments', element: <ManageComments /> },
          { path: 'users', element: <ManageUsers /> },
        ],
      },
    ],
  },
]);

export default router;
