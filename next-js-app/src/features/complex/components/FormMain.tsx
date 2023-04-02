import { useAppSelector } from '@/common/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Grid, TextareaAutosize } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useEffect, useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import OrderApi from '../services/OrderApi';
import {
  defaultOrderInput,
  defaultOrderProduct,
  OrderDTO,
} from '../shared/data';
import orderSchema from '../validators/order.schema';
import FormOrderBasic from './FormOrderBasic';
import FormOrderProduct from './FormOrderProduct';

const FormMain = ({ orderId }: { orderId: number }) => {
  const orderInput = useAppSelector((state) => state.order.orderFormInput);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<OrderDTO>({
    resolver: yupResolver(orderSchema),
    defaultValues: defaultOrderInput,
  });

  /**
   * Set form with initial values
   */
  useEffect(() => {
    reset(orderInput);
  }, [orderInput, reset]);

  /**
   * Reset form if form submit process is finished
   */
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultOrderInput);
      setLoading(false);
    }
  }, [isSubmitSuccessful, reset, setLoading]);

  const orderFormSubmit: SubmitHandler<OrderDTO> = async (inputs: OrderDTO) => {
    setLoading(true);

    let result: boolean = false;
    if (orderId > 0) {
      result = await OrderApi.update(orderId, inputs);
    } else {
      result = await OrderApi.create(inputs);
    }

    if (result) {
      console.log('success');
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: 'order_products',
    control,
    keyName: 'orderProductId',
  });

  const handleNewProductEntry = () => {
    append(defaultOrderProduct);
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(orderFormSubmit)}
        sx={{ mt: 1 }}
      >
        <input type="hidden" name="id" value={orderId} />

        <div className="text-xl font-bold text-center mb-7">
          {orderId > 0 ? 'Edit Order' : 'Add New Order'}
        </div>

        <FormOrderBasic
          orderInput={orderInput}
          formControl={control}
          errors={errors}
        />

        <fieldset className="border border-solid border-gray-300 p-3 mb-5">
          <legend className="font-medium text-xl bg-white px-3">
            Order Products
          </legend>

          <Grid container direction="row" className="mb-3">
            <Grid xs={12} md={6} lg={2}>
              <div className="font-semibold">Product</div>
            </Grid>
            <Grid xs={12} md={6} lg={2}>
              <div className="font-semibold">Category</div>
            </Grid>
            <Grid xs={12} md={6} lg={2}>
              <div className="font-semibold">Unit</div>
            </Grid>
            <Grid xs={12} md={6} lg={2}>
              <div className="font-semibold text-center">Base Price</div>
            </Grid>
            <Grid xs={12} md={6} lg={1}>
              <div className="font-semibold text-center">Quantity</div>
            </Grid>
            <Grid xs={12} md={6} lg={2}>
              <div className="font-semibold text-center">Total Price</div>
            </Grid>
            <Grid xs={12} md={6} lg={1}>
              <div className="font-semibold text-center">Action</div>
            </Grid>
          </Grid>
          {fields.map((product, index) => (
            <div key={index}>
              <FormOrderProduct
                product={product}
                index={index}
                control={control}
                errors={errors}
              />
            </div>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleNewProductEntry}
          >
            Add Product
          </Button>
        </fieldset>

        {/* {orderProducts && orderProducts.map(() => {
          return <>Inputs</>;
        })} */}

        <Grid container spacing={2}>
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
                    defaultValue={orderInput.remark}
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
      </Box>
    </>
  );
};

export default FormMain;
