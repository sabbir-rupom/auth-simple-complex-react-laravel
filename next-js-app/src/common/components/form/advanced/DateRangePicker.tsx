import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const DateRangePicker = ({
  startDate = null,
  endDate = null,
  startName = 'start_date',
  endName = 'end_date',
  inputChangeHandler,
}: any) => {
  const [startDateInput, setStartDateInput] = useState(startDate);
  const [endDateInput, setEndDateInput] = useState(endDate);

  useEffect(() => {
    console.log(startDateInput);
    console.log(endDateInput);
  }, [startDateInput, endDateInput]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: -1, px: 1 },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label="Start Date"
            defaultValue={startDateInput ? dayjs(startDateInput) : null}
            onChange={(value) => setStartDateInput(value)}
          />
          <span className="p-3">-</span>
          <DatePicker
            label="End Date"
            defaultValue={endDateInput ? dayjs(endDateInput) : null}
            onChange={(value) => setEndDateInput(value)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangePicker;
