import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import PostDetails from './components/PostDetails/PostDetails';
import ErrorPage from './components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/posts',
        element: <Home />
      },
      {
        path: '/posts/:postId',
        element: <PostDetails />
      }
    ]
  }
])

export default router;