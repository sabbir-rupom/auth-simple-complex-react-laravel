'use client';

import { ReactNode } from 'react';
import PrimaryNavbar from './PrimaryNavbar';
import ToastMessage from '../ui/ToastMessage';
import { useSession } from 'next-auth/react';
import { saveUserToken } from '@/app/(auth)/services/AuthService';

interface Props {
  children: ReactNode;
}

const MasterLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  if (session?.user) {
    saveUserToken(session.user.token);
  }

  return (
    <>
      <header className="tw-bg-blue-600 tw-p-3">
        <PrimaryNavbar user={session?.user} />
      </header>
      <main className="layout-wrapper">{children}</main>
      <footer className='mt-4 py-4 tw-border-t tw-bg-slate-100'>
        <ToastMessage />
        <p className="tw-text-center">Sabbir Hossain © Copyright 2023</p>
      </footer>
    </>
  );
};

export default MasterLayout;
