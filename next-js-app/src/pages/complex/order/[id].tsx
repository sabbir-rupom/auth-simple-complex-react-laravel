import Breadcrumb from '@/common/components/templates/Breadcrumb';
import FormMain from '@/features/complex/components/FormMain';
import MasterLayout from '@/layouts/MasterLayout';
import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';

const OrderForm = () => {
  const router = useRouter();

  const { id }: any = router.query;
  return (
    <>
      <Head>
        <title>{id > 0 ? `Edit Order` : `New Order`}</title>
      </Head>

      <MasterLayout>
        <Breadcrumb
          parent="Complex"
          bread1="Orders"
          breadLink1={`/complex/order`}
          bread2={id > 0 ? `Edit Order` : `New Order`}
          title="Complex Page: Order Form"
        />
        <Container component="main" maxWidth="xl" sx={{ px: 0 }}>
          <FormMain orderId={id} />
        </Container>
      </MasterLayout>
    </>
  );
};

export default OrderForm;
