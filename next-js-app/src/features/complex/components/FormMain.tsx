import { useAppSelector } from '@/common/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import {
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { OrderDTO } from '../shared/data';
import orderSchema from '../validators/order.schema';
import OrderBasicForm from './OrderBasicForm';

const FormMain = ({ orderId }: { orderId: number }) => {
  const defaultValues = useAppSelector((state) => state.order.orderFormInput);
  const [loading, setLoading] = useState<boolean>(false);

  const form: UseFormReturn<OrderDTO, UseFormProps> = useForm<OrderDTO>({
    resolver: yupResolver(orderSchema),
    defaultValues,
  });

  const resetForm = () => {
    form.reset(defaultValues);
  };

  const orderFormSubmit: SubmitHandler<OrderDTO> = async (inputs: OrderDTO) => {
    // setLoading(true);

    console.log(inputs);

    // let result: boolean = false;
    // if (orderId > 0) {
    //   result = await OrderApi.update(orderId, inputs);
    // } else {
    //   result = await OrderApi.create(inputs);
    // }

    // if (result) {
    //   console.log('success');
    // }
  };

  // const { fields, append, remove } = useFieldArray({
  //   name: 'order_products',
  //   control,
  //   keyName: 'orderProductId',
  // });

  return (
    <>
      <FormProvider {...form}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(orderFormSubmit)}
          sx={{ mt: 1 }}
        >
          <input type="hidden" name="id" value={orderId} />

          <div className="text-xl font-bold text-center mb-7">
            {orderId > 0 ? 'Edit Order' : 'Add New Order'}
          </div>

          <OrderBasicForm />

          <fieldset className="border border-solid border-gray-300 p-3 my-5">
            <legend className="font-medium text-xl bg-white px-3">
              Order Products
            </legend>

            <Grid container direction="row" className="my-3 px-3">
              <Grid item xs={12} md={6} lg={2}>
                <div className="font-semibold">Product</div>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <div className="font-semibold">Category</div>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <div className="font-semibold">Unit</div>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <div className="font-semibold">Base Price</div>
              </Grid>
              <Grid item xs={12} md={6} lg={1}>
                <div className="font-semibold">Quantity</div>
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <div className="font-semibold text-center">Total Price</div>
              </Grid>
              <Grid item xs={12} md={6} lg={1}>
                <div className="font-semibold text-right">Action</div>
              </Grid>
            </Grid>
            {/* {fields.map((product, index) => (
              <div key={index}>
                <FormOrderProduct
                  product={product}
                  index={index}
                  control={control}
                  errors={errors}
                  setValue={setValue}
                />
              </div>
            ))}

            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleNewProductEntry}
            >
              Add Product
            </Button> */}
          </fieldset>

          {/* <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={8}>
              <Controller
                name="remark"
                control={control}
                render={({ field }: any) => (
                  <>
                    <TextareaAutosize
                      {...field}
                      minRows={3}
                      placeholder="Remark (if any)"
                      variant="outlined"
                      className="w-full p-2 border rounded border-gray-300"
                      label="Order Number"
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Controller
                name="attachment"
                control={control}
                render={({ field, fieldState }: any) => (
                  <>
                    <MuiFileInput
                      {...field}
                      placeholder="Insert file attachment"
                      error={!!errors['attachment'] || fieldState.invalid}
                      fullWidth
                      helperText={
                        fieldState.invalid
                          ? 'File is invalid'
                          : errors['attachment']
                          ? errors['attachment'].message
                          : null
                      }
                    />
                  </>
                )}
              />
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
                onClick={() => form.reset(defaultOrderInput)}
              >
                Reset
              </Button>
            </Grid>
          </Grid> */}
        </Box>
      </FormProvider>
    </>
  );
};

export default FormMain;
