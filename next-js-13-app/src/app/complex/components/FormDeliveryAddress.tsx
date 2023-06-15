import { TextInput } from '@/components/form/element/TextInput';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const FormDeliveryAddress = ({ locations }: any) => {
  const [address, setAddress] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const { setValue } = useFormContext();

  useEffect(() => {
    setValue('customer_address', '');
  }, [locations]);

  const footerContent = (
    <div>
      <Button
        type="button"
        severity="danger"
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        type="button"
        label="OK"
        icon="pi pi-check"
        onClick={() => {
          setValue('customer_address', address);
          setVisible(false);
        }}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <div className="tw-flex">
        <div className="tw-grow">
          <TextInput
            name="customer_address"
            label="Delivery Address*"
            placeholder="Set address"
            readonly
          />
        </div>
        {locations.length > 0 && (
          <div className="tw-ml-2 tw-mt-7">
            <Button
              type="button"
              severity="secondary"
              onClick={() => setVisible(true)}
            >
              Select
            </Button>
          </div>
        )}
      </div>
      <Dialog
        header="Select Delivery Address"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        {locations &&
          locations.map((text: string, key: number) => (
            <div key={key} className="tw-flex tw-items-center tw-mb-3">
              <RadioButton
                name="radio_input"
                value={text}
                onChange={(e: any) => setAddress(e.value)}
                checked={address === text}
              />
              <label className="tw-ml-2">{text}</label>
            </div>
          ))}
      </Dialog>
    </>
  );
};

export default FormDeliveryAddress;
