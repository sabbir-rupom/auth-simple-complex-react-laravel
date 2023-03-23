import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@/assets/styles/globals.scss';
import store from '@/common/redux/store';
import theme from '@/config/theme';
import { ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
