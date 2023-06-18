import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { toastActions } from '@/redux/features/toast.slice';
import { useEffect } from 'react';
import {
  FieldArrayPath,
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import CommonApi from '../services/CommonApi';
import OrderApi from '../services/OrderApi';
import { OrderDTO, defaultOrderProduct } from '../shared/data';
import { orderActions } from '../../../redux/features/order.slice';
import FormOrderProductEntry from './FormOrderProductEntry';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';

const FormOrderProducts = () => {
  const form = useFormContext<OrderDTO>();
  const orderProductsField: UseFieldArrayReturn<
    OrderDTO,
    FieldArrayPath<any>
  > = useFieldArray<OrderDTO, FieldArrayPath<any>>({
    control: form.control,
    name: 'order_products',
  });

  const dispatch = useAppDispatch();

  const removeProduct = async (index: number) => {
    if (orderProductsField.fields.length === 1) {
      return;
    }

    let productId = form.getValues(`order_products.${index}.id`);
    if (productId && productId > 0) {
      const [result, message] = await OrderApi.deleteOrderProduct(productId);
      if (!result) {
        dispatch(
          toastActions.showToast({
            type: 'error',
            summary: 'Error',
            message: String(message),
          }),
        );
      }
    }

    orderProductsField.remove(index);
  };

  const addNewProduct = () => {
    orderProductsField.append(defaultOrderProduct);
  };

  // Prepare products array: START
  const products = useAppSelector((state) => state.order.products);
  useEffect(() => {
    async function getProducts() {
      let tProducts: any = await CommonApi.products();

      dispatch(orderActions.setProducts(tProducts));
    }

    if (products.length === 0) {
      getProducts();
    }
  }, []);
  // Prepare products array: END

  return (
    <div className="card tw-my-5">
      <Fieldset legend="Order Products">
        {orderProductsField.fields.map((field, index) => (
          <FormOrderProductEntry
            product={field}
            products={products}
            key={field.id}
            index={index}
            onRemove={removeProduct}
            disableRemoveButton={orderProductsField.fields.length === 1}
          />
        ))}

        {form.formState.errors && form.formState.errors.order_products ? (
          <small className="tw-text-red-500 tw-text-xs">
            {form.formState.errors.order_products.message}
          </small>
        ) : null}

        <Button
          type="button"
          severity='success'
          className="mt-4 w-full lg:w-auto"
          onClick={addNewProduct}
          icon="pi pi-plus-circle"
          label="Add Product"
          size='small'
        />
      </Fieldset>
    </div>
  );
};

export default FormOrderProducts;
