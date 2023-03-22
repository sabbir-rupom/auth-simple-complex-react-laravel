import MasterLayout from '@/layouts/MasterLayout';
import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from "next/image";

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>React NextJS: Auth - Simple - Complex</title>
      </Head>

      <MasterLayout>Home</MasterLayout>
    </main>
  );
};

export default Home;
