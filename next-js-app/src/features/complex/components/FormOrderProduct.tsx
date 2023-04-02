import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
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
};
const FormOrderProduct = ({
  product,
  index,
  control,
  errors,
}: FormOrderProductProps) => {
  const products = useAppSelector((state) => state.order.products);

  const [productArray, setProductArray] = useState<object[]>([]);
  const [productCategory, setProductCategory] = useState<object[]>([]);
  const [productUnit, setProductUnit] = useState<object[]>([]);

  const dispatch = useAppDispatch();

  const handleOrderProductEntry = (productId: number) => {
    let productObj = products.filter((obj) => {
      return obj.id === productId;
    });

    if (productObj) {
      setProductCategory(productObj[0].categories);
      setProductUnit(productObj[0].units);
    }
  };

  useEffect(() => {
    async function getProducts() {
      let tProducts: any = await CommonApi.products();

      dispatch(orderActions.setProducts(tProducts));

      let temp: object[] = [];
      for (let i = 0; i < tProducts.length; i++) {
        temp.push({
          id: tProducts[i].id,
          text: tProducts[i].name,
        });
      }
      setProductArray(temp);
    }

    if (products.length === 0) {
      getProducts();
    }
  }, [products]);

  console.log(productArray);

  return (
    <>
      <Grid container direction="row" className="mb-3">
        <Grid item lg={2} md={6} xs={12}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name={`order_products[${index}].product`}
              defaultValue={product.id}
              render={({ field: { onChange, ...rest } }) => (
                <FormControl fullWidth error>
                  <Select
                    {...rest}
                    onChange={(e: any) => {
                      handleOrderProductEntry(e.target.value);
                      onChange(e.target.value);
                    }}
                    error={!!errors['order_products[${index}].product']}
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
                  {errors['customer'] ? (
                    <FormHelperText>
                      {errors['customer'].message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={2} md={6} xs={12}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name={`order_products[${index}].product`}
              defaultValue={product.id}
              render={({ field }) => (
                <FormControl fullWidth error></FormControl>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default FormOrderProduct;
