import { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Controller, useFormContext } from 'react-hook-form';
import { parseDateObject } from '@/services/Utility';

interface RangePickerProps {
  startValue?: null | string;
  endValue?: null | string;
  startName: string;
  endName: string;
  control: any;
  label?: null | string;
}

const DateRangePicker = ({
  startValue = null,
  endValue = null,
  label = 'Date Range',
  startName = 'start_date',
  endName = 'end_date',
  control,
}: RangePickerProps) => {
  const [dates, setDates] = useState<any>(null);

  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (startValue && endValue) {
      setDates([new Date(String(startValue)), new Date(String(endValue))]);
    } else {
      setDates(null);
    }
    
  }, [startValue, endValue]);
  
  // const formValue = getValues(startName)
  
  // useEffect(() => {
  //   if(startValue !== formValue && formValue == null) {
  //     setDates(null);
  //   }
  // },[formValue]);

  const prepareDateRange = (e: any) => {
    if(e.value && e.value[0] && e.value[1]) {
      const start: any = parseDateObject(e.value[0]);
      const end: any = parseDateObject(e.value[1]);
  
      setValue(startName, `${start.year}/${start.month}/${start.day}`);
      setValue(endName, `${end.year}/${end.month}/${end.day}`);
    }

    setDates(e.value);
  };

  // console.clear()
  // console.log(inputDateRange)

  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-mb-3">
      <label className="tw-font-bold pb-1">{label}</label>
      <Calendar
        value={dates}
        onChange={prepareDateRange}
        selectionMode="range"
      />
    </div>
  );
};

export default DateRangePicker;
