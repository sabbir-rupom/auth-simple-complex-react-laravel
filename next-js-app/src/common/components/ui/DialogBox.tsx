import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface PropsInterface {
  open: boolean;
  closeDialog: any;
  dialogHandler: any;
  message?: string;
  title?: string;
  remove?: boolean;
}

const DialogBox = ({
  open,
  closeDialog,
  dialogHandler,
  title = 'Are you sure?',
  message = '',
  remove = false,
}: PropsInterface) => {
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {message && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={dialogHandler} autoFocus color="error">
          {remove ? 'Delete' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
