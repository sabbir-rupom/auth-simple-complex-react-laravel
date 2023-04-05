import ToastMessage from '@/common/components/ui/ToastMessage';
import { useAppSelector } from '@/common/redux/store';
import PrimaryNavbar from '@/layouts/navbar/PrimaryNavbar';
import Container from '@mui/material/Container';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const MasterLayout = ({ children }: Props) => {
  const toastType = useAppSelector((state) => state.toast.type);
  const toastMessage = useAppSelector((state) => state.toast.message);

  const [toastOpen, setToastOpen] = useState(false);
  useEffect(() => {
    if (toastType && toastMessage.length > 0) {
      setToastOpen(true);
    }
  }, [toastType, toastMessage]);

  return (
    <>
      <header>
        <PrimaryNavbar />
      </header>
      <Container
        maxWidth="xl"
        sx={{
          p: 3,
        }}
      >
        {children}
      </Container>
      <footer>
        {toastOpen && (
          <ToastMessage
            type={toastType}
            message={toastMessage}
            toastOpen={setToastOpen}
          />
        )}
      </footer>
    </>
  );
};

export default MasterLayout;
