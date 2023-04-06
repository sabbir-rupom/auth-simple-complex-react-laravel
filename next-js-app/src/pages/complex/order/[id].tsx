import Breadcrumb from '@/common/components/templates/Breadcrumb';
import { useAppSelector } from '@/common/redux/store';
import FormMain from '@/features/complex/components/FormMain';
import MasterLayout from '@/layouts/MasterLayout';
import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';

const OrderForm = () => {
  const router = useRouter();

  const auth = useAppSelector((state) => state.userAuth.isLoggedIn);
  if (!auth) {
    router.push('/');
  }

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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // console.log(context.params?.id)  //If doesn't work use context.query.id

//   let id = context.params?.id,
//     order = defaultOrderInput,
//     notFound = false;

//   if (Number(id) > 0) {
//     const [data, message]: any = await OrderApi.get(Number(id));
//     if (data) {
//       order = data;
//     } else {
//       notFound = true;
//     }
//   }

//   return {
//     props: {
//       order,
//       notFound,
//       id,
//     }, // will be passed to the page component as props
//   };
// };