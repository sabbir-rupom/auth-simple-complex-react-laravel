import { SelectInput } from '@/components/form/element/SelectInput';
import { TextInput } from '@/components/form/element/TextInput';
import { makeOptionArray } from '@/services/Utility';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ProductDTO } from '../shared/data';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

type FormOrderProductProps = {
  products: ProductDTO[];
  product: any;
  index: number;
  onRemove: (index: number) => void;
  disableRemoveButton: boolean;
};
const FormOrderProductEntry = ({
  products,
  product,
  index,
  onRemove,
  disableRemoveButton,
}: FormOrderProductProps) => {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const [productArray, setProductArray] = useState<object[]>([]);
  const [productCategory, setProductCategory] = useState<object[]>([]);
  const [productUnit, setProductUnit] = useState<object[]>([]);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setProductArray(makeOptionArray(products, 'id', 'name'));
  }, [products]);

  useEffect(() => {
    if (product.product && product.product > 0) {
      handleOrderProductEntry(Number(product.product));

      setValue(`order_products[${index}].unit_price`, product.unit_price);
      setValue(`order_products[${index}].quantity`, product.quantity);

      setBasePrice(product.unit_price ?? 0);
      setQuantity(product.quantity ?? 1);
    }
  }, [product]);

  const handlePrice = (quantity: number) => {
    setValue(`order_products[${index}].quantity`, quantity);

    setQuantity(quantity);
  };

  const handleOrderProductEntry = (productId: number) => {
    let productObj = products.filter((obj) => {
      return obj.id === productId;
    });

    if (productObj && productObj[0]) {
      setProductCategory(productObj[0].categories);
      setProductUnit(productObj[0].units);

      setValue(`order_products[${index}].unit_price`, productObj[0].price);
      setValue(`order_products[${index}].quantity`, 1);

      setBasePrice(productObj[0].price);
      setQuantity(1);
    }
  };

  return (
    <div className="tw-grid tw-grid-cols-12 tw-gap-3">
      <div className="tw-pr-0 md:tw-pr-2 tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-2">
        <Controller
          name={`order_products[${index}].product`}
          control={control}
          render={({ field: { onChange, ...rest }, fieldState }) => (
            <>
              <label
                className={
                  'tw-font-bold tw-mb-3' + (fieldState.error ? `p-error` : '')
                }
              >
                Product
              </label>
              <Dropdown
                optionLabel="title"
                optionValue="value"
                placeholder="Select Product"
                options={productArray}
                onChange={(e: any) => {
                  handleOrderProductEntry(e.target.value);
                  onChange(e.target.value);
                }}
                {...rest}
                className={`tw-w-full ${fieldState.error ? `p-invalid` : ''}`}
              />
              <small className="p-error mb-3">
                {fieldState.error?.message ?? ''}
              </small>
            </>
          )}
        />
      </div>

      <div className="tw-pr-0 md:tw-pr-2 tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-2">
        <SelectInput
          name={`order_products[${index}].product_category`}
          label="Product Category"
          placeholder="Select Category"
          options={makeOptionArray(productCategory, 'id', 'category_name')}
        />
      </div>

      <div className="tw-pr-0 md:tw-pr-2 tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-2">
        <SelectInput
          name={`order_products[${index}].product_unit`}
          label="Product Unit"
          placeholder="Select Unit"
          options={makeOptionArray(productUnit, 'id', 'name')}
        />
      </div>

      <div className="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-2">
        <TextInput
          name={`order_products[${index}].unit_price`}
          label="Unit Price*"
          readonly={true}
        />
      </div>

      <div className="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-1">
        <TextInput
          name={`order_products[${index}].quantity`}
          label="Quantity*"
          type="number"
          onStateChange={(value: any) => handlePrice(value)}
        />
      </div>

      <div className="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-2">
        <label className='tw-font-bold'>Total Price</label>
        <div className="tw-border tw-border-c tw-px-3 tw-py-[0.95rem] tw-rounded">
          {basePrice && quantity ? basePrice * quantity : 0}
        </div>
      </div>

      <div className="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-1 tw-pt-6">
        <Button
          severity="danger"
          disabled={disableRemoveButton}
          onClick={() => onRemove(index)}
          className="tw-w-full lg:tw-w-auto"
        >
          Remove
        </Button>
      </div>
    </div>
    // <Grid container direction="row">
    //   <Grid item lg={2} md={6} xs={12}>
    //   </Grid>
    //   <Grid item lg={2} md={6} xs={12}>
    //   </Grid>
    //   <Grid item lg={2} md={6} xs={12}>
    //   </Grid>
    //   <Grid item xs={12} md={6} lg={2} className="pr-0 md:pr-2 mb-3">
    //   </Grid>
    //   <Grid item xs={12} md={6} lg={1} className="pr-0 md:pr-2 mb-3">
    //   </Grid>
    //   <Grid item xs={12} md={6} lg={2} className="pr-0 md:pr-2 mb-3">
    //   </Grid>
    //   <Grid
    //     item
    //     xs={12}
    //     md={12}
    //     lg={1}
    //     className="text-center lg:text-right pb-5 lg:pb-0 mb-3 lg:mb-0"
    //   >

    //   </Grid>
    // </Grid>
  );
};

export default FormOrderProductEntry;
