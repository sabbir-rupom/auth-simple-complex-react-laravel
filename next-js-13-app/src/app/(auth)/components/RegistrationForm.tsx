'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AuthApi } from '../services/AuthService';
import registrationSchema from '../validators/registration.schema';
import { toastActions } from '@/redux/features/toast.slice';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useAppDispatch } from '@/redux/hook';

type regFormInputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const RegistrationForm: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<regFormInputs>({
    resolver: yupResolver(registrationSchema),
  });

  const regFormSubmit: SubmitHandler<regFormInputs> = async (
    form: regFormInputs,
  ) => {
    setLoading(true);

    let data: any = await AuthApi.registration(form);

    if (data && data.token) {
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Successful',
          message: 'Registration successful! Please login',
        }),
      );

      setTimeout(() => router.push('/login'), 2000);
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Failure',
          message: 'Registration failed!',
        }),
      );
    }
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
      onSubmit={handleSubmit(regFormSubmit)}
      className="mt-1 w-full flex flex-col"
    >
      <Controller
        defaultValue={''}
        name="name"
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <label
              className={'font-bold pb-1' + (errors['name'] ? `p-error` : '')}
            >
              Full Name
            </label>
            <InputText
              placeholder="eg. John Doe"
              required
              {...rest}
              value={value}
              onChange={onChange}
              className={`${errors['name'] ? `p-invalid` : ''}`}
            />
            <small className="p-error mb-3">
              {errors['name'] ? errors['name'].message : ''}
            </small>
          </>
        )}
      />

      <Controller
        defaultValue={''}
        name="email"
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <label
              className={'font-bold pb-1' + (errors['email'] ? `p-error` : '')}
            >
              User Email
            </label>
            <InputText
              placeholder="e.g example@gmail.com"
              type="email"
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
                'font-bold pb-1' + (errors['password'] ? `p-error` : '')
              }
            >
              Password
            </label>
            <InputText
              placeholder="Enter Password ..."
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
        defaultValue={''}
        name="confirm_password"
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <label
              className={
                'font-bold pb-1' + (errors['confirm_password'] ? `p-error` : '')
              }
            >
              Confirm Password
            </label>
            <InputText
              placeholder="Confirm Password ..."
              type="password"
              required
              {...rest}
              value={value}
              onChange={onChange}
              className={`${errors['confirm_password'] ? `p-invalid` : ''}`}
            />
            <small className="p-error mb-3">
              {errors['confirm_password']
                ? errors['confirm_password'].message
                : ''}
            </small>
          </>
        )}
      />

      <Button
        severity="info"
        type="submit"
        label="Register"
        icon={`${isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-user-plus'}`}
      />
    </form>
  );
};

export default RegistrationForm;
