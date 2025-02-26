import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Post from './components/Post/Post';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/posts', element: <Home /> },
      { path: '/posts/:postId', element: <Post /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/signup', element: <Signup /> }, 
      { path: '/login', element: <Login /> }
    ]
  }
])

export default router;