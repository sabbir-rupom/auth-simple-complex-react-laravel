"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import loginSchema from "../validators/login.schema";
import { signIn } from "next-auth/react";

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
    const result = signIn("credentials", {
      email: form.email,
      password: form.password,
      remember: form.remember,
      callbackUrl: "/",
      redirect: true
    });
    // let data: any = await AuthApi.login(form);
    // if (data && data.token) {
    //   dispatch(authActions.login(data.token));
    //   setLoggedIn(true);
    // } else {
    //   console.error('Registration failed');
    // }
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
        onSubmit={handleSubmit(loginFormSubmit)}
        sx={{ mt: 1 }}
      >
        <Controller
          defaultValue={""}
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
          defaultValue={""}
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

        <LoadingButton
          className="btn btn-primary"
          fullWidth
          type="submit"
          loading={loading}
          loadingPosition="start"
          sx={{ py: "1rem", mt: "1rem" }}
          startIcon={<AccessibilityIcon />}
        >
          <span>Sign In</span>
        </LoadingButton>
      </Box>
    </>
  );
};

export default LoginForm;
