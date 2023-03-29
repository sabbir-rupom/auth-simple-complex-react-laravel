import DialogBox from '@/common/components/ui/DialogBox';
import StyledTableCell from '@/common/components/ui/StyledTableCell';
import StyledTableRow from '@/common/components/ui/StyledTableRow';
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
import { useState } from 'react';
import { OrderSummaryDTO } from '../shared/data';

const OrderList = ({ orders }: { orders: OrderSummaryDTO[] }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
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
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      type="button"
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
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
        dialogHandler={null}
        remove={true}
        title="Are you sure you want to delete this Item?"
      />
    </>
  );
};

export default OrderList;
