import { useAppDispatch } from '@/common/redux/store';
import { AuthApi } from '@/features/auth/services/AuthService';
import { authActions } from '@/features/auth/store/auth.slice';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function processLogout() {
      const result: boolean = await AuthApi.logout();

      if (result) {
        dispatch(authActions.logout());

        router.push('/');
      } else {
        console.log('Logout process failed');
      }
    }

    processLogout();
  }, []);

  return <></>;
};

export default Logout;
