import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import itemSchema from '../validators/item.schema';

type ItemFormInputs = {
  name: string;
  code: string;
  head: number;
  status: boolean;
};

const formInputs: object[] = [
  {
    label: 'Name',
    placeholder: 'Enter text here',
    require: true,
    name: 'name',
    type: 'text',
  },
  {
    label: 'Code',
    placeholder: 'Enter unique code',
    require: true,
    name: 'code',
    type: 'text',
  },
  {
    label: 'Item Head',
    require: true,
    name: 'head',
    placeholder: '',
    type: 'select',
    checked: 0,
  },
  {
    label: 'Active',
    require: false,
    name: 'status',
    placeholder: '',
    type: 'checkbox',
    checked: [],
  },
];

const ItemForm: React.FC<{}> = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ItemFormInputs>({
    resolver: yupResolver(itemSchema),
  });

  const ItemFormSubmit: SubmitHandler<ItemFormInputs> = (
    data: ItemFormInputs
  ) => {
    console.log('Form data: ', data);

    reset({});
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(ItemFormSubmit)}
        sx={{ mt: 1 }}
      >
        <button type="submit" className="btn btn-success w-full mt-3">
          Save
        </button>
      </Box>
    </>
  );
};

export default ItemForm;
