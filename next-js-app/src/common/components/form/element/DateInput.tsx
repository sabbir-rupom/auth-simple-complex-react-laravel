import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
  useController,
  UseControllerReturn,
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
        className={`w-full ${
          controller.fieldState.error ? `border-red-500` : ``
        }`}
        // renderInput={(params: any) => (
        //   <FormControl fullWidth>
        //     <TextField
        //       {...params}
        //       error={!!controller.fieldState.error}
        //       helperText={controller.fieldState.error?.message}
        //     />
        //   </FormControl>
        // )}
      />
    </LocalizationProvider>
  );
};
