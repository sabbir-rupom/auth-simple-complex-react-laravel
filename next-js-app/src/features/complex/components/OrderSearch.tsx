import { useAppSelector } from '@/common/redux/store';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { CustomerDTO, FilterDTO } from '../shared/data';

const OrderSearch = ({ orderCount = 0 }: { orderCount: number }) => {
  // const customers: CustomerDTO[] = useAppSelector<CustomerDTO[]>(
  //   (state: any) => state.order.customers
  // );
  const customers = useAppSelector((state) => {
    return state.order.customers;
  });

  // useEffect(() => {
  //   async function searchData() {
  //     let items: any = await CommonApi.customers();

  //     console.log(items);
  //   }

  //   searchData();
  // }, []);

  const buyers: CustomerDTO[] = useAppSelector<CustomerDTO[]>(
    (state: any) => state.order.buyers
  );
  const filterParams: FilterDTO = useAppSelector<FilterDTO>(
    (state: any) => state.order.filterParams
  );

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
        <form>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select value={filterParams.customer} label="Customer">
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
                <Select value={filterParams.buyer} label="Buyer">
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
              />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default OrderSearch;
