import { SelectInput } from '@/common/components/form/element/SelectInput';
import { TextInput } from '@/common/components/form/element/TextInput';
import { makeOptionArray } from '@/common/utils/general';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { OrderProductDTO, ProductDTO } from '../shared/data';

type FormOrderProductProps = {
  products: ProductDTO[];
  product: OrderProductDTO;
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
    <Grid container direction="row" key={index}>
      <Grid item lg={2} md={6} xs={12}>
        <FormControl fullWidth className="pr-0 md:pr-2">
          <Controller
            control={control}
            name={`order_products[${index}].product`}
            render={({ field: { onChange, ...rest } }) => (
              <FormControl fullWidth className="mb-3">
                <InputLabel>Product</InputLabel>
                <Select
                  {...rest}
                  label="Product"
                  onChange={(e: any) => {
                    handleOrderProductEntry(e.target.value);
                    onChange(e.target.value);
                  }}
                  error={!!errors[`errors['order_products[${index}].product']`]}
                >
                  <MenuItem value="0">
                    <em
                      className={
                        errors[`errors['order_products[${index}].product']`]
                          ? `text-red-600`
                          : ''
                      }
                    >
                      Select Product
                    </em>
                  </MenuItem>

                  {productArray &&
                    productArray.map(({ value, title }: any) => (
                      <MenuItem key={value} value={value}>
                        {title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item lg={2} md={6} xs={12}>
        <FormControl fullWidth className="pr-0 md:pr-2 mb-3">
          <SelectInput
            name={`order_products[${index}].product_category`}
            label="Product Category"
            placeholder="Select Category"
            options={makeOptionArray(productCategory, 'id', 'category_name')}
          />
        </FormControl>
      </Grid>
      <Grid item lg={2} md={6} xs={12}>
        <FormControl fullWidth className="pr-0 md:pr-2 mb-3">
          <SelectInput
            name={`order_products[${index}].product_unit`}
            label="Product Unit"
            placeholder="Select Unit"
            options={makeOptionArray(productUnit, 'id', 'name')}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={2} className="pr-0 md:pr-2 mb-3">
        <TextInput
          name={`order_products[${index}].unit_price`}
          label="Unit Price*"
          readonly={true}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={1} className="pr-0 md:pr-2 mb-3">
        <Controller
          name={`order_products[${index}].quantity`}
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              onChange={(e: any) => {
                handlePrice(e.target.value);
                onChange(e);
              }}
              {...rest}
              fullWidth
              type="number"
              label="Quantity*"
              InputProps={{
                inputMode: 'numeric',
              }}
              error={!!errors[`errors['order_products[${index}].quantity']`]}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2} className="pr-0 md:pr-2 mb-3">
        <div className="border border-c px-3 py-[0.95rem] rounded">
          {basePrice && quantity ? basePrice * quantity : 0}
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={1}
        className="text-center lg:text-right pb-5 lg:pb-0 mb-3 lg:mb-0"
      >
        <Button
          color="error"
          variant="outlined"
          disabled={disableRemoveButton}
          onClick={() => onRemove(index)}
          className="w-full lg:w-auto"
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormOrderProductEntry;
