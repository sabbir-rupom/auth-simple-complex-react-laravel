import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { InputProps } from './TextInput';

export interface SelectInputOption {
  value: string;
  title: string;
}

export interface SelectInputProps extends InputProps {
  options: SelectInputOption[];
}

export const SelectInput = (props: SelectInputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        variant="outlined"
        id={props.name}
        label={props.label}
        onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={controller.field.value}
        ref={controller.field.ref}
      >
        {!controller.field.value ? (
          <MenuItem value={0}>Please Select</MenuItem>
        ) : null}
        {props.options.map((option: SelectInputOption) => (
          <MenuItem key={option.value} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
