'use client';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/redux/store';

type Props = {
  children: React.ReactNode;
  session: any;
};

const BaseProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
};

export default BaseProvider;
