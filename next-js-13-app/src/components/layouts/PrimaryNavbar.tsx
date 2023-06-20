'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from 'primereact/button';

const PrimaryNavbar = ({ user }: { user?: any }) => {
  const { push } = useRouter();
  return (
    <nav className="tw-container tw-flex mx-auto">
      <div className="logo">
        <Link
          className="tw-px-3 tw-text-4xl tw-font-bold tw-no-underline tw-text-white"
          href="/"
        >
          Logo
        </Link>
      </div>
      <div className="tw-px-3 tw-flex md:tw-flex-none tw-align-middle tw-justify-center md:tw-hidden ">
        Menu Toggle
      </div>
      <div className="tw-flex tw-flex-1 tw-align-middle tw-justify-end">
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
