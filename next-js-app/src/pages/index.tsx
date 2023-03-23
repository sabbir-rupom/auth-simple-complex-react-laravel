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

      <MasterLayout>
        <h2 style={{ padding: 10, textAlign: 'center' }}>Welcome</h2>

        <h4 style={{ textAlign: 'center' }}>
          (Auth + Simple + Complex) practice project
        </h4>
      </MasterLayout>
    </main>
  );
};

export default Home;
