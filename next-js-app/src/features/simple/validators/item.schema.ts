import * as Yup from 'yup';

const itemSchema = Yup.object().shape({
  name: Yup.string()
    .required('Item name is required')
    .min(3, 'Name must be at least 3 characters'),
  code: Yup.string()
    .required('Item code is required')
    .matches(
      /^[A-Z0-9]*$/,
      'Code must contain only uppercase letters and digits'
    ),
  head: Yup.number().min(1).required('Item head is required'),
  status: Yup.bool().nullable(),
});

export default itemSchema;
