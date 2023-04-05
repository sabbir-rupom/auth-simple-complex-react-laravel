import DialogBox from '@/common/components/ui/DialogBox';
import StyledTableCell from '@/common/components/ui/StyledTableCell';
import StyledTableRow from '@/common/components/ui/StyledTableRow';
import { useAppDispatch } from '@/common/redux/store';
import { toastActions } from '@/common/redux/toast.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import OrderApi from '../services/OrderApi';
import { OrderSummaryDTO } from '../shared/data';
import { orderActions } from '../store/order.slice';

const OrderList = ({ orders }: { orders: OrderSummaryDTO[] }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteOrder, setDeleteOrder] = useState<number>(0);

  const openDelete = (id: number) => {
    setOpenDialog(true);
    setDeleteOrder(id);
  };

  const dispatch = useAppDispatch();
  const { push } = useRouter();

  /**
   * Redirect to Edit page
   *
   * @param id Order ID
   */
  const handleEditForm = (id: number) => {
    push('/complex/order/' + id);
  };

  /**
   * Process order delete operation
   */
  const handleDelete = async () => {
    if (deleteOrder > 0) {
      setOpenDialog(false);
      const [result, message] = await OrderApi.delete(deleteOrder);

      if (result) {
        dispatch(
          toastActions.showToast({
            type: 'success',
            message: String(message),
          })
        );
      } else {
        toastActions.showToast({
          type: 'error',
          message: String(message),
        });
      }

      if (result) {
        let [orders, pagination] = await OrderApi.orders({});

        if (orders) {
          dispatch(orderActions.setOrders(orders));
          dispatch(orderActions.setOrderPagination(pagination));
        }
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table className="w-full" aria-label="Order Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Number</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Buyer</StyledTableCell>
              <StyledTableCell align="center">Order Date</StyledTableCell>
              <StyledTableCell align="center">Delivery Date</StyledTableCell>
              <StyledTableCell align="center">Total Price</StyledTableCell>
              <StyledTableCell align="center">Attachment</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((order: OrderSummaryDTO) => (
                <StyledTableRow key={order.id}>
                  <StyledTableCell component="th" scope="row">
                    {order.order_number}
                  </StyledTableCell>
                  <StyledTableCell>{order.customer_name}</StyledTableCell>
                  <StyledTableCell>{order.buyer_name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {order.order_date}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.delivery_date}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.total_amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.attachment ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        href={order.attachment}
                        target="_blank"
                      >
                        Download
                      </Button>
                    ) : (
                      'n/a'
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      type="button"
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }}
                      onClick={() => handleEditForm(order.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => openDelete(order.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogBox
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        dialogHandler={handleDelete}
        remove={true}
        title="Are you sure you want to delete this Order?"
      />
    </>
  );
};

export default OrderList;
