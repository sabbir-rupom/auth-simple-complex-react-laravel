import { createTheme } from '@mui/material/styles';
import { blue, grey, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[600]
    },
    secondary: {
      main: grey[700]
    },
    error: {
      main: red[600]
    }
  }
});

export default theme;
