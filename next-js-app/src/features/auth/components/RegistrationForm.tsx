import { useAppDispatch } from '@/common/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AuthApi } from '../services/AuthService';
import { authActions } from '../store/auth.slice';
import registrationSchema from '../validators/registration.schema';

type regFormInputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const RegistrationForm: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  if (loggedIn) {
    router.push('/');
  }

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<regFormInputs>({
    resolver: yupResolver(registrationSchema),
  });

  const regFormSubmit: SubmitHandler<regFormInputs> = async (
    form: regFormInputs
  ) => {
    setLoading(true);

    let data: any = await AuthApi.registration(form);

    console.log(data);

    if (data && data.token) {
      dispatch(authActions.login(data.token));
      setLoggedIn(true);
    } else {
      console.error('Registration failed');
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
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(regFormSubmit)}
        sx={{ mt: 1 }}
      >
        <Controller
          defaultValue={''}
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Full Name"
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          defaultValue={''}
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          defaultValue={''}
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoFocus
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Controller
          defaultValue={''}
          name="confirm_password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              autoFocus
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
            />
          )}
        />

        <LoadingButton
          className="btn btn-primary"
          fullWidth
          type="submit"
          loading={loading}
          loadingPosition="start"
          sx={{ py: '1rem', mt: '1rem' }}
          startIcon={<AccountCircleIcon />}
        >
          <span>Register</span>
        </LoadingButton>
      </Box>
    </>
  );
};

export default RegistrationForm;
