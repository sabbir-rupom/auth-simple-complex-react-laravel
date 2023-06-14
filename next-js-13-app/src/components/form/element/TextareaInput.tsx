import { InputTextarea } from 'primereact/inputtextarea';
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
    <div className="tw-w-full tw-flex tw-flex-col tw-mb-3">
      <label
        className={
          'tw-font-bold pb-1' + (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
      </label>

      <InputTextarea
        ref={controller.field.ref}
        placeholder={props.placeholder}
        value={controller.field.value}
        onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        rows={5}
        className={`tw-w-full ${controller.fieldState.error ? `p-invalid` : ''}`}
      />
      <small className="p-error mb-3">
        {controller.fieldState.error?.message ?? ''}
      </small>
    </div>
  );
};