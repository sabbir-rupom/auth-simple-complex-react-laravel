import Fade from '@mui/material/Fade';
import Grow, { GrowProps } from '@mui/material/Grow';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

interface PropsType {
  open: boolean;
  type: string;
  message: string;
  animation: string;
}

export default function TransitionsSnackbar({
  type = 'success',
  message = 'Simple toast',
  animation = 'fade',
}: PropsType) {
  const [open, setOpen] = useState<boolean>(true);
  const [transition, setTransition] = useState<any>(Fade);

  const handleClose = () => {
    setOpen(false);
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
        onClose={handleClose}
        TransitionComponent={transition}
        message={message}
        key={animation}
      />
    </div>
  );
}
