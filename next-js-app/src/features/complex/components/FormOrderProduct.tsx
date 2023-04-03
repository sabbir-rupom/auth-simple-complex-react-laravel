import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import CommonApi from '../services/CommonApi';
import { OrderProductDTO } from '../shared/data';
import { orderActions } from '../store/order.slice';

type FormOrderProductProps = {
  product: OrderProductDTO;
  index: number;
  control: any;
  errors: any;
  setValue: any;
};
const FormOrderProduct = ({
  product,
  index,
  control,
  errors,
  setValue,
}: FormOrderProductProps) => {
  const products = useAppSelector((state) => state.order.products);

  const [productArray, setProductArray] = useState<object[]>([]);
  const [productCategory, setProductCategory] = useState<object[]>([]);
  const [productUnit, setProductUnit] = useState<object[]>([]);
  const [basePrice, setBasePrice] = useState(product.unit_price);
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    console.log(`order_products.${index}.unit_price`);
    setValue(`order_products.${index}.unit_price`, basePrice);
    setValue(`order_products.${index}.quantity`, quantity);
  }, [basePrice, quantity]);

  const dispatch = useAppDispatch();

  const handleOrderProductEntry = (productId: number) => {
    let productObj = products.filter((obj) => {
      return obj.id === productId;
    });

    if (productObj) {
      setProductCategory(productObj[0].categories);
      setProductUnit(productObj[0].units);
      setBasePrice(productObj[0].price);
      setQuantity(1);
    }
  };

  useEffect(() => {
    async function getProducts() {
      let tProducts: any = await CommonApi.products();

      dispatch(orderActions.setProducts(tProducts));
    }

    if (products.length === 0) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < products.length; i++) {
      temp.push({
        id: products[i].id,
        text: products[i].name,
      });
    }
    setProductArray(temp);
  }, [products]);

  return (
    <>
      <Grid container direction="row" className="mb-3">
        <Grid item lg={2} md={6} xs={12}>
          <FormControl fullWidth className="pr-0 md:pr-2">
            <Controller
              control={control}
              name={`order_products[${index}].product`}
              render={({ field: { onChange, ...rest } }) => (
                <FormControl fullWidth error>
                  <Select
                    {...rest}
                    onChange={(e: any) => {
                      handleOrderProductEntry(e.target.value);
                      onChange(e.target.value);
                    }}
                    error={
                      !!errors[`errors['order_products[${index}].product']`]
                    }
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
                      productArray.map(({ id, text }: any) => (
                        <MenuItem key={id} value={id}>
                          {text}
                        </MenuItem>
                      ))}
                  </Select>
                  {/* {errors[`errors['order_products[${index}].product']`] ? (
                    <FormHelperText>
                      {
                        errors[`errors['order_products[${index}].product']`]
                          .message
                      }
                    </FormHelperText>
                  ) : null} */}
                </FormControl>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={2} md={6} xs={12}>
          <FormControl fullWidth className="pr-0 md:pr-2">
            <Controller
              control={control}
              name={`order_products[${index}].product_category`}
              render={({ field }) => (
                <FormControl fullWidth error>
                  <Select
                    {...field}
                    error={
                      !!errors[
                        `errors['order_products[${index}].product_category']`
                      ]
                    }
                  >
                    <MenuItem value="0">
                      <em
                        className={
                          errors[
                            `errors['order_products[${index}].product_category']`
                          ]
                            ? `text-red-600`
                            : ''
                        }
                      >
                        Select Category
                      </em>
                    </MenuItem>

                    {productCategory &&
                      productCategory.map((option: any) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.category_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={2} md={6} xs={12}>
          <FormControl fullWidth className="pr-0 md:pr-2">
            <Controller
              control={control}
              name={`order_products[${index}].product_unit`}
              defaultValue={product.id}
              render={({ field }) => (
                <FormControl fullWidth error>
                  <Select
                    {...field}
                    error={
                      !!errors[
                        `errors['order_products[${index}].product_unit']`
                      ]
                    }
                  >
                    <MenuItem value="0">
                      <em
                        className={
                          errors[
                            `errors['order_products[${index}].product_unit']`
                          ]
                            ? `text-red-600`
                            : ''
                        }
                      >
                        Select Unit
                      </em>
                    </MenuItem>

                    {productUnit &&
                      productUnit.map((option: any) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Controller
            control={control}
            name={`order_products[${index}].unit_price`}
            render={({ field }) => (
              <TextField
                className="pr-0 md:pr-2"
                defaultValue={basePrice}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                error={
                  !!errors[`errors['order_products[${index}].unit_price']`]
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={1} className="pr-0 md:pr-2">
          <Controller
            control={control}
            name={`order_products[${index}].quantity`}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                onChange={(e: any) => {
                  setQuantity(e.target.value);
                  onChange(e);
                }}
                {...rest}
                fullWidth
                type="number"
                InputProps={{
                  inputMode: 'numeric',
                  // min: 0,
                }}
                error={!!errors[`errors['order_products[${index}].quantity']`]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2} className="pr-0 md:pr-2">
          <div>{basePrice && quantity ? basePrice * quantity : 0}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default FormOrderProduct;
