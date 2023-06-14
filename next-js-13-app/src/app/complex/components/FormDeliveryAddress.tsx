import { TextInput } from '@/common/components/form/element/TextInput';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const FormDeliveryAddress = ({ locations }: any) => {
  const [address, setAddress] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const { setValue } = useFormContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setValue('customer_address', '');
  }, [locations]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} md={10}>
          <FormControl fullWidth className="mb-0 lg:mb-3">
            <TextInput
              name="customer_address"
              label="Delivery Address*"
              placeholder="Set address"
              readonly
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <div className="text-center">
            <Button
              className="bg-blue-500 hover:bg-blue-300 text-white w-full p-2 lg:p-4"
              onClick={handleClickOpen}
            >
              Select
            </Button>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{'Select Delivery Address'}</DialogTitle>
        <DialogContent>
          <RadioGroup
            defaultValue="female"
            name="controlled-radio-buttons-group"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ my: 1 }}
          >
            {locations &&
              locations.map((text: string, index: any) => (
                <FormControl
                  key={index}
                  sx={{ p: 2, flexDirection: 'row', gap: 2 }}
                >
                  <Radio
                    value={text}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <FormLabel className="mt-2">{text}</FormLabel>
                </FormControl>
              ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setValue('customer_address', address);
              handleClose();
            }}
            autoFocus
            variant="outlined"
            className="mr-3 mb-3"
          >
            Select Address
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDeliveryAddress;
