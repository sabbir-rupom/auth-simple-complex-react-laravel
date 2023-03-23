import LogoDeafult from '@/common/components/logo/LogoDeafult';
import LogoMobile from '@/common/components/logo/LogoMobile';
import MenuDefault from '@/common/components/menu/MenuDefault';
import MenuMobile from '@/common/components/menu/MenuMobile';
import MenuUser from '@/common/components/menu/MenuUser';
import { NavItems, NavUserItems } from '@/common/shared/data';
import { checkAuthentication } from '@/features/auth/services/AuthService';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { AppBar, Button, Container, Toolbar } from '@mui/material';

function PrimaryNavbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoDeafult />

          <MenuMobile pages={NavItems} />

          <LogoMobile />

          <MenuDefault pages={NavItems} />

          {checkAuthentication() && <MenuUser pages={NavUserItems} />}
          {!checkAuthentication() && (
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
