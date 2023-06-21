import { FileUpload } from 'primereact/fileupload';

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
    <div className="w-full flex flex-col mb-3">
      <label
        className={
          'font-bold pb-1' + (controller.fieldState.error ? `p-error` : '')
        }
      >
        {props.label}
      </label>
      <FileUpload
        ref={controller.field.ref}
        mode="basic"
        onSelect={controller.field.onChange}
        name={controller.field.name}
        maxFileSize={1000000}
      />
    </div>
  );
};
{
  /* <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} /> */
}
// <FormControl fullWidth>
//   <MuiFileInput
//     placeholder={props.placeholder}
//     label={props.label}
//     onChange={controller.field.onChange}
//     onBlur={controller.field.onBlur}
//     name={controller.field.name}
//     value={controller.field.value}
//     error={!!controller.fieldState.error}
//     helperText={controller.fieldState.error?.message}
//     fullWidth
//   />
// </FormControl>
