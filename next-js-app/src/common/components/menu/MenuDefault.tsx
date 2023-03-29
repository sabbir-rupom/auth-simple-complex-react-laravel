import {
  NavItemInterface,
  PAGE_GUEST,
  PAGE_PRIVATE,
  PAGE_PUBLIC,
} from '@/common/shared/data';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuUser from './MenuUser';

const MenuDefault = ({
  pages,
  auth,
}: {
  pages: NavItemInterface[];
  auth: boolean;
}) => {
  const [pageItems, setPageItems] = useState<NavItemInterface[]>([]);

  const router = useRouter();

  useEffect(() => {
    let navItems = [];
    if (auth) {
      navItems = pages.filter(
        (page) => page.guard === PAGE_PUBLIC || page.guard === PAGE_PRIVATE
      );
    } else {
      navItems = pages.filter(
        (page) => page.guard === PAGE_PUBLIC || page.guard === PAGE_GUEST
      );
    }

    setPageItems(navItems);
  }, [pages, auth]);

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {pageItems &&
        pageItems.map(({ name, path }: NavItemInterface) => (
          <Button
            key={name}
            onClick={() => router.push(path)}
            sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
          >
            {name}
          </Button>
        ))}

      {auth && <MenuUser />}
    </Box>
  );
};

export default MenuDefault;
