import { useAppDispatch } from '@/common/redux/store';
import { toastActions } from '@/common/redux/toast.slice';
import MasterLayout from '@/layouts/MasterLayout';
import { AlertColor } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const handleToast = (type: AlertColor, message: string) => {
    dispatch(
      toastActions.showToast({
        type: type,
        message: message,
      })
    );
  };
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

        {/* <Button
          variant="outlined"
          type="button"
          onClick={() => handleToast('success', 'Successfully working')}
        >
          Success
        </Button> */}
      </MasterLayout>
    </main>
  );
};

export default Home;
