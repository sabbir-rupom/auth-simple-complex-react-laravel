'use client';

import { AlertColor } from '@/config/constants';
import { useAppDispatch } from '@/redux/hook';
import { toastActions } from '@/redux/features/toast.slice';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

export default function Home() {
  const dispatch = useAppDispatch();
  const handleToast = () => {
    dispatch(
      toastActions.showToast({
        type: 'info',
        summary: 'Message',
        message: 'This is a Toast Message',
      }),
    );
  };


  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  return (
    <section className='page-content'>
      <h2 style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Welcome</h2>

      <h4 style={{ textAlign: 'center' }}>
        (Auth + Simple + Complex) practice project
      </h4>

      <div className="p-5 text-center">
        <Button severity='help' type="button" label="Show Toast" onClick={handleToast} />
      </div>

      <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" />
        </div>
    </section>
  );
}
