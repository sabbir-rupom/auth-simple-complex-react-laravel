import PageBreadcrumb from '@/components/ui/PageBreadcrumb';
import { Metadata } from 'next';
import FormMain from '../../components/FormMain';

export const metadata: Metadata = {
  title: 'Order List | Complex Page',
};

const OrderForm = ({params}:any) => {
  const id: number = Number(params.id ?? 0);

  return (
    <>
      <PageBreadcrumb
        title="Order Form"
        items={[{ label: 'Complex', url: '/complex'  }, { label: 'Orders', url: '/complex/order'  }, { label: `${id > 0 ? 'Edit' : 'Create'}` }]}
        icon={{ icon: 'pi pi-home', url: '/' }}
      />

      <div className="container mx-auto">
        <FormMain orderId={id} />
      </div>
    </>
  );
};

export default OrderForm;
