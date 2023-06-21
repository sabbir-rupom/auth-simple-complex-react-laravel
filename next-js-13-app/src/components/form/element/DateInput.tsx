import {
  UseControllerReturn,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { InputProps } from './TextInput';
import { parseDateObject } from '@/services/Utility';

export const DateInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  const checkInputDate = (value: any) => {
    if (value && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  };

  const prepareInputDate = (event: any) => {
    let value = event.value;

    if (value) {
      const { year, month, day }: any = parseDateObject(value);
      value = year + '-' + month + '-' + day;
    }
    controller.field.onChange(value);
  };

  return (
    <div className="w-full flex flex-col mb-3">
      <label
        className={
          'font-bold pb-1' + (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
      </label>
      <Calendar
        value={checkInputDate(controller.field.value)}
        onChange={prepareInputDate}
        dateFormat="yy-mm-dd"
        className={`${controller.fieldState.error ? `p-invalid` : ''}`}
        showIcon
      />
      <small className="p-error">
        {controller.fieldState.error?.message ?? ''}
      </small>
    </div>
  );
};
