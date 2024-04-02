import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
//import Results from './pages/Results.jsx'
import Error from './pages/Error'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/profiles/:profileId',
        element: <Profile />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

