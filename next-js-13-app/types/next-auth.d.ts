import NextAuth from "next-auth";

type UserToken = {
  token: string;
};

declare module "next-auth/jwt" {
  interface JWT extends UserToken {}
}

declare module "next-auth" {
  interface Session {
    user: UserToken;
  }
}

declare module 'primereact';