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
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
