"use client"

import { Metadata } from 'next';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Complex Page',
};

const Complex = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/complex/order');
  }, []);
  return <></>;
};

export default Complex;
