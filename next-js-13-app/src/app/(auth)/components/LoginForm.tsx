'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import loginSchema from '../validators/login.schema';
import { signIn } from 'next-auth/react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

type loginFormInputs = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginForm: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<loginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const loginFormSubmit: SubmitHandler<loginFormInputs> = async (
    form: loginFormInputs,
  ) => {
    setLoading(true);
    const result = signIn('credentials', {
      email: form.email,
      password: form.password,
      remember: form.remember,
      callbackUrl: '/',
      redirect: true,
    });
  };

  /**
   * Reset form if registration process is finished
   */
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
      setLoading(false);
    }
  }, [isSubmitSuccessful, reset, setLoading]);

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(loginFormSubmit)}
      className="tw-mt-1 tw-w-full tw-flex tw-flex-col"
    >
      <Controller
        defaultValue={''}
        name="email"
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <label
              className={
                'tw-font-bold pb-1' + (errors['email'] ? `p-error` : '')
              }
            >
              User Email
            </label>
            <InputText
              placeholder="Enter email address"
              type='email'
              required
              {...rest}
              value={value}
              onChange={onChange}
              className={`${errors['email'] ? `p-invalid` : ''}`}
            />
            <small className="p-error mb-3">
              {errors['email'] ? errors['email'].message : ''}
            </small>
          </>
        )}
      />

      <Controller
        defaultValue={''}
        name="password"
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <label
              className={
                'tw-font-bold pb-1' + (errors['password'] ? `p-error` : '')
              }
            >
              Password
            </label>
            <InputText
              placeholder="Enter password"
              type="password"
              required
              {...rest}
              value={value}
              onChange={onChange}
              className={`${errors['password'] ? `p-invalid` : ''}`}
            />
            <small className="p-error mb-3">
              {errors['password'] ? errors['password'].message : ''}
            </small>
          </>
        )}
      />

      <Controller
        name="remember"
        control={control}
        defaultValue={false}
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <div className="flex align-items-center mb-3">
              <Checkbox {...rest} checked={value} onChange={onChange} />
              <label className="ml-2">Remember me</label>
            </div>
          </>
        )}
      />

      <Button type="submit" label="Sign In" icon="pi pi-sign-in" />
    </form>
  );
};

export default LoginForm;
