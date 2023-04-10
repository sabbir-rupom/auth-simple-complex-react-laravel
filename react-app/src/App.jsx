import '@fontsource/roboto';
import './assets/styles/global.scss';
import theme from './config/theme';
import { Box, ThemeProvider } from '@mui/material';

function App () {
  return (
    <ThemeProvider theme={theme}>
      <h2 className='text-center'>
        <span>Working</span>
      </h2>
      <Box
        sx={{
          height: '300px',
          width: {
            xs: 100,
            sm: 200,
            md: 300,
            lg: 400
          },
          bgcolor: 'secondary.main'
        }}
      />
    </ThemeProvider>
  );
}

export default App;
