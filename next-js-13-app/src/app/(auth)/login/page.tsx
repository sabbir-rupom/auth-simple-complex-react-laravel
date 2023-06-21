import type { Metadata, NextPage } from 'next';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';

export const metadata: Metadata = {
  title: 'Login Page',
};

const Login: NextPage = () => {
  return (
    <section className="page-content">
      <div className="auth-container">
        <h1 className="font-bold my-3 text-2xl">Sign in</h1>

        <LoginForm />

        <div className="my-5 text-center">
          Don't have an account?
          <Link
            href="/register"
            className="text-primary no-underline hover:underline"
          >
            {' Sign Up'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
