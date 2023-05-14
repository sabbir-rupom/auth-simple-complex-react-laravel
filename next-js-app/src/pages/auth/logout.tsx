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
      dispatch(authActions.logout());

      const result: boolean = await AuthApi.logout();
      if (!result) {
        console.log('Logout process failed');
      }
      router.push('/');
    }

    processLogout();
  }, []);

  return <></>;
};

export default Logout;
