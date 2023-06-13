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
      <footer>
        <ToastMessage />
      </footer>
    </>
  );
};

export default MasterLayout;
