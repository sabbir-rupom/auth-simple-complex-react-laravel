import * as Yup from 'yup';

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Fullname is required')
    .min(6, 'Fullname must be at least 6 characters')
    .max(32, 'Fullname must not exceed 32 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must not exceed 20 characters'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref<any>('password'), null], 'Confirm Password does not match'),
});

export default registrationSchema;
