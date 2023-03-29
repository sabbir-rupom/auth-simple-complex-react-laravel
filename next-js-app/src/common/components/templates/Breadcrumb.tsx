import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';

interface BreadInterface {
  parent: string;
  parentLink?: string;
  bread1: string;
  breadLink1?: string | null;
  bread2?: string | null;
  breadLink2?: string | null;
  title?: string | null;
}

const Breadcrumb = ({
  parent,
  parentLink = '/',
  bread1,
  breadLink1 = null,
  bread2 = null,
  title = null,
}: BreadInterface) => {
  return (
    <Grid
      container
      spacing={2}
      className="mb-8 border-b-2 pb-2 border-gray-100"
    >
      <Grid item xs={6}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid item lg={6} className="flex justify-end">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href={parentLink}>
            {parent}
          </Link>
          {bread2 && (
            <>
              <Link underline="hover" color="inherit" href={breadLink1 ?? ''}>
                {bread1}
              </Link>
              <Typography color="text.primary">{bread2}</Typography>
            </>
          )}

          {!bread2 && <Typography color="text.primary">{bread1}</Typography>}
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default Breadcrumb;
