import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import { useEffect, useState } from 'react';
import itemDTO from '../shared/data';
import { fetchHeads, fetchItems, itemActions } from '../store/item.slice';

import DialogBox from '@/common/components/ui/DialogBox';
import StyledTableCell from '@/common/components/ui/StyledTableCell';
import StyledTableRow from '@/common/components/ui/StyledTableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ItemApi from '../services/ItemApi';
import simpleReportCSV from '../services/ReportExcel';
import simpleReportPdf from '../services/ReportPdf';

const ItemTable = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Trigger item list fetch API from Redux thunk
    dispatch(fetchItems());

    // Trigger item heads fetch API from Redux thunk
    dispatch(fetchHeads());
  }, [dispatch]);

  const [tableData, setTableData] = useState<itemDTO[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<number>(0);

  const items = useAppSelector((state) => state.item.items);

  useEffect(() => {
    setTableData(items);
  }, [items]);

  const heads = useAppSelector((state) => state.item.heads);
  const getHead = (id: number) => {
    let head: any = heads.filter((obj: any) => {
      return obj.id === id;
    });

    return head[0] ? head[0].value : '';
  };

  const handleEditForm = async (id: number) => {
    const item: any = await ItemApi.get(id);

    if (item) {
      dispatch(
        itemActions.setItemForm({
          name: item.name,
          code: item.code,
          head: item.head,
          status: Boolean(item.status),
          id: item.id,
        })
      );
    }
  };

  const openDelete = (id: number) => {
    setOpenDialog(true);
    setDeleteItem(id);
  };

  const handleDelete = async () => {
    if (deleteItem > 0) {
      setOpenDialog(false);
      const result: boolean = await ItemApi.delete(deleteItem);

      if (result) {
        setTableData(tableData.filter((data) => data.id !== deleteItem));
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell align="center">Head</StyledTableCell>
              <StyledTableCell align="center">Code</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((item: itemDTO) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {getHead(item.head)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.code}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.status ? (
                      <small className="bg-green-500 p-2 rounded-2xl text-white">
                        Active
                      </small>
                    ) : (
                      <small className="bg-red-500 p-2 rounded-2xl text-white">
                        In-active
                      </small>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div>
                      <Button
                        type="button"
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{ mr: 1 }}
                        onClick={(e) => handleEditForm(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={(e) => openDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="right"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Button
          type="button"
          color="secondary"
          variant="outlined"
          onClick={() => {
            simpleReportCSV(tableData, getHead);
          }}
          sx={{ mr: 2 }}
        >
          Generate Excel
        </Button>
        <Button
          type="button"
          color="primary"
          variant="outlined"
          onClick={() => {
            simpleReportPdf(tableData, getHead);
          }}
        >
          Generate PDF
        </Button>
      </Box>

      <DialogBox
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        dialogHandler={handleDelete}
        remove={true}
        title="Are you sure you want to delete this Item?"
      />
    </>
  );
};

export default ItemTable;
