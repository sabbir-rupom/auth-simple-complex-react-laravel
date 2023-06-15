'use client';

import { FileInput } from '@/components/form/element/FileInput';
import { TextareaInput } from '@/components/form/element/TextareaInput';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { toastActions } from '@/redux/features/toast.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import OrderApi from '../services/OrderApi';
import { convertDate } from '../services/Utility';
import { CustomerDTO, OrderDTO, defaultOrderInput } from '../shared/data';
import {
  orderCreateSchema,
  orderUpdateSchema,
} from '../validators/order.schema';
import FormDeliveryAddress from './FormDeliveryAddress';
import FormOrderProducts from './FormOrderProducts';
import OrderBasicForm from './OrderBasicForm';
import { Button } from 'primereact/button';

const FormMain = ({ orderId }: { orderId: number }) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const [activeCustomer, setActiveCustomer] = useState<number>(0);

  const schemaLogic = orderId > 0 ? orderUpdateSchema : orderCreateSchema;

  const form: UseFormReturn<OrderDTO, UseFormProps> = useForm<OrderDTO>({
    resolver: yupResolver(schemaLogic),
    defaultValues: defaultOrderInput,
  });

  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async (id: number) => {
      const [data, message]: any = await OrderApi.get(id);
      if (data) {
        setActiveCustomer(data.customer);
        if (data.attachment) {
          setAttachmentUrl(data.attachment);
          data.attachment = null;
        }
        form.reset(data);
      } else {
        dispatch(
          dispatch(
            toastActions.showToast({
              type: 'error',
              summary: 'API Error',
              message: String(message),
            }),
          ),
        );
        push('/complex/order/0');
      }
    };

    if (orderId > 0) {
      fetchOrder(orderId);
    }
  }, []);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [customerLocations, setCustomerLocations] = useState<any>([]);

  const customers = useAppSelector((state) => state.order.customers);

  const resetForm = () => {
    form.reset(defaultOrderInput);
    setLoading(false);
    if (orderId > 0) {
      push('/complex/order/0');
    }
  };

  const handleCustomerChange = (
    customerId: number,
    customers: CustomerDTO[],
  ) => {
    let customerObj: any = customers.filter((obj: any) => {
      return obj.id === customerId;
    });

    customerObj = customerObj[0] ?? null;

    if (customerObj && customerObj.locations) {
      setCustomerLocations(customerObj.locations);
    }
  };

  useEffect(() => {
    if (activeCustomer > 0) {
      handleCustomerChange(activeCustomer, customers);
    }
  }, [activeCustomer, customers]);

  /**
   * Handle order form submission
   *
   * @param form Order form-data
   */
  // const orderFormSubmit: SubmitHandler<OrderDTO> = async (inputs: OrderDTO) => {
  const orderFormSubmit = async (form: OrderDTO) => {
    setLoading(true);
    // console.log(form);

    let result: any = false,
      message: any = '',
      data: any = {};

    form.order_date = convertDate(new Date(form.order_date));
    form.delivery_date = convertDate(new Date(form.delivery_date));

    if (orderId > 0) {
      [result, message, data] = await OrderApi.update(orderId, form);
      setLoading(false);
      if (result) {
        setAttachmentUrl(data.attachment);
      }
    } else {
      [result, message] = await OrderApi.create(form);
      resetForm();
    }

    if (result) {
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: message,
        }),
      );
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: message,
        }),
      );
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(orderFormSubmit)}
          noValidate
          autoComplete="off"
        >
          <div className="text-xl font-bold text-center mb-7">
            {orderId > 0 ? 'Edit Order' : 'Add New Order'}
          </div>

          <OrderBasicForm customerChange={handleCustomerChange} />
          <FormDeliveryAddress locations={customerLocations} />
          {/*

          <FormOrderProducts /> */}

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <div className="tw-mb-3">
              <FileInput
                name="attachment"
                label="Attachment"
                placeholder="Insert file attachment"
              />
              {attachmentUrl && (
                <>
                  <div className="block mt-2 text-blue-500 underline underline-offset-4">
                    <Link href={attachmentUrl}>Show Attachment</Link>
                  </div>
                </>
              )}
            </div>
            <div className="tw-mb-3">
              <TextareaInput name="remark" label="Remark" placeholder="Enter" />
            </div>
            <div className="tw-mb-3 tw-col-span-3">
              <div className="flex-button-container tw-w-full md:tw-w-1/2 md:tw-mx-auto">
                <Button
                  type="submit"
                  label="Submit"
                  severity="success"
                  icon={`${
                    isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-upload'
                  }`}
                  disabled={isLoading}
                />

                <Button
                  type="button"
                  label="Reset"
                  severity="danger"
                  icon="pi pi-refresh"
                  onClick={() => resetForm()}
                />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default FormMain;
