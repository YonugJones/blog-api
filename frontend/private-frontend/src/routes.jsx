import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ManagePosts from './pages/ManagePosts/ManagePosts';
import ManageComments from './pages/ManageComments/ManageComments';
import NewPostForm from './pages/NewPostForm/NewPostForm';
import EditPostForm from './pages/EditPostForm/EditPostForm';



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
          { path: 'posts/new', element: <NewPostForm /> },
          { path: 'posts/:postId/edit', element: <EditPostForm /> },
          { path: 'posts/:postId/comments', element: <ManageComments /> }
        ],
      },
    ],
  },
]);

export default router;
