import { useAppDispatch } from '@/common/redux/store';
import { toastActions } from '@/common/redux/toast.slice';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import Fade from '@mui/material/Fade';
import Grow, { GrowProps } from '@mui/material/Grow';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useEffect, useState } from 'react';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

interface PropsType {
  type: AlertColor;
  message: string;
  animation?: string;
  toastOpen: Function;
}

export default function ToastMessage({
  type = 'success',
  message = 'Simple toast',
  animation = 'fade',
  toastOpen,
}: PropsType) {
  const [open, setOpen] = useState<boolean>(true);
  const [transition, setTransition] = useState<any>(Fade);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    toastOpen(false);
    setOpen(false);

    dispatch(toastActions.hideToast());
  };

  useEffect(() => {
    if (animation === 'slide') {
      setTransition(SlideTransition);
    } else if (animation === 'grow') {
      setTransition(GrowTransition);
    } else {
      setTransition(Fade);
    }
  }, [animation]);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={transition}
        key={animation}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
