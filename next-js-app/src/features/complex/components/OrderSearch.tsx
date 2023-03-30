import DateRangePicker from '@/common/components/form/advanced/DateRangePicker';
import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CommonApi from '../services/CommonApi';
import { BuyerDTO, CustomerDTO, FilterDTO } from '../shared/data';
import { orderActions } from '../store/order.slice';

const OrderSearch = ({ orderCount = 0 }: { orderCount: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FilterDTO>({});

  const customers: CustomerDTO[] = useAppSelector((state) => {
    return state.order.customers;
  });
  const buyers: BuyerDTO[] = useAppSelector((state) => {
    return state.order.buyers;
  });

  const dispatch = useAppDispatch();

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

  const filterParams: FilterDTO = useAppSelector<FilterDTO>(
    (state: any) => state.order.filterParams
  );
  useEffect(() => setFormData(filterParams), [filterParams]);

  const inputChangeHandler = (
    event: ChangeEvent<any> | SelectChangeEvent<any>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTimeout(() => {
      console.log(formData);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography component="h6">
            Showing List of Orders ({orderCount})
          </Typography>
        </Grid>
        <Grid item md={6} className="flex justify-end">
          <Button
            variant="contained"
            href="/complex/order/0"
            color="success"
            className="-mt-2"
          >
            New Order
          </Button>
        </Grid>
      </Grid>
      <Paper variant="outlined" square className="mt-5 px-6 py-8">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select
                  value={filterParams.customer}
                  label="Customer"
                  onChange={(e) => inputChangeHandler(e)}
                >
                  <MenuItem value="0">
                    <em>Select Customer</em>
                  </MenuItem>

                  {customers &&
                    customers.map(({ id, name }: any) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Buyer</InputLabel>
                <Select
                  value={filterParams.buyer}
                  label="Buyer"
                  onChange={(e) => inputChangeHandler(e)}
                >
                  <MenuItem value="0">
                    <em>Select Buyer</em>
                  </MenuItem>

                  {buyers &&
                    buyers.map(({ id, name }: any) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                sx={{ mb: 3 }}
                label="Order Number"
                variant="outlined"
                fullWidth
                onChange={(e) => inputChangeHandler(e)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DateRangePicker />
            </Grid>
          </Grid>
          <Grid item xs={12} alignItems="center">
            <LoadingButton
              variant="outlined"
              color="primary"
              fullWidth
              type="submit"
              loading={loading}
              loadingPosition="start"
              sx={{ py: '0.8rem', mt: '1rem' }}
              startIcon={<SearchIcon />}
            >
              <span>Save</span>
            </LoadingButton>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default OrderSearch;
