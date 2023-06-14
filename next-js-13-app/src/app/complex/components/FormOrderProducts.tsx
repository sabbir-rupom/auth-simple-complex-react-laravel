import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import { toastActions } from '@/common/redux/toast.slice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, FormHelperText } from '@mui/material';
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
      console.clear();
      console.log(productId);
      const [result, message] = await OrderApi.deleteOrderProduct(productId);
      if (!result) {
        dispatch(
          toastActions.showToast({
            type: 'error',
            message: String(message),
          })
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
    <fieldset className="border border-solid border-gray-300 p-3 my-5">
      <legend className="font-medium text-xl bg-white px-3 mb-4">
        Order Products
      </legend>

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
        <FormHelperText className="text-red-500 text-xs">
          {form.formState.errors.order_products.message}
        </FormHelperText>
      ) : null}

      <Button
        type="button"
        variant="outlined"
        className="mt-4 w-full lg:w-auto"
        onClick={addNewProduct}
      >
        <AddCircleOutlineIcon />
        <span className="ml-1 pt-1">Add Product</span>
      </Button>
    </fieldset>
  );
};

export default FormOrderProducts;
