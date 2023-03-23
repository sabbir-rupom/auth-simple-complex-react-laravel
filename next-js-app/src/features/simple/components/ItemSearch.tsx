import { callApi } from '@/common/services/Axios';
import { itemActions } from '@/features/simple/store/item.slice';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ItemSearch = () => {
  const searchField = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSearch = () => {
    async function searchData(search: string) {
      let { data, message }: any = await callApi(
        `simple/items/?term=${search}`,
        'get'
      );

      if (data) {
        dispatch(itemActions.setItems(data));
      } else {
        alert(message);
      }
    }

    searchData(searchField.current ? searchField.current.value : '');
  };

  const items: any = useSelector<object[]>((state: any) => state.item.items);

  return (
    <div className="flex justify-between">
      <div className="mt-3">Showing All Units ({items.length})</div>
      <div>
        <input
          type="text"
          className="px-2 py-3 border md:w"
          ref={searchField}
          onKeyUp={handleSearch}
          placeholder="Search item ..."
        />
      </div>
    </div>
  );
};

export default ItemSearch;
