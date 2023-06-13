"use client"

import React, { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchHeads } from '@/redux/features/item.slice';

export default function TestPage() {
  const toast = useRef<any>(null);

  ////////////////////////////////////////////////////////////////
  const heads = useAppSelector((state) => state.item.heads);
  const getHeads = (items: any) => {
    let array = [];
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const tmp: any = items[i];
        array.push({
          name: tmp.value,
          code: tmp.id,
        });
      }
    }

    return array;
  };
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    
    // Trigger item heads fetch API from Redux thunk
    dispatch(fetchHeads());
  }, [dispatch]);
  ////////////////////////////////////////////////////////////////
  
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  const show = (data: any) => {
    toast.current.show({
      severity: 'success',
      summary: 'Form Submitted',
      detail: `${data.city.name}`,
    });
  };

  const defaultValues = {
    city: '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data: any) => {
    data.city && show(data);

    reset();
  };

  const getFormErrorMessage = (name: any) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column align-items-center gap-2"
      >
        <Toast ref={toast} />
        <Controller
          name="city"
          control={control}
          rules={{ required: 'City is required.' }}
          render={({ field, fieldState }) => (
            <Dropdown
              id={field.name}
              value={field.value}
              optionLabel="name"
              placeholder="Select a City"
              options={getHeads(heads)}
              focusInputRef={field.ref}
              onChange={(e) => field.onChange(e.value)}
              className={classNames({ 'p-invalid': fieldState.error })}
            />
          )}
        />
        {getFormErrorMessage('city')}
        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
}
