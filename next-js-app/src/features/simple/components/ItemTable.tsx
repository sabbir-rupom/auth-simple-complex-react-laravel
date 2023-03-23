import { callApi } from '@/common/services/Axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { itemActions } from '@/features/simple/store/item.slice';
import itemDTO from '../shared/data';

const ItemTable = () => {
  const dispatch = useDispatch();
  const items: any = useSelector<object[]>((state: any) => state.item.items);

  const [tableData, setTableData] = useState<object[]>([]);

  useEffect(() => {
    setTableData(items);
  }, [items]);

  const handleEditForm = async (event, id) => {
    const { data, message }: any = await callApi(`simple/items/${id}`, 'get');

    if (data) {
      dispatch(
        itemActions.setForm({
          name: data.name,
          code: data.code,
          head: data.head,
          status: Boolean(data.status),
          id: data.id,
        })
      );
    } else {
      alert(message);
    }
  };

  const handleDelete = async (event, id) => {
    let { message, success } = await callApi(`units/${id}`, 'delete');

    if (success) {
      setTableData(tableData.filter((data) => data.id !== id));
    } else {
      alert(message);
    }
  };

  return (
    <table className="border-collapse table-style table-auto w-full text-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Head</th>
          <th>Code</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item: itemDTO) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.head}</td>
            <td>{item.code}</td>
            <td>{item.status}</td>
            <td>
              <button
                type="button"
                className="btn-sm-primary"
                onClick={(e) => handleEditForm(e, item.id)}
              >
                edit
              </button>
              <button
                type="button"
                className="btn-sm-danger"
                onClick={(e) => handleDelete(e, item.id)}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
