export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const BASE_URL = SERVER_URL + process.env.NEXT_PUBLIC_API_PREFIX;
export interface NavItemInterface {
  name: string;
  path: string;
  guard: number;
}

export const PAGE_PUBLIC = 0;
export const PAGE_GUEST = 1;
export const PAGE_PRIVATE = 2;

export const NavItems: NavItemInterface[] = [
  { name: 'Simple', path: '/simple', guard: PAGE_PUBLIC },
  { name: 'Complex', path: '/complex', guard: PAGE_PRIVATE },
];

export const NavUserItems: NavItemInterface[] = [
  { name: 'Profile', path: '/user/profile', guard: PAGE_PRIVATE },
  { name: 'Logout', path: '/logout', guard: PAGE_PRIVATE },
];
