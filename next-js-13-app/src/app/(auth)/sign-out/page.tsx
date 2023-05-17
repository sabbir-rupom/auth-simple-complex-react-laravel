"use client";

import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { AuthApi, clearSession } from "../services/AuthService";

const SignOut: NextPage = () => {
  useEffect(() => {
    async function handleLogout() {
      const result: boolean = await AuthApi.logout();
      if (result) {
        clearSession();
        signOut();
      }
    }

    handleLogout();
  }, []);

  return <></>;
};

export default SignOut;
