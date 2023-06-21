import { Metadata } from 'next';
import OrderList from '../components/OrderList';
import OrderSearch from '../components/OrderSearch';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';

export const metadata: Metadata = {
  title: 'Order List | Complex Page',
};

const Complex = () => {
  return (
    <>
      <PageBreadcrumb
        title="Order List"
        items={[{ label: 'Complex', url: '/complex' }, { label: 'Order', url: '/complex/order' }]}
        icon={{ icon: 'pi pi-home', url: '/' }}
      />
      <div className='container mx-auto px-6'>
        <OrderSearch />
        <div className='my-5'></div>
        <OrderList />
      </div>
    </>
  );
};

export default Complex;
