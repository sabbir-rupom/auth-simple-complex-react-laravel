import { DateInput } from '@/common/components/form/element/DateInput';
import { SelectInput } from '@/common/components/form/element/SelectInput';
import { TextInput } from '@/common/components/form/element/TextInput';
import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import { makeOptionArray } from '@/common/utils/general';
import { FormControl, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CommonApi from '../services/CommonApi';
import { orderActions } from '../store/order.slice';

const OrderBasicForm = ({ customerChange }: { customerChange: Function }) => {
  const customers = useAppSelector((state) => state.order.customers);
  const buyers = useAppSelector((state) => state.order.buyers);

  const [activeCustomer, setActiveCustomer] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeCustomer) {
      customerChange(activeCustomer, customers);
    }
  }, [activeCustomer, customers]);

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4} className="mb-3">
        <FormControl fullWidth>
          <SelectInput
            name="customer"
            label="Customer"
            placeholder="Select Customer"
            options={makeOptionArray(customers, 'id', 'name')}
            onStateChange={setActiveCustomer}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} lg={4} className="mb-3">
        <FormControl fullWidth>
          <SelectInput
            name="buyer"
            label="Buyer"
            placeholder="Select Buyer"
            options={makeOptionArray(buyers, 'id', 'name')}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} lg={4} className="mb-3">
        <TextInput
          name="order_number"
          label="Order Number*"
          placeholder="Enter"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4} className="mb-3">
        <DateInput
          name="order_date"
          label="Order Date*"
          placeholder="Set order date"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4} className="mb-3">
        <DateInput
          name="delivery_date"
          label="Delivery Date*"
          placeholder="Set delivery date"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4} className="mb-3">
        <TextInput
          type="time"
          name="delivery_time"
          label="Delivery Time*"
          placeholder="Enter"
        />
      </Grid>
    </Grid>
  );
};

export default OrderBasicForm;
