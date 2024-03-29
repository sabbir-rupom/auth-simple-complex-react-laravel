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
import {
  BuyerDTO,
  CustomerDTO,
  FilterDTO,
  defaultFilterParams,
} from '../shared/data';
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
import Link from 'next/link';

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
    form.reset(defaultFilterParams);

    await fetchData({});
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
      <div className="card border p-4 rounded-md mb-3">
        <div className="flex justify-between mb-5">
          <h3 className="text-2xl font-semibold">Filter Order(s)</h3>
          <Link
            href={`/complex/order/0`}
            className="bg-green-600 rounded-lg py-3 px-5 text-white"
          >
            <i className="pi pi-plus mr-2"></i>
            Add New
          </Link>
        </div>

        <FormProvider {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(filterFormSubmit)}
          >
            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:col-1">
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

              <DateRangePicker
                startValue={filterParams.start_date}
                endValue={filterParams.end_date}
                control={form.control}
                startName="start_date"
                endName="end_date"
              />
              {/* <DateInput
                name="start_date"
                label="Order Date"
                placeholder="Set order date"
              /> */}
            </div>

            <div className="flex justify-center">
              <div>
                <Button
                  severity="help"
                  type="submit"
                  label="Search"
                  icon={`pr-2 ${
                    isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-search'
                  }`}
                />
              </div>
              <div className="ml-2">
                <Button
                  severity="warning"
                  type="button"
                  label="Reset"
                  icon={`pr-2 pi pi-refresh`}
                  onClick={resetForm}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default OrderSearch;
