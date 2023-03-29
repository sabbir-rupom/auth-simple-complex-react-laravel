import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@/assets/styles/globals.scss';
import store from '@/common/redux/store';
import theme from '@/config/theme';
import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * -------------------------------------
   * Hydration Error Handling - Code Start
   * --------------------------------------
   */
  const [showChild, setShowChild] = useState<boolean>(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    /**
     * -------------------------------------
     * Hydration Error Handling - Code End
     * --------------------------------------
     */
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
