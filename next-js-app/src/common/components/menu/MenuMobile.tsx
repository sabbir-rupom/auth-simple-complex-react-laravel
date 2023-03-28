import { NavItemInterface } from '@/common/shared/data';
import * as React from 'react';

const MenuMobile = ({
  pages,
  auth,
}: {
  pages: NavItemInterface[];
  auth: boolean;
}) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <></>
    // <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    //   <IconButton
    //     size="large"
    //     aria-label="account of current user"
    //     aria-controls="menu-appbar"
    //     aria-haspopup="true"
    //     onClick={handleOpenNavMenu}
    //     color="inherit"
    //   >
    //     <MenuIcon />
    //   </IconButton>

    //   <Menu
    //     id="menu-appbar"
    //     anchorEl={anchorElNav}
    //     anchorOrigin={{
    //       vertical: 'bottom',
    //       horizontal: 'left',
    //     }}
    //     keepMounted
    //     transformOrigin={{
    //       vertical: 'top',
    //       horizontal: 'left',
    //     }}
    //     open={Boolean(anchorElNav)}
    //     onClose={handleCloseNavMenu}
    //     sx={{
    //       display: { xs: 'block', md: 'none' },
    //     }}
    //   >
    //     {pages.map((page: NavItemInterface) => (
    //       <MenuItem key={page.name} onClick={handleCloseNavMenu}>
    //         <Typography textAlign="center">{page.name}</Typography>
    //       </MenuItem>
    //     ))}
    //   </Menu>
    // </Box>
  );
};

export default MenuMobile;
