import Typography from '@mui/material/Typography';

const LogoDeafult = () => {
  return (
    <>
      {/* <Image src={LogoImage} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          flexGrow: 1,
        }}
      >
        LOGO
      </Typography>
    </>
  );
};

export default LogoDeafult;
