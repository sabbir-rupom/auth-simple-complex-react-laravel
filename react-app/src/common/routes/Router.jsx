import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import GuestRoute from './GuestRoute'
import PrivateRoute from './PrivateRoute'

import ErrorPage from '../pages/Error404'

function AppRouter () {
  return (
    <Routes>
      <Route path='/' element={<>Home</>} />

      <Route element={<GuestRoute />} errorElement={<ErrorPage />}>
        <Route path='registration' element={<>Register</>} />
        <Route path='login' element={<>Login</>} />
        <Route path='simple' element={<>Simple</>} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path='dashboard' element={<>Dashboard</>} />
        <Route
          path='complex-page'
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<>Order List</>} />
          <Route path='form' element={<>Order Form</>} />
        </Route>
      </Route>

      <Route path='not-found' element={<ErrorPage />} />
      <Route path='*' element={<Navigate to='/not-found' replace />} />
    </Routes>
  )
}

/**
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <GuestRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <>Home</>
      },
      {
        path: "/simple",
        element: <>Simple Page</>
      },
      {
        path: "/registration",
        element: <>Registration</>
      },
      {
        path: "/login",
        element: <>Login</>
      },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <>Dashboard</>
      },
      // {
      //   path: "/complex",
      //   element: <div><Outlet /></div>,
      //   'children': [
      //     {
      //       index: true,
      //       element: <>Order List</>
      //     },
      //     {
      //       path: "/form",
      //       element: <>Order Form</>
      //     },
      //   ]
      // },
    ],
  },
]);

 */

export default AppRouter
