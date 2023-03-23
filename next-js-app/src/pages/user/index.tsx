import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const User = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/user/profile');
  }, []);
  return <></>;
};

export default User;
