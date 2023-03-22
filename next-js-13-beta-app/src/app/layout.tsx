import FontRoboto from "@/font";
import RootStyleRegistry from "./emotion";

import "./globals.css";

export const metadata: object = {
  title: "React NextJS: Auth, Simple & Complex",
  description: "React Next.JS app development practice having Authentication, Simple page & Complex page feature",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en">
      <body className={FontRoboto.className}>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
