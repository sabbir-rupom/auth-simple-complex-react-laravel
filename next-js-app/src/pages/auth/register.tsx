import { useAppSelector } from '@/common/redux/store';
import RegistrationForm from '@/features/auth/components/RegistrationForm';
import MasterLayout from '@/layouts/MasterLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.userAuth.isLoggedIn);
  if (auth) {
    router.push('/');
  }

  return (
    <main>
      <Head>
        <title>User Registration</title>
      </Head>

      <MasterLayout>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              User Registration
            </Typography>

            <RegistrationForm />
          </Box>
        </Container>
      </MasterLayout>
    </main>
  );
};

export default Register;
