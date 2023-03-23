import LogoDeafult from '@/common/components/logo/LogoDeafult';
import LogoMobile from '@/common/components/logo/LogoMobile';
import MenuDefault from '@/common/components/menu/MenuDefault';
import MenuMobile from '@/common/components/menu/MenuMobile';
import MenuUser from '@/common/components/menu/MenuUser';
import { NavItems, NavUserItems } from '@/common/shared/data';
import { checkAuthentication } from '@/features/auth/services/AuthService';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

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
              startIcon={<MeetingRoomIcon />}
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
