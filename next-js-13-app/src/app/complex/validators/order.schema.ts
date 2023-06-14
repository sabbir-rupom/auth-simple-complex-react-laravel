import { array, date, mixed, number, object, string } from 'yup';

const orderProductSchema: any = object().shape({
  product: number().label('Product').required().min(1),
  product_unit: number().label('Product Unit').required().min(1),
  product_category: number().nullable().label('Product Category'),
  quantity: number().min(1, 'Product Quantity'),
  unit_price: number().label('Unit Price').min(0),
});

const today = new Date();
today.setHours(0, 0, 0, 0);

let createLogic = {
  order_number: string()
    .required('Unique order number is required')
    .matches(
      /^[A-Z0-9]*$/,
      'Code must contain only uppercase letters and digits'
    ),
  buyer: number()
    .required('Select a Buyer')
    .min(1, 'Buyer information not selected'),
  customer: number()
    .required('Select a customer')
    .min(1, 'Customer information not selected'),
  customer_address: string().required('Please choose customer address'),
  order_date: date().required('Order date is required'),
  // .min(today, 'Date must be current or future'),
  delivery_date: date()
    .required('Delivery date is required')
    .when('order_date', (orderDate: any, schema) => {
      if (orderDate) {
        let startDate: any;
        if (orderDate instanceof Date) {
          startDate = orderDate;
        } else {
          startDate = new Date(orderDate);
        }

        const dayAfter = new Date(startDate.getTime());
        +86400000;

        return schema.min(
          dayAfter,
          'Delivery date has to be same or after the order date'
        );
      }

      return schema;
    }),
  delivery_time: string().required('Delivery time is required'),
  attachment: mixed<FileList>()
    .nullable()
    .test(
      'fileType',
      'Only the following formats are accepted: JPG, JPEG, PNG and PDF',
      (value: any) => {
        if (value && value[0]) {
          value = value[0];
          return (
            value &&
            (value.type === 'image/jpeg' ||
              value.type === 'image/jpg' ||
              value.type === 'image/png' ||
              value.type === 'application/pdf')
          );
        } else {
          return true;
        }
      }
    )
    .test('fileSize', 'Only files up to 4MB are permitted', (value: any) => {
      return (
        !value || //Check if `files` is defined
        (value && value.size <= 4_000_000)
      ); // 4MB
    }),

  order_products: array()
    .of(orderProductSchema)
    // .compact(v => !v.checked)
    .min(1, 'At least one product is required'),
};

export const orderCreateSchema = object().shape(createLogic);

let updateLogic = createLogic;
updateLogic.attachment = mixed<FileList>()
  .notRequired()
  .test(
    'fileType',
    'Only the following formats are accepted: JPG, JPEG, PNG and PDF',
    (value: any) => {
      if (!value.length) {
        return true;
      } else {
        value = value[0];
        return (
          value &&
          (value.type === 'image/jpeg' ||
            value.type === 'image/jpg' ||
            value.type === 'image/png' ||
            value.type === 'application/pdf')
        );
      }
    }
  )
  .test('fileSize', 'Only files up to 4MB are permitted', (value: any) => {
    if (!value.length) return true;

    return (
      !value || //Check if `files` is defined
      (value && value.size <= 4_000_000)
    ); // 4MB
  });
export const orderUpdateSchema = object().shape(updateLogic);
