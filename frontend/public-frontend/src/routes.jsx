import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      }
    ]
  }
])

export default router;