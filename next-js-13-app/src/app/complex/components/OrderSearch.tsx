'use client';

import DateRangePicker from '@/components/form/advanced/DateRangePicker';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect, useState } from 'react';
import {
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import CommonApi from '../services/CommonApi';
import OrderApi from '../services/OrderApi';
import { BuyerDTO, CustomerDTO, FilterDTO } from '../shared/data';
import {
  fetchBuyers,
  fetchCustomers,
  orderActions,
} from '../../../redux/features/order.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectInput } from '@/components/form/element/SelectInput';
import { makeOptionArray } from '@/services/Utility';
import { TextInput } from '@/components/form/element/TextInput';
import { DateInput } from '@/components/form/element/DateInput';
import { Button } from 'primereact/button';

const OrderSearch = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const customers: CustomerDTO[] = useAppSelector((state) => {
    return state.order.customers;
  });
  const buyers: BuyerDTO[] = useAppSelector((state) => {
    return state.order.buyers;
  });
  const { meta } = useAppSelector((state) => {
    return state.order.orderPagination;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (customers.length === 0) {
      dispatch(fetchCustomers());
    }

    if (buyers.length === 0) {
      dispatch(fetchBuyers());
    }
  }, [customers, buyers]);

  const filterParams: FilterDTO = useAppSelector<FilterDTO>(
    (state: any) => state.order.filterParams,
  );

  const form: UseFormReturn<FilterDTO, UseFormProps> = useForm<FilterDTO>({
    defaultValues: filterParams,
  });

  /**
   * Set form with initial values
   */
  const resetForm = async () => {
    form.reset(filterParams);

    await fetchData(filterParams);
  };

  /**
   * Handle form submission
   *
   * @param inputs
   */
  const filterFormSubmit: SubmitHandler<FilterDTO> = async (
    inputs: FilterDTO,
  ) => {
    setLoading(true);

    await fetchData(inputs);

    setLoading(false);
  };

  const fetchData = async (inputs: FilterDTO) => {
    let [orders, pagination, result] = await OrderApi.orders(inputs);

    if (result) {
      dispatch(orderActions.setOrders(orders));
      dispatch(orderActions.setFilterForm(inputs));
      dispatch(orderActions.setOrderPagination(pagination));
    }

    return;
  };

  return (
    <>
      <div className="card tw-border tw-p-4 tw-rounded-md mb-3">
        <h3 className="text-2xl font-semibold w-full text-center mb-5">
          Filter Order(s)
        </h3>

        <FormProvider {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(filterFormSubmit)}
          >
            <div className="tw-grid tw-grid-cols-4 tw-gap-4 max-md:tw-grid-cols-2 max-sm:tw-col-1">
              <SelectInput
                name="customer"
                label="Select Customer"
                options={makeOptionArray(customers, 'id', 'name')}
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
                label="Order Date"
                placeholder="Set order date"
              />
            </div>

            <div className="tw-flex tw-justify-center">
              <Button
                type="submit"
                label="Search"
                icon={`mx-auto ${
                  isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-search pr-2'
                }`}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default OrderSearch;
