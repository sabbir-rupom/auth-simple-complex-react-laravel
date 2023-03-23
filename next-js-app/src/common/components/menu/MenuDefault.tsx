import { NavItemInterface } from '@/common/shared/data';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const MenuDefault = ({ pages }: { pages: NavItemInterface[] }) => {
  // const [userAuth, setUserAuth] = React.useState<boolean>(false);

  const router = useRouter();

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, mx: 3 }}>
      {pages.map(({ name, path, visibility }: NavItemInterface) => {
        if (visibility) {
          return (
            <Button
              key={name}
              onClick={() => router.push(path)}
              sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
            >
              {name}
            </Button>
          );
        }
      })}
    </Box>
  );
};

export default MenuDefault;
