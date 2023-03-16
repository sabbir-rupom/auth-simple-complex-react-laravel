import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"


const ToastMsg = ({ message, type }) =>
{
  const [open, setOpen] = useState(true)

  const handleClose = () => setOpen(false)

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default ToastMsg