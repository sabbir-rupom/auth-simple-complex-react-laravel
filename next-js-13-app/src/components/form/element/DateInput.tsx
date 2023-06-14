import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { InputProps } from './TextInput';

export const DateInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  const checkDateValue = (value: any) => {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value;
  };

  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-mb-3">
      <label
        className={
          'tw-font-bold pb-1' + (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
      </label>
      <Calendar
        value={controller.field.value}
        onChange={controller.field.onChange}
        dateFormat="yy-mm-dd"
        className={`${controller.fieldState.error ? `p-invalid` : ''}`}
        showIcon
        panelClassName="tw-w-2"
      />
      <small className="p-error mb-3">
        {controller.fieldState.error?.message ?? ''}
      </small>
    </div>
  );
};