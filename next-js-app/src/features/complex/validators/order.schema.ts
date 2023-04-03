import { array, date, mixed, number, object, string } from 'yup';

const orderProductSchema: any = object().shape({
  product: number(),
  product_unit: number(),
  product_category: number().optional(),
  quantity: number().min(1),
  unit_price: number(),
});

const orderSchema = object().shape({
  order_number: string()
    .required('Unique order number is required')
    .matches(
      /^[A-Z0-9]*$/,
      'Code must contain only uppercase letters and digits'
    ),
  buyer: number().min(1, 'Buyer information not selected'),
  customer: number().min(1, 'Customer information not selected'),
  customer_address: string().required('Please choose customer address'),
  order_date: date()
    .required('Order date is required')
    .min(new Date(), 'Date must be current or future'),
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

        const dayAfter = new Date(startDate.getTime()); // + 86400000

        return schema.min(
          dayAfter,
          'Delivery date has to be same or after the order date'
        );
      }

      return schema;
    }),
  delivery_time: string().required('Delivery time is required'),
  attachment: mixed<FileList>()
    .required('Attachment file is required')
    .test(
      'fileType',
      'Only the following formats are accepted: JPG, JPEG, PNG and PDF',
      (value: any) => {
        if (value[0]) {
          value = value[0];
        }
        return (
          value &&
          (value.type === 'image/jpeg' ||
            value.type === 'image/jpg' ||
            value.type === 'image/png' ||
            value.type === 'application/pdf')
        );
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
    .compact(v => !v.checked)
    .min(1, 'At least one product is required')
    .required(),
});

export default orderSchema;
