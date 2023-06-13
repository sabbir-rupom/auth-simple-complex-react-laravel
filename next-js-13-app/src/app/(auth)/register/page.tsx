import type { Metadata, NextPage } from 'next';
import RegistrationForm from '../components/RegistrationForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Registration Page',
};

const Register: NextPage = () => {
  return (
    <section className="tw-container mx-auto tw-mt-10">
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-border tw-rounded tw-max-w-md p-4 tw-mx-auto">
        <h1 className="tw-font-bold my-3 tw-text-2xl">User Registration</h1>

        <RegistrationForm />
        <div className="my-5 tw-text-center">
          Already have an account?
          <Link
            href="/login"
            className="text-primary tw-no-underline hover:tw-underline"
          >
            {' Sign In'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
