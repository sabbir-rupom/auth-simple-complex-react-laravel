import { useAppSelector } from '@/common/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Box, MenuItem, Paper, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ItemApi } from '../services/ItemApi';
import itemDTO from '../shared/data';
import { itemActions } from '../store/item.slice';
import itemSchema from '../validators/item.schema';

const ItemForm: React.FC<{}> = () => {
  const heads = useAppSelector((state) => state.item.heads);
  const itemInput = useAppSelector((state) => state.item.formInput);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<itemDTO>({
    resolver: yupResolver(itemSchema),
  });

  const ItemFormSubmit: SubmitHandler<itemDTO> = async (inputs: itemDTO) => {
    // console.log('Form data: ', data);

    let result = await ItemApi.save(inputs);

    if (result) {
      let items: any = await ItemApi.getAll();

      if (items) {
        dispatch(itemActions.setItemList(items));
      }
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
          onSubmit={handleSubmit(ItemFormSubmit)}
          sx={{ mt: 1 }}
        >
          <input type="hidden" name="id" value={itemInput.id} />
          <TextField
            value={itemInput.name}
            sx={{ mb: 2 }}
            label="Item Name"
            fullWidth
            required
            error={!!errors['name']}
            helperText={errors['name'] ? errors['name'].message : ''}
            {...register('name')}
          />
          <TextField
            value={itemInput.code}
            sx={{ mb: 2 }}
            label="Code"
            fullWidth
            required
            error={!!errors['code']}
            helperText={errors['code'] ? errors['code'].message : ''}
            {...register('code')}
          />

          <Controller
            control={control}
            name="head"
            defaultValue={itemInput.head}
            render={({ field }) => (
              <Select {...field} fullWidth value={itemInput.head}>
                <MenuItem value="0">
                  <em>Choose an Option</em>
                </MenuItem>
                {heads &&
                  heads.map(({ id, value }: any) => (
                    <MenuItem key={id} value={id}>
                      {value}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />

          <div className="flex items-center h-5">
            <input
              checked={!!itemInput.status}
              aria-describedby="status"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              {...register('status')}
            />
          </div>

          {/* <FormControlLabel
            control={
              <Controller
                name="status"
                control={control}
                defaultValue={itemInput.status}
                render={({ field: props }) => (
                  <Checkbox
                    {...props}
                    checked={props.value}
                    onChange={props.onChange}
                  />
                )}
              />
            }
            label="Is Active?"
            sx={{ mt: 1 }}
            labelPlacement="start"
          /> */}

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
