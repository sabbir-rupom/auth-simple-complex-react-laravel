import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/system';
import { blue, grey, red } from '@mui/material/colors';

// Create a theme instance.
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: grey[700],
    },
    error: {
      main: red[600],
    },
  },
});

export default theme;
