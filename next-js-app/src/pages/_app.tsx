import type { AppProps } from 'next/app';

import '@/assets/styles/globals.css';
import theme from '@/config/theme';
import { ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
