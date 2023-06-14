import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

interface RangePickerProps {
  startValue?: null | string;
  endValue?: null | string;
  startName: string;
  endName: string;
  control: any;
}

const DateRangePicker = ({
  startValue = null,
  endValue = null,
  startName = 'start_date',
  endName = 'end_date',
  control,
}: RangePickerProps) => {
  const [startDateInput, setStartDateInput] = useState<any>(null);
  const [endDateInput, setEndDateInput] = useState<any>(null);

  useEffect(() => {
    if (startDateInput && endDateInput && startDateInput > endDateInput) {
      console.log('do date range validation');
    }
  }, [startDateInput, endDateInput]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { px: 0 },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container className="flex">
          <Controller
            control={control}
            name={startName}
            defaultValue={startValue}
            render={({ field: { onChange, value, ...rest } }) => (
              <DatePicker
                className="flex-grow"
                label="Start Date"
                {...rest}
                onChange={(e: any) => {
                  let dt = new Date(e);
                  dt.setDate(dt.getDate() + 1);
                  let [year, month, day] = dt
                    .toISOString()
                    .substring(0, 10)
                    .split('-')
                    .map((x) => parseInt(x, 10));
                  let newDate = `${year}-${month}-${day}`;
                  setStartDateInput(new Date(newDate));
                  onChange(newDate);
                }}
              />
            )}
          />
          <div className="p-3">-</div>
          <Controller
            control={control}
            name={endName}
            defaultValue={endValue}
            render={({ field: { onChange, value, ...rest } }) => (
              <DatePicker
                className="flex-grow"
                label="End Date"
                {...rest}
                onChange={(e: any) => {
                  let dt = new Date(e);
                  dt.setDate(dt.getDate() + 1);
                  let [year, month, day] = dt
                    .toISOString()
                    .substring(0, 10)
                    .split('-')
                    .map((x) => parseInt(x, 10));
                  let newDate = `${year}-${month}-${day}`;
                  setEndDateInput(new Date(newDate));
                  onChange(newDate);
                }}
              />
            )}
          />
        </Container>
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangePicker;
