import { FormControl, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

interface OptionProps {
  id: number | string;
  text: string;
}

const SelectOption = ({
  control,
  options,
  inputName,
  value = null,
  initialLabel = false,
  initialValue = 0,
}: any) => {
  console.clear();
  console.log(options);
  return (
    <>
      <FormControl fullWidth>
        <Controller
          control={control}
          name={inputName}
          defaultValue={value}
          render={({ field }) => (
            <Select {...field}>
              {initialLabel && (
                <MenuItem value={initialValue}>
                  <em>{initialLabel}</em>
                </MenuItem>
              )}

              {options &&
                options.map((option: OptionProps) => {
                  <MenuItem value={option.id}>{option.text}</MenuItem>;
                })}
            </Select>
          )}
        />
      </FormControl>
    </>
  );
};

export default SelectOption;
