import LoginForm from '@/features/auth/components/LoginForm';
import MasterLayout from '@/layouts/MasterLayout';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Login</title>
      </Head>

      <MasterLayout>
        <Container component="main" maxWidth="xs">
          <LoginForm />
        </Container>
      </MasterLayout>
    </main>
  );
};

export default Login;
