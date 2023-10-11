import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';

const routes = createBrowserRouter([
  { path: "/", element: <LogIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/profile", element: <Profile /> },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);


