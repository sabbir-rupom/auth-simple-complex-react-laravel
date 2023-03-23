import * as Yup from 'yup';

const itemSchema = Yup.object().shape({
  name: Yup.string()
    .required('Item name is required')
    .min(3, 'Name must be at least 3 characters'),
  code: Yup.string()
    .required('Item code is required')
    .matches(
      /^.*(?=.*0-9])(?=.*[A-Z]).*$/,
      'Code must contain only uppercase letters and digits'
    ),
  head: Yup.number().required('Item head is required'),
  status: Yup.bool().nullable(),
});

export default itemSchema;
