// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
// import { Navigate } from 'react-router-dom'

// import { callApi } from '../../../Shared/Api';
// import { authActions } from '../../../Store/Auth-slice';
// import ToastMsg from '../ToastMsg'

const Logout = () => {
  // const [message, setMessage] = useState(false)
  // const [loggedOut, setLoggedOut] = useState(false)

  // const dispatch = useDispatch()

  const handleLogout = async e => {
    // const { success, message } = await callApi('logout', 'get');
    // if(success) {
    //   setMessage(false)
    //   localStorage.removeItem('user_token');
    //   dispatch(authActions.logout());
    //   setLoggedOut(true);
    //   setMessage(message);
    // }
  }

  // if (loggedOut) {
  //   return <Navigate to='/login' />
  // }

  return (
    <>
      <Button
        color='error'
        type='button'
        variant='outlined'
        className='LogoutButton'
        onClick={handleLogout}
      >
        Logout
      </Button>
      {/* {message ? <ToastMsg type='error' message={message} /> : ''} */}
    </>
  )
}

export default Logout
