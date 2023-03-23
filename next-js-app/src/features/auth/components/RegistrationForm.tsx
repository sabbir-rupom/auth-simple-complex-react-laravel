import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import registrationSchema from '../validators/registration.schema';

type regFormInputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const RegistrationForm: React.FC<{}> = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<regFormInputs>({
    resolver: yupResolver(registrationSchema),
  });

  const regFormSubmit: SubmitHandler<regFormInputs> = (data: regFormInputs) => {
    console.log('Form data: ', data);

    reset({});
  };

  return (
    <>
      <Box
        component="form"
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

        <button type="submit" className="btn btn-blue w-full mt-3">
          Register
        </button>
      </Box>
    </>
  );
};

export default RegistrationForm;
