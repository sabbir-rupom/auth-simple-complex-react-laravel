import { Button, CircularProgress } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>React NextJS: Auth - Simple - Complex</title>
      </Head>

      <h1>Working well</h1>

      <CircularProgress color="secondary" />

      <Button variant="contained">Contained</Button>
    </main>
  );
};

export default Home;
