import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux';
import store from './redux/app/store';
import { Toaster } from "react-hot-toast"
import Homecontent from './components/Homecontent'
import TheaterList from './components/TheaterList'
import UserSeatView from './components/UserSeatView';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminWrapper from './wrappers/AdminWrapper';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CreatorPage from './pages/CreatorPage'
import Movie from './pages/movie';
import Theater from './pages/theater';
import Screen from './pages/screen';
import Show from './pages/show';
import Screenhome from './pages/screenhome';
import Screenlist from './pages/screenlist';
import Superadminhome from './pages/superadminhome';
import UserBookings from './components/userBookings';
import TicketPrint from './components/ticketPrint';


function App() {
  const [count, setCount] = useState(0);

  const routes = [
    {
      path : "/",
      element : <Homecontent/>
    },
    {
      path : "/theaterlist",
      element : <TheaterList/>
    },
    {
      path : "/selectseat",
      element : <UserSeatView/>
    },
    {
      path: "/user",
      element: <AdminWrapper />,
      children: [
        {
          path: "register",
          element: <Register />,
          hydrateFallbackElement: <div>Loading...</div>,
        },
        {
          path: "login",
          element: <Login />,
          hydrateFallbackElement: <div>Loading...</div>,
        },
        {
          path: "forgotpassword",
          element: <ForgotPassword />,
          hydrateFallbackElement: <div>Loading...</div>,
        },
        {
          path: "bookings",
          element: <UserBookings />,
          hydrateFallbackElement: <div>Loading...</div>,
        },
        {
          path: "ticket",
          element: <TicketPrint />,
          hydrateFallbackElement: <div>Loading...</div>,
        }
      ]
      
    },{
      path : "/screen",
      element : <CreatorPage/>
    },{
      path : "/movie",
      element : <AdminWrapper/>,
      children : [{
        path : "add",
        element : <Movie/>
      }]
    },{
      path : "/theater",
      element : <AdminWrapper/>,
      children : [{
        path : "add",
        element : <Theater/>
      }]
    },{
      path : "/screen",
      element : <AdminWrapper/>,
      children : [{
        path : "add",
        element : <Screen/>
      },
      {
        path : "viewTheaterHome",
        element : <Screenhome/>
      },
      {
        path : "viewScreenlist",
        element : <Screenlist/>
      }]
    },{
      path : "/show",
      element : <AdminWrapper/>,
      children : [{
        path : "add",
        element : <Show/>
      }]
    },
    {
      path : "viewAdminHome",
      element : <Superadminhome/>
    }
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
    }
    });

  return (
    <>
    <Provider store={store}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      </Provider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            color: "#ffffff",
            background: "#333333"
          }
        }}
      />
    </>
  )
}

export default App
