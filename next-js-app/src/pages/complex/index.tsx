import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Complex = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/complex/order');
  }, []);
  return <></>;
};

export default Complex;
