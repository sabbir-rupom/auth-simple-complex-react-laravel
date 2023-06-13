import type { Metadata, NextPage } from 'next';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';

export const metadata: Metadata = {
  title: 'Login Page',
};

const Login: NextPage = () => {
  return (
    <section className="tw-container mx-auto tw-mt-10">
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-border tw-rounded tw-max-w-md p-4 tw-mx-auto">
        <h1 className="tw-font-bold my-3 tw-text-2xl">Sign in</h1>

        <LoginForm />

        <div className="my-5 tw-text-center">
          Don't have an account?
          <Link
            href="/register"
            className="text-primary tw-no-underline hover:tw-underline"
          >
            {' Sign Up'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
