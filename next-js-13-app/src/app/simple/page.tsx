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
    <>
      <PageBreadcrumb
        title="Simple Page"
        items={[{ label: 'Simple' }]}
        icon={{ icon: 'pi pi-home', url: '/' }}
      />
      <section className="tw-container mx-auto">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
          <ItemForm heads={heads} />

          <div className="card tw-border tw-p-4 tw-rounded-md">
              <ItemSearch  />
              <ItemTable heads={heads} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Simple;
