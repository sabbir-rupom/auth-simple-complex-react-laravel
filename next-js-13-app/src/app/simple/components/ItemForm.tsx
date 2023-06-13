'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import itemDTO, { defaultItemInput } from '../shared/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import itemSchema from '../validators/item.schema';
import ItemApi from '../services/ItemApi';
import { itemActions } from '@/redux/features/item.slice';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Fieldset } from 'primereact/fieldset';
import { toastActions } from '@/redux/features/toast.slice';

type Props = {heads: object[]};

const ItemForm = ({heads}: Props) => {
  const itemInput = useAppSelector((state) => state.item.formInput);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

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
      toastActions.showToast({
        type: 'success',
        summary: 'Successful',
        message: 'Item is saved successfully',
      });

      let items: any = await ItemApi.getAll();

      if (items) {
        dispatch(itemActions.setItemList(items));
      }
    } 
  };

  return (
    <div className="card">
      <Fieldset legend={itemInput.id ? 'Edit Item' : 'Create New Item'}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(itemFormSubmit)}
          className="tw-mt-1"
        >
          <input type="hidden" name="id" value={itemInput.id} />
          <div className="tw-flex tw-flex-col">
            <Controller
              name="name"
              control={control}
              defaultValue={itemInput.name}
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <label
                    className={
                      'tw-font-bold pb-1' + (errors['name'] ? `p-error` : '')
                    }
                  >
                    Item name
                  </label>
                  <InputText
                    placeholder="Enter item name"
                    required
                    {...rest}
                    value={value}
                    onChange={onChange}
                    className={`${errors['name'] ? `p-invalid` : ''}`}
                  />
                  <small className="p-error mb-3">
                    {errors['name'] ? errors['name'].message : ''}
                  </small>
                </>
              )}
            />

            <Controller
              name="code"
              control={control}
              defaultValue={itemInput.code}
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <label
                    className={
                      'tw-font-bold pb-1' + (errors['code'] ? `p-error` : '')
                    }
                  >
                    Item Code
                  </label>
                  <InputText
                    placeholder="Enter item code"
                    required
                    {...rest}
                    value={value}
                    onChange={onChange}
                    className={`${errors['code'] ? `p-invalid` : ''}`}
                  />
                  <small className="p-error mb-3">
                    {errors['code'] ? errors['code'].message : ''}
                  </small>
                </>
              )}
            />

            <Controller
              name="head"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <label
                    className={
                      'tw-font-bold pb-1' + (errors['code'] ? `p-error` : '')
                    }
                  >
                    Item Head
                  </label>
                  <Dropdown
                    value={value}
                    optionLabel="value"
                    optionValue="id"
                    placeholder="Select an option"
                    options={heads}
                    onChange={onChange}
                    {...rest}
                    className={`${errors['head'] ? `p-invalid` : ''}`}
                  />
                  <small className="p-error mb-3">
                    {errors['head'] ? errors['head'].message : ''}
                  </small>
                </>
              )}
            />

            <Controller
              name="status"
              control={control}
              defaultValue={false}
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <div className="flex align-items-center">
                    <Checkbox {...rest} checked={value} onChange={onChange} />
                    <label className="ml-2">Is Active?</label>
                  </div>
                </>
              )}
            />
          </div>
          <div className="flex-button-container">
            <Button type="submit" label="Submit" />
            <Button
              type="button"
              label="Reset"
              severity="danger"
              className="tw-ml-4"
              onClick={() => reset(defaultItemInput)}
            />
          </div>
        </form>
      </Fieldset>
    </div>
  );
};

export default ItemForm;
