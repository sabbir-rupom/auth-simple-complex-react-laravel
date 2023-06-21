import { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { useFormContext } from 'react-hook-form';
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
}: RangePickerProps) => {
  const [dates, setDates] = useState<any>(null);

  const { setValue } = useFormContext();

  useEffect(() => {
    if (startValue && endValue) {
      setDates([new Date(String(startValue)), new Date(String(endValue))]);
    } else {
      setDates(null);
    }
    
  }, [startValue, endValue]);
  
  const prepareDateRange = (e: any) => {
    if(e.value && e.value[0] && e.value[1]) {
      const start: any = parseDateObject(e.value[0]);
      const end: any = parseDateObject(e.value[1]);
  
      setValue(startName, `${start.year}/${start.month}/${start.day}`);
      setValue(endName, `${end.year}/${end.month}/${end.day}`);
    }

    setDates(e.value);
  };

  return (
    <div className="w-full flex flex-col mb-3">
      <label className="font-bold pb-1">{label}</label>
      <Calendar
        value={dates}
        onChange={prepareDateRange}
        selectionMode="range"
        showIcon
      />
    </div>
  );
};

export default DateRangePicker;
