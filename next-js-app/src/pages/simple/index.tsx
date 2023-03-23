import MasterLayout from '@/layouts/MasterLayout';
import { Container } from '@mui/material';
import Head from 'next/head';

const Simple = () => {
  return (
    <>
      <Head>
        <title>Simple Page</title>
      </Head>

      <MasterLayout>
        <Container component="main" maxWidth="xs">
          Simple Page
        </Container>
      </MasterLayout>
    </>
  );
};

export default Simple;
