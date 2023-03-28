import LogoDeafult from '@/common/components/logo/LogoDeafult';
import LogoMobile from '@/common/components/logo/LogoMobile';
import MenuDefault from '@/common/components/menu/MenuDefault';
import MenuMobile from '@/common/components/menu/MenuMobile';
import { useAppSelector } from '@/common/redux/store';
import { NavItems } from '@/common/shared/data';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { AppBar, Button, Container, Toolbar } from '@mui/material';

function PrimaryNavbar() {
  const auth = useAppSelector((state) => state.userAuth.isLoggedIn);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoDeafult />

          <MenuMobile auth={auth} pages={NavItems} />

          <LogoMobile />

          <MenuDefault auth={auth} pages={NavItems} />

          {!auth && (
            <Button
              startIcon={<AccessibleIcon />}
              variant="contained"
              color="error"
              href="/auth"
            >
              <span
                style={{
                  paddingTop: 2,
                }}
              >
                Login
              </span>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default PrimaryNavbar;
