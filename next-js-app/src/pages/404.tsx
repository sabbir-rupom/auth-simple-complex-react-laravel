import GuestLayout from '@/layouts/MasterLayout';
import type { NextPage } from 'next';
import Head from 'next/head';

const Custom404: NextPage = () => {
  return (
    <main>
      <Head>
        <title>404: Page not found</title>
      </Head>

      <GuestLayout>
        <h2 style={{ padding: 10, textAlign: 'center' }}>
          404: Page not found
        </h2>
      </GuestLayout>
    </main>
  );
};

export default Custom404;
