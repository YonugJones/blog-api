import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { CommentsProvider } from './context/CommentsContext';

import './index.css';
import routes from './routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <CommentsProvider>
          <RouterProvider router={routes} />
        </CommentsProvider>
      </PostProvider>
    </AuthProvider>
  </StrictMode>
);
