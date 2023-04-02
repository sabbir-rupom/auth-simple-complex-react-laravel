import DateRangePicker from '@/common/components/form/advanced/DateRangePicker';
import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CommonApi from '../services/CommonApi';
import OrderApi from '../services/OrderApi';
import { BuyerDTO, CustomerDTO, FilterDTO } from '../shared/data';
import { orderActions } from '../store/order.slice';

const OrderSearch = ({
  orderCount = 0,
  totalOrder = 0,
}: {
  orderCount: number;
  totalOrder: number;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FilterDTO>({});

  const customers: CustomerDTO[] = useAppSelector((state) => {
    return state.order.customers;
  });
  const buyers: BuyerDTO[] = useAppSelector((state) => {
    return state.order.buyers;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getCustomers() {
      let tCustomers: any = await CommonApi.customers();

      dispatch(orderActions.setCustomers(tCustomers));
    }

    async function getBuyers() {
      let tBuyers: any = await CommonApi.buyers();

      dispatch(orderActions.setBuyers(tBuyers));
    }

    if (customers.length === 0) {
      getCustomers();
    }

    if (buyers.length === 0) {
      getBuyers();
    }
  }, [customers, buyers]);

  const filterParams: FilterDTO = useAppSelector<FilterDTO>(
    (state: any) => state.order.filterParams
  );
  useEffect(() => setFormData(filterParams), [filterParams]);

  const { handleSubmit, reset, control } = useForm<FilterDTO>();

  /**
   * Set form with initial values
   */
  useEffect(() => {
    reset(filterParams);
  }, [filterParams, reset]);

  const filterFormSubmit: SubmitHandler<FilterDTO> = async (
    inputs: FilterDTO
  ) => {
    setLoading(true);
    let [orders, pagination, result] = await OrderApi.orders(inputs);

    if (result) {
      dispatch(orderActions.setOrders(orders));
      dispatch(orderActions.setOrderPagination(pagination));
    }
    setLoading(false);
  };

  return (
    <>
      <Paper variant="outlined" square className="mb-8 px-6 pt-6 pb-8">
        <h3 className="text-2xl font-semibold w-full text-center mb-5">
          Filter Order(s)
        </h3>
        <form autoComplete="off" onSubmit={handleSubmit(filterFormSubmit)}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="customer"
                  defaultValue={filterParams.customer}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="0">
                        <em>Select Customer</em>
                      </MenuItem>

                      {customers &&
                        customers.map(({ id, name }: any) => (
                          <MenuItem key={id} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="buyer"
                  defaultValue={filterParams.buyer}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="0">
                        <em>Select Buyer</em>
                      </MenuItem>

                      {buyers &&
                        buyers.map(({ id, name }: any) => (
                          <MenuItem key={id} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <Controller
                name="order_number"
                control={control}
                defaultValue={filterParams.order_number}
                render={({ field: { onChange, value, ...rest } }) => (
                  <TextField
                    onChange={onChange}
                    {...rest}
                    value={value ?? ''}
                    sx={{ mb: 3 }}
                    label="Order Number"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <DateRangePicker
                startValue={filterParams.start_date}
                endValue={filterParams.end_date}
                control={control}
                startName="start_date"
                endName="end_date"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} alignItems="center">
            <LoadingButton
              variant="outlined"
              color="primary"
              fullWidth
              type="submit"
              loading={loading}
              loadingPosition="start"
              sx={{ py: '0.8rem', mt: '1rem' }}
              startIcon={<SearchIcon />}
            >
              <span>Save</span>
            </LoadingButton>
          </Grid>
        </form>
      </Paper>

      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography component="h6">
            Showing Orders: {orderCount} of {totalOrder}
          </Typography>
        </Grid>
        <Grid item md={6} className="flex justify-end">
          <Button
            variant="contained"
            href="/complex/order/0"
            color="success"
            className="-mt-2"
          >
            New Order
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderSearch;
