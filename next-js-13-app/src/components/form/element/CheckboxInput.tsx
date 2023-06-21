import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { InputProps } from './TextInput';
import { Checkbox } from 'primereact/checkbox';

export const CheckboxInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <div className="flex items-center mb-3">
      <Checkbox
        ref={controller.field.ref}
        name={controller.field.name}
        value={controller.field.value}
        checked={controller.field.value}
        onBlur={controller.field.onBlur}
        onChange={controller.field.onChange}
      />
      <label className="ml-2">{props.label}</label>
    </div>
  );
};