import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CommentsProvider } from './context/CommentsContext';

import './index.css';
import routes from './routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CommentsProvider>
        <RouterProvider router={routes} />
      </CommentsProvider>
    </AuthProvider>
  </StrictMode>
);
