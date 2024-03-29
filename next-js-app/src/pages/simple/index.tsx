import Breadcrumb from '@/common/components/templates/Breadcrumb';
import ItemForm from '@/features/simple/components/ItemForm';
import ItemSearch from '@/features/simple/components/ItemSearch';
import ItemTable from '@/features/simple/components/ItemTable';
import MasterLayout from '@/layouts/MasterLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Head from 'next/head';

const Simple = () => {
  return (
    <>
      <Head>
        <title>Simple Page</title>
      </Head>

      <MasterLayout>
        <Breadcrumb
          parent="Home"
          bread1="Simple"
          title="Simple Page: Item CRUD"
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item lg={5} xs={12} sx={{ p: 3 }}>
              <ItemForm />
            </Grid>
            <Grid item lg={7} xs={12} sx={{ p: 3 }}>
              <ItemSearch />
              <ItemTable />
            </Grid>
          </Grid>
        </Box>
      </MasterLayout>
    </>
  );
};

export default Simple;
