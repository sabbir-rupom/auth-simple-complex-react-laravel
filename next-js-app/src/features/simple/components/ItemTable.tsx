import { useAppDispatch, useAppSelector } from '@/common/redux/store';
import { useEffect, useState } from 'react';
import itemDTO from '../shared/data';
import { fetchHeads, fetchItems, itemActions } from '../store/item.slice';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ItemApi from '../services/ItemApi';
import StyledTableCell from './elements/StyledTableCell';
import StyledTableRow from './elements/StyledTableRow';

const ItemTable = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Trigger item list fetch API from Redux thunk
    dispatch(fetchItems());

    // Trigger item heads fetch API from Redux thunk
    dispatch(fetchHeads());
  }, [dispatch]);

  const [tableData, setTableData] = useState<itemDTO[]>([]);

  const items = useAppSelector((state) => state.item.items);

  useEffect(() => {
    console.log(items);
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

  const handleDelete = async (id: number) => {
    const result: boolean = await ItemApi.delete(id);

    if (result) {
      setTableData(tableData.filter((data) => data.id !== id));
    }
  };

  return (
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
                      onClick={(e) => handleDelete(item.id)}
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
    // <table className="border-collapse table-style table-auto w-full text-sm">
    //   <thead>
    //     <tr>
    //       <th>Name</th>
    //       <th>Head</th>
    //       <th>Code</th>
    //       <th>Active</th>
    //       <th>Action</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {tableData &&
    //       tableData.map((item: itemDTO) => (
    //         <tr key={item.id}>
    //           <td>{item.name}</td>
    //           <td>{item.head}</td>
    //           <td>{item.code}</td>
    //           <td>{item.status}</td>
    //           <td>
    //             <button
    //               type="button"
    //               className="btn-sm-primary"
    //               onClick={(e) => handleEditForm(item.id)}
    //             >
    //               edit
    //             </button>
    //             <button
    //               type="button"
    //               className="btn-sm-danger"
    //               onClick={(e) => handleDelete(item.id)}
    //             >
    //               delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //   </tbody>
    // </table>
  );
};

export default ItemTable;
