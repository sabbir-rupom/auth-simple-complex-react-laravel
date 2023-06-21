'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from 'primereact/button';

const PrimaryNavbar = ({ user }: { user?: any }) => {
  const { push } = useRouter();
  return (
    <nav className="container flex mx-auto">
      <div className="logo">
        <Link
          className="px-3 text-4xl font-bold no-underline text-white"
          href="/"
        >
          Logo
        </Link>
      </div>
      <div className="px-3 flex md:flex-none align-middle justify-center md:hidden ">
        Menu Toggle
      </div>
      <div className="flex flex-1 align-middle justify-end">
        <ul className="navbar">
          <li className="nav-item">
            <Link href={`/simple`}>Simple</Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link href={`/complex`}>Complex</Link>
            </li>
          )}
          
          {user ? (
            <li className="nav-item">
              <Button
                label="Sign Out"
                icon="pi pi-sign-out"
                severity="danger"
                onClick={() => push('/sign-out')}
              />
            </li>
          ) : (
            <li className="nav-item">
              <Button
                label="Login"
                icon="pi pi-fw pi-sign-in layout-menuitem-icon"
                severity="danger"
                onClick={() => push('/login')}
              />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default PrimaryNavbar;
