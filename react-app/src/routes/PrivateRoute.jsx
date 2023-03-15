import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) =>
{
  const auth = useSelector(state => state.auth.isLoggedIn);

  if(!auth) {
    return <Navigate to='/login' />
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute