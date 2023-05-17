"use client";

import type { NextPage } from "next";
import Head from "next/head";

import { Box, Container, Link, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <LoginForm />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Link
              href="/register"
              className="tw-block tw-text-center tw-mt-5 tw-no-underline hover:tw-underline"
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
