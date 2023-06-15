import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { InputProps } from './TextInput';
import { Dropdown } from 'primereact/dropdown';

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
    <div className="tw-w-full tw-flex tw-flex-col tw-mb-3">
      <label
        className={
          'tw-font-bold pb-1' + (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
      </label>
      <Dropdown
        onChange={(e) => {
          if (props.onStateChange) {
            props.onStateChange(e.target.value);
          }
          controller.field.onChange(e);
        }}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={controller.field.value}
        ref={controller.field.ref}
        optionLabel="title"
        optionValue="value"
        placeholder="Select an option"
        options={props.options}
        className={`${controller.fieldState.error ? `p-invalid` : ''}`}
      />
      <small className="p-error">
        {controller.fieldState.error?.message ?? ''}
      </small>
    </div>
  );
};
