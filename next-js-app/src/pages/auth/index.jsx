import React from 'react';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Auth = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/auth/login');
  }, []);
  return <></>;
};

export default Auth;
