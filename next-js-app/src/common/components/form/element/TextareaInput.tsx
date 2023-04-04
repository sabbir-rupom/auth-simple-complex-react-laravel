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
  className?: string;
}

export const TextareaInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <FormControl fullWidth>
      <TextField
        multiline
        rows={2}
        // maxRows={4}
        defaultValue={controller.field.value}
        placeholder={props.placeholder}
        onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        ref={controller.field.ref}
        className={props.className}
        label={props.label}
        error={!!controller.fieldState.error}
        helperText={controller.fieldState.error?.message}
      />
    </FormControl>
  );
};
