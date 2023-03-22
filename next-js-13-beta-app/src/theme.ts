import { createTheme } from '@mui/material/styles'
import { Theme } from '@mui/system'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
