import { checkAuthentication } from '@/common/utils/general';

export interface NavItemInterface {
  name: string;
  path: string;
  visibility: boolean;
}

export const NavItems: NavItemInterface[] = [
  { name: 'Simple', path: '/', visibility: !checkAuthentication() },
  { name: 'Complex', path: '/', visibility: checkAuthentication() },
];

export const NavUserItems: NavItemInterface[] = [
  { name: 'Profile', path: '/', visibility: checkAuthentication() },
  { name: 'Logout', path: '/', visibility: checkAuthentication() },
];
