import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import loginSchema from '../validators/login.schema';

type loginFormInputs = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginForm: React.FC<{}> = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<loginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const loginFormSubmit: SubmitHandler<loginFormInputs> = (
    data: loginFormInputs
  ) => {
    console.log('Form data: ', data);

    reset({});
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(loginFormSubmit)}
        sx={{ mt: 1 }}
      >
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
          control={control}
          name="remember"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={<Checkbox checked={value} onChange={onChange} />}
              label="Remember me"
            />
          )}
        />

        <button type="submit" className="btn btn-primary w-full mt-3">
          Sign In
        </button>
      </Box>
    </>
  );
};

export default LoginForm;
