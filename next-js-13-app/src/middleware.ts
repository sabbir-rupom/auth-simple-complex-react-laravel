export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/user/:path*", "/complex/:path*", "/sign-out"],
};
