import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = ({ children }) =>
{
  const auth = useSelector(state => state.auth.isLoggedIn);

  if(auth) {
    return <Navigate to='/dashboard' />
  }

  return children ? children : <Outlet />;
}

export default GuestRoute