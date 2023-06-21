import type { Metadata, NextPage } from 'next';
import RegistrationForm from '../components/RegistrationForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Registration Page',
};

const Register: NextPage = () => {
  return (
    <section className="page-content">
      <div className="auth-container">
        <h1 className="font-bold my-3 text-2xl">User Registration</h1>

        <RegistrationForm />
        <div className="my-5 text-center">
          Already have an account?
          <Link
            href="/login"
            className="text-primary no-underline hover:underline"
          >
            {' Sign In'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
