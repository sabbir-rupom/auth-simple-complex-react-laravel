import { Metadata } from 'next';
import ItemForm from './components/ItemForm';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';
import ItemTable from './components/ItemTable';
import ItemSearch from './components/ItemSearch';
import ItemApi from './services/ItemApi';

export const metadata: Metadata = {
  title: 'Simple Page',
};

const Simple = async () => {
  const heads = await ItemApi.heads();

  return (
    <section className="page-content">
      <PageBreadcrumb
        title="Simple Page"
        items={[{ label: 'Simple' }]}
        icon={{ icon: 'pi pi-home', url: '/' }}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ItemForm heads={heads} />

          <div className="card border p-4 rounded-md">
            <ItemSearch />
            <ItemTable heads={heads} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simple;
