import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(32, 'Password must not exceed 32 characters'),
  remember: Yup.bool().nullable(),
});

export default loginSchema;
