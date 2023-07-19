import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Play from './views/Play/Play.tsx'
import Stats from './views/Stats/Stats.tsx'
import Login from './views/Login/Login.tsx'
import Register from './views/Register/Register.tsx'
import Settings from './views/Settings/Settings.tsx'
import Logout from './views/Logout/Logout.tsx'
import register from './views/Register/register.ts'
import login from './views/Login/login.ts'
import logout from './views/Logout/logout.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Navigate to={'/play'}/>
      },
      {
        path: '/play',
        element: <Play/>
      },
      {
        path: '/stats',
        element: <Stats/>
      },
      {
        path: '/settings',
        element: <Settings/>
      },
      {
        path: '/login',
        element: <Login/>,
        action: login
      },
      {
        path: '/register',
        element: <Register/>,
        action: register
      },
      {
        path: '/logout',
        element: <Logout/>,
        action: logout
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
