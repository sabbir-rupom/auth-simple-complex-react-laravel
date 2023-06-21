import { InputText } from 'primereact/inputtext';
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
  onStateChange?: Function;
}

export const TextInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <div className="w-full flex flex-col mb-3">
      <label
        className={
          'font-bold pb-1' + (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
      </label>
      <InputText
        placeholder={props.placeholder}
        type={props.type ?? 'text'}
        onChange={(e) => {
          if (props.onStateChange) {
            props.onStateChange(e.target.value);
          }
          controller.field.onChange(e);
        }}
        // onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={controller.field.value}
        ref={controller.field.ref}
        className={`${controller.fieldState.error ? `p-invalid` : ''}`}
        readOnly={props.readonly}
      />
      <small className="p-error">
        {controller.fieldState.error?.message ?? ''}
      </small>
    </div>
  );
};