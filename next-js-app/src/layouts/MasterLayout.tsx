import PrimaryNavbar from '@/layouts/navbar/PrimaryNavbar';
import Container from '@mui/material/Container';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MasterLayout = ({ children }: Props) => {
  return (
    <>
      <header>
        <PrimaryNavbar />
      </header>
      <main>
        <Container
          maxWidth="xl"
          sx={{
            p: 3,
          }}
        >
          {children}
        </Container>
      </main>
    </>
  );
};

export default MasterLayout;
