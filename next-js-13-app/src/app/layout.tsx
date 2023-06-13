import '@/assets/global.scss';
import '@/assets/primereact.scss';
import BaseProvider from '@/components/BaseProvider';
import MasterLayout from '@/components/layouts/MasterLayout';
import FontRoboto from '@/config/font';

export const metadata = {
  title: 'NextJS: Auth - Simple - Complex',
  description: 'Practice project',
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={FontRoboto.className}>
        <BaseProvider session={session}>
          <MasterLayout>{children}</MasterLayout>
        </BaseProvider>
      </body>
    </html>
  );
}
