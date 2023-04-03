import { FormControl, TextField } from '@mui/material';
import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';

export interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  readonly?: boolean;
}

export const TextInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <FormControl fullWidth>
      <TextField
        type={props.type ?? 'text'}
        variant="outlined"
        placeholder={props.placeholder}
        label={props.label}
        onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={controller.field.value}
        ref={controller.field.ref}
        error={!!controller.fieldState.error}
        helperText={controller.fieldState.error?.message}
        InputProps={{
          readOnly: props.readonly ?? false,
        }}
      />
    </FormControl>
  );
};
