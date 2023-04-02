import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import CommonApi from '../services/CommonApi';
import { orderActions } from '../store/order.slice';

const FormOrderBasic = ({ formControl, orderInput, errors }: any) => {
  const customers = useAppSelector((state) => state.order.customers);
  const buyers = useAppSelector((state) => state.order.buyers);

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

  const [orderDateInput, setOrderDateInput] = useState<any>(null);
  const [deliveryDateInput, setDeliveryDateInput] = useState<any>(null);

  useEffect(() => {
    if (
      orderDateInput &&
      deliveryDateInput &&
      orderDateInput > deliveryDateInput
    ) {
      console.log('do date range validation');
    }
  }, [orderDateInput, deliveryDateInput]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl fullWidth>
          <Controller
            control={formControl}
            name="customer"
            defaultValue={orderInput.customer}
            render={({ field }) => (
              <FormControl fullWidth error>
                <Select {...field} error={!!errors['customer']}>
                  <MenuItem value="0">
                    <em className={errors['customer'] ? `text-red-600` : ''}>
                      Select Customer
                    </em>
                  </MenuItem>

                  {customers &&
                    customers.map(({ id, name }: any) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                </Select>
                {errors['customer'] ? (
                  <FormHelperText>{errors['customer'].message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FormControl fullWidth>
          <Controller
            control={formControl}
            name="buyer"
            defaultValue={orderInput.buyer}
            render={({ field }) => (
              <FormControl fullWidth error>
                <Select {...field} error={!!errors['buyer']}>
                  <MenuItem value="0">
                    <em className={errors['buyer'] ? `text-red-600` : ''}>
                      Select Buyer
                    </em>
                  </MenuItem>

                  {buyers &&
                    buyers.map(({ id, name }: any) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                </Select>
                {errors['buyer'] ? (
                  <FormHelperText>{errors['buyer'].message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Controller
          name="order_number"
          control={formControl}
          defaultValue={orderInput.order_number}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              label="Order Number"
              fullWidth
              required
              error={!!errors['order_number']}
              helperText={
                errors['order_number'] ? errors['order_number'].message : ''
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Controller
          control={formControl}
          name="order_date"
          defaultValue={orderInput.order_date}
          render={({ field: { onChange, value, ...rest } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="w-full"
                label="Order Date"
                {...rest}
                onChange={(e: any) => {
                  let dt = new Date(e);
                  dt.setDate(dt.getDate() + 1);
                  let [year, month, day] = dt
                    .toISOString()
                    .substring(0, 10)
                    .split('-')
                    .map((x) => parseInt(x, 10));
                  let newDate = `${year}-${month}-${day}`;
                  setOrderDateInput(new Date(newDate));
                  onChange(newDate);
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Controller
          control={formControl}
          name="delivery_date"
          defaultValue={orderInput.order_date}
          render={({ field: { onChange, value, ...rest } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="w-full"
                label="Delivery Date"
                {...rest}
                onChange={(e: any) => {
                  let dt = new Date(e);
                  dt.setDate(dt.getDate() + 1);
                  let [year, month, day] = dt
                    .toISOString()
                    .substring(0, 10)
                    .split('-')
                    .map((x) => parseInt(x, 10));
                  let newDate = `${year}-${month}-${day}`;
                  setDeliveryDateInput(new Date(newDate));
                  onChange(newDate);
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Controller
          name="delivery_time"
          control={formControl}
          defaultValue={orderInput.delivery_time}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              label="Delivery Time"
              type="time"
              fullWidth
              required
              error={!!errors['delivery_time']}
              helperText={errors['delivery_time']?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default FormOrderBasic;
