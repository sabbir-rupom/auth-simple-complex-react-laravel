import { callApi } from '@/common/services/Axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import itemDTO from '../shared/data';
import { itemActions } from '../store/item.slice';


const ItemTable = () => {
  const dispatch = useDispatch();
  const items: any = useSelector<itemDTO[]>((state: any) => state.item.items);

  const [tableData, setTableData] = useState<itemDTO[]>([]);

  console.log(items);

  useEffect(() => {
    setTableData(items);
  }, [items]);

  const handleEditForm = async (id:number) => {
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

  const handleDelete = async (id:number) => {
    let { message, result } = await callApi(`units/${id}`, 'delete');

    if (result) {
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
        {tableData && tableData.map((item: itemDTO) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.head}</td>
            <td>{item.code}</td>
            <td>{item.status}</td>
            <td>
              <button
                type="button"
                className="btn-sm-primary"
                onClick={(e) => handleEditForm(item.id)}
              >
                edit
              </button>
              <button
                type="button"
                className="btn-sm-danger"
                onClick={(e) => handleDelete(item.id)}
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
