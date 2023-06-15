import { DateInput } from '@/components/form/element/DateInput';
import { SelectInput } from '@/components/form/element/SelectInput';
import { TextInput } from '@/components/form/element/TextInput';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { makeOptionArray } from '@/services/Utility';
import { useEffect, useState } from 'react';
import CommonApi from '../services/CommonApi';
import { orderActions } from '@/redux/features/order.slice';

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
    <div className="tw-grid tw-grid-cols-3 tw-gap-4 max-md:tw-grid-cols-2 max-sm:tw-col-1">
      <SelectInput
        name="customer"
        label="Select Customer"
        options={makeOptionArray(customers, 'id', 'name')}
        onStateChange={setActiveCustomer}
      />

      <SelectInput
        name="buyer"
        label="Select Buyer"
        options={makeOptionArray(buyers, 'id', 'name')}
      />

      <TextInput
        name="order_number"
        label="Order Number"
        placeholder="Enter Text ..."
      />

      <DateInput
        name="order_date"
        label="Order Date*"
        placeholder="Set order date"
      />

      <DateInput
        name="delivery_date"
        label="Delivery Date*"
        placeholder="Set delivery date"
      />

      <TextInput
        type="time"
        name="delivery_time"
        label="Delivery Time*"
        placeholder="Enter"
      />
    </div>
  );
};

export default OrderBasicForm;
