import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Resume from './resume/Resume';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Resume />,
  },
  {
    path: "skills",
    element: <Resume linkedPage='languages' />
  },
  {
    path: "exp",
    element: <Resume linkedPage='experience' />
  },
  {
    path: "edu",
    element: <Resume linkedPage='education' />
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
