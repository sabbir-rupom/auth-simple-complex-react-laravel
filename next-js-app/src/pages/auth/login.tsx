import LoginForm from '@/features/auth/components/LoginForm';
import MasterLayout from '@/layouts/MasterLayout';
import type { NextPage } from 'next';
import Head from 'next/head';

import { Box, Container, Link, Typography } from '@mui/material';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
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
              Sign in
            </Typography>

            <LoginForm />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Link
                href="/auth/register"
                className="block text-center mt-5 no-underline hover:underline"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Container>
      </MasterLayout>
    </>
  );
};

export default Login;
