import { useAppSelector } from '@/common/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ItemApi from '../services/ItemApi';
import itemDTO, { defaultItemInput } from '../shared/data';
import { itemActions } from '../store/item.slice';
import itemSchema from '../validators/item.schema';

const ItemForm: React.FC<{}> = () => {
  const heads = useAppSelector((state) => state.item.heads);
  const itemInput = useAppSelector((state) => state.item.formInput);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<itemDTO>({
    resolver: yupResolver(itemSchema),
  });

  /**
   * Set form with initial values
   */
  useEffect(() => {
    reset(itemInput);
  }, [itemInput, reset]);

  /**
   * Reset form if form submit process is finished
   */
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultItemInput);
      setLoading(false);
    }
  }, [isSubmitSuccessful, reset, setLoading]);

  const itemFormSubmit: SubmitHandler<itemDTO> = async (inputs: itemDTO) => {
    setLoading(true);
    let result = await ItemApi.save(inputs);

    if (result) {
      let items: any = await ItemApi.getAll();

      if (items) {
        dispatch(itemActions.setItemList(items));
      }
    }
  };

  return (
    <>
      <Paper elevation={1} sx={{ px: 3, py: 4 }}>
        <div className="text-xl font-bold text-center mb-5">
          {itemInput.id ? 'Edit Item' : 'Create New Item'}
        </div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(itemFormSubmit)}
          sx={{ mt: 1 }}
        >
          <input type="hidden" name="id" value={itemInput.id} />
          <Controller
            name="name"
            control={control}
            defaultValue={itemInput.name}
            render={({ field: { onChange, value, ...rest } }) => (
              <TextField
                onChange={onChange}
                value={value}
                {...rest}
                sx={{ mb: 2 }}
                label="Item Name"
                fullWidth
                required
                error={!!errors['name']}
                helperText={errors['name'] ? errors['name'].message : ''}
              />
            )}
          />
          <Controller
            name="code"
            control={control}
            defaultValue={itemInput.code}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ mb: 2 }}
                label="Code"
                fullWidth
                required
                error={!!errors['code']}
                helperText={errors['code'] ? errors['code'].message : ''}
              />
            )}
          />

          <Controller
            control={control}
            name="head"
            defaultValue={itemInput.head}
            render={({ field }) => (
              <FormControl fullWidth error>
                <Select {...field} error={!!errors['head']}>
                  <MenuItem value="0">
                    <em className={errors['head'] ? `text-red-600` : ''}>
                      Choose Item Head
                    </em>
                  </MenuItem>

                  {heads &&
                    heads.map(({ id, value }: any) => (
                      <MenuItem key={id} value={id}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>
                {errors['head'] ? (
                  <FormHelperText>{errors['head'].message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <FormControlLabel
            control={
              <Controller
                name="status"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value, ...rest } }) => (
                  <>
                    <Checkbox {...rest} checked={value} onChange={onChange} />
                  </>
                )}
              />
            }
            label="Is Active?"
            sx={{ mt: 1 }}
            labelPlacement="start"
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LoadingButton
                variant="outlined"
                color="primary"
                fullWidth
                type="submit"
                loading={loading}
                loadingPosition="start"
                sx={{ py: '0.8rem', mt: '1rem' }}
                startIcon={<SaveIcon />}
              >
                <span>Save</span>
              </LoadingButton>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ py: '0.8rem', mt: '1rem' }}
                onClick={() => reset(defaultItemInput)}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default ItemForm;

// const formInputs: object[] = [
//   {
//     label: 'Name',
//     placeholder: 'Enter text here',
//     require: true,
//     name: 'name',
//     type: 'text',
//   },
//   {
//     label: 'Code',
//     placeholder: 'Enter unique code',
//     require: true,
//     name: 'code',
//     type: 'text',
//   },
//   {
//     label: 'Item Head',
//     require: true,
//     name: 'head',
//     placeholder: '',
//     type: 'select',
//     checked: 0,
//   },
//   {
//     label: 'Active',
//     require: false,
//     name: 'status',
//     placeholder: '',
//     type: 'checkbox',
//     checked: [],
//   },
// ];
