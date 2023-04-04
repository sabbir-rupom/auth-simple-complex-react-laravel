import { FileInput } from '@/common/components/form/element/FileInput';
import { TextareaInput } from '@/common/components/form/element/TextareaInput';
import { useAppSelector } from '@/common/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { OrderDTO, defaultOrderInput } from '../shared/data';
import orderSchema from '../validators/order.schema';
import FormDeliveryAddress from './FormDeliveryAddress';
import FormOrderProducts from './FormOrderProducts';
import OrderBasicForm from './OrderBasicForm';

const FormMain = ({ orderId }: { orderId: number }) => {
  const defaultValues = useAppSelector((state) => state.order.orderFormInput);
  const [loading, setLoading] = useState<boolean>(false);

  const [customerLocations, setCustomerLocations] = useState([[]]);

  const form: UseFormReturn<OrderDTO, UseFormProps> = useForm<OrderDTO>({
    resolver: yupResolver(orderSchema),
    defaultValues,
  });

  const resetForm = () => {
    form.reset(defaultOrderInput);
  };

  const handleCustomerChange = (addressList: []) => {
    setCustomerLocations(addressList);
  };

  // const orderFormSubmit: SubmitHandler<OrderDTO> = async (inputs: OrderDTO) => {
  // setLoading(true);

  // console.log(inputs);

  // let result: boolean = false;
  // if (orderId > 0) {
  //   result = await OrderApi.update(orderId, inputs);
  // } else {
  //   result = await OrderApi.create(inputs);
  // }

  // if (result) {
  //   console.log('success');
  // }
  // };

  // const { fields, append, remove } = useFieldArray({
  //   name: 'order_products',
  //   control,
  //   keyName: 'orderProductId',
  // });

  const orderFormSubmit = (form: OrderDTO) => {
    console.log(form);
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(orderFormSubmit)}
          noValidate
          autoComplete="off"
        >
          {/* <input type="hidden" name="id" value={orderId} /> */}

          <div className="text-xl font-bold text-center mb-7">
            {orderId > 0 ? 'Edit Order' : 'Add New Order'}
          </div>

          <OrderBasicForm customerChange={handleCustomerChange} />

          <FormDeliveryAddress locations={customerLocations} />

          <FormOrderProducts />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <FileInput
                name="attachment"
                label="Attachment"
                placeholder="Insert file attachment"
              />
            </Grid>
            <Grid item xs={12} md={12} lg={8} className="mb-3">
              <TextareaInput name="remark" label="Remark" placeholder="Enter" />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LoadingButton
                variant="outlined"
                color="primary"
                fullWidth
                type="submit"
                loading={loading}
                loadingPosition="start"
                sx={{ py: '0.8rem', mt: '1rem' }}
                startIcon={<SaveIcon />}
              >
                <span>Save</span>
              </LoadingButton>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ py: '0.8rem', mt: '1rem' }}
                onClick={() => resetForm()}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default FormMain;
