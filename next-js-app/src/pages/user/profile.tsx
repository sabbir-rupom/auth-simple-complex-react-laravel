import MasterLayout from '@/layouts/MasterLayout';
import { Container } from '@mui/material';
import Head from 'next/head';

const Profile = () => {
  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>

      <MasterLayout>
        <Container component="main" maxWidth="xs">
          Profile Page
        </Container>
      </MasterLayout>
    </>
  );
};

export default Profile;
