import MasterLayout from '@/layouts/MasterLayout';
import { Container } from '@mui/material';
import Head from 'next/head';

const Complex = () => {
  return (
    <>
      <Head>
        <title>Complex Page</title>
      </Head>

      <MasterLayout>
        <Container component="main" maxWidth="xs">
          Complex Page
        </Container>
      </MasterLayout>
    </>
  );
};

export default Complex;
