import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import PostDetails from './components/PostDetails/PostDetails';
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
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/posts', element: <Home /> },
      { path: '/posts/:postId', element: <PostDetails /> },
      { path: '/signup', element: <Signup /> }, 
      { path: '/login', element: <Login /> }
    ]
  }
])

export default router;


/*
  import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const App = lazy(() => import('./App'));
const Home = lazy(() => import('./components/Home/Home'));
const About = lazy(() => import('./components/About/About'));
const Login = lazy(() => import('./components/Login/Login'));
// Add other routes similarly

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

export default router;
*/