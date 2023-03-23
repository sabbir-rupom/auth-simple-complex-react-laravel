import { checkAuthentication } from '@/features/auth/services/AuthService';

export interface NavItemInterface {
  name: string;
  path: string;
  visibility: boolean;
}

export const NavItems: NavItemInterface[] = [
  { name: 'Simple', path: '/simple', visibility: !checkAuthentication() },
  { name: 'Complex', path: '/complex', visibility: checkAuthentication() },
];

export const NavUserItems: NavItemInterface[] = [
  { name: 'Profile', path: '/user/profile', visibility: checkAuthentication() },
  { name: 'Logout', path: '/logout', visibility: checkAuthentication() },
];
