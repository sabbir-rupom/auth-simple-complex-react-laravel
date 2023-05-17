"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { saveUserToken } from "./(auth)/services/AuthService";
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user) {
    saveUserToken(session.user.token);
  }

  return (
    <div className="tw-bg-gradient-to-b tw-from-cyan-50 tw-to-cyan-200 tw-p-2 tw-flex tw-gap-5 ">
      <Link className="tw-text-sky-600 hover:tw-text-sky-700" href={"/"}>
        Home
      </Link>

      <Link className="tw-text-sky-600 hover:tw-text-sky-700" href={"/user"}>
        User Panel
      </Link>
      <div className="tw-ml-auto tw-flex tw-gap-2">
        {session?.user ? (
          <>
            <p className="tw-text-sky-600"> User Signed In</p>
            <button
              className="tw-text-red-500"
              onClick={() => {
                console.log("sign out");
                router.push("/sign-out");
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button className="tw-text-green-600" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
