import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Login from './pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <Login /> }
    ]
  }
])

export default router;