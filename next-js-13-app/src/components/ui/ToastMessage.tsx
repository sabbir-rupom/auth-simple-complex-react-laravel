import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Toast } from 'primereact/toast';
import { toastActions } from '@/redux/features/toast.slice';

export default function ToastMessage() {
  const toastType = useAppSelector((state: any) => state.toast.type);
  const toastMessage = useAppSelector((state: any) => state.toast.message);
  const toastTitle = useAppSelector((state: any) => state.toast.summary);

  const [toastOpen, setToastOpen] = useState(false);
  const toast = useRef<any>(null);

  useEffect(() => {
    if (toastType && toastMessage.length > 0) {
      setToastOpen(true);
    }
  }, [toastType, toastMessage]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toastOpen) {
      toast.current.show({
        severity: toastType,
        summary: toastTitle,
        detail: toastMessage,
        life: 3000,
      });
      setToastOpen(false);

      dispatch(
        toastActions.showToast({
          type: 'info',
          message: '',
          summary: '',
        }),
      );
    }
  }, [toastOpen]);

  return (
    <div>
      <Toast ref={toast} position="bottom-left" />
    </div>
  );
}
