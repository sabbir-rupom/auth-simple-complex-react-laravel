import { FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { InputProps } from './TextInput';

export const DateInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  const checkDateValue = (value: any) => {
    if (typeof value === 'string') {
      return dayjs(new Date(value));
    }
    return value;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        value={checkDateValue(controller.field.value)}
        onChange={controller.field.onChange}
        className="w-full"
      />
      {controller.fieldState.error ? (
        <>
          <FormHelperText className="text-red-500 text-xs">
            {controller.fieldState.error.message}
          </FormHelperText>
        </>
      ) : null}
    </LocalizationProvider>
  );
};
