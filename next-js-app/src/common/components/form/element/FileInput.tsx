import { FormControl } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
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

export const FileInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <FormControl fullWidth>
      <MuiFileInput
        placeholder={props.placeholder}
        label={props.label}
        onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={controller.field.value}
        error={!!controller.fieldState.error}
        helperText={controller.fieldState.error?.message}
        fullWidth
      />
    </FormControl>
  );
};
