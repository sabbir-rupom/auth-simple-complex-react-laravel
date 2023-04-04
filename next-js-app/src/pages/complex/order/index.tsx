import Breadcrumb from '@/common/components/templates/Breadcrumb';
import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import OrderList from '@/features/complex/components/OrderList';
import OrderSearch from '@/features/complex/components/OrderSearch';
import OrderApi from '@/features/complex/services/OrderApi';
import { OrderSummaryDTO } from '@/features/complex/shared/data';
import { orderActions } from '@/features/complex/store/order.slice';
import MasterLayout from '@/layouts/MasterLayout';
import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Complex = () => {
  const router = useRouter();

  const auth = useAppSelector((state) => state.userAuth.isLoggedIn);
  if (!auth) {
    router.push('/');
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      let [orders, pagination] = await OrderApi.orders({});

      if (orders) {
        dispatch(orderActions.setOrders(orders));
        dispatch(orderActions.setOrderPagination(pagination));
      }
    }

    fetchData();
  }, []);

  const orders: OrderSummaryDTO[] = useAppSelector<OrderSummaryDTO[]>(
    (state: any) => state.order.orders
  );

  const pagination: any = useAppSelector<any>(
    (state: any) => state.order.orderPagination
  );

  return (
    <>
      <Head>
        <title>Order List</title>
      </Head>

      <MasterLayout>
        <Breadcrumb
          parent="Home"
          bread1="Complex"
          title="Complex Page: Order List"
        />
        <Container component="main" maxWidth="xl" sx={{ px: 0 }}>
          <OrderSearch
            totalOrder={pagination ? pagination.meta?.total : 0}
            orderCount={orders.length}
          />
          <Box sx={{ m: 2 }} />
          <OrderList orders={orders} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default Complex;
