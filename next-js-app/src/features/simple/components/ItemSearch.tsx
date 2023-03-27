import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ItemApi } from '../services/ItemApi';
import { itemActions } from '../store/item.slice';

const ItemSearch = () => {
  const searchField = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSearch = () => {
    async function searchData(search: string) {
      let items: any = await ItemApi.search(search);

      if (items) {
        dispatch(itemActions.setItemList(items));
      }
    }

    searchData(searchField.current ? searchField.current.value : '');
  };

  const items: any = useSelector<object[]>((state: any) => state.item.items);

  return (
    <div className="justify-between md:flex">
      <div className="mt-3 w-full md:w-1/2">
        Showing All Items ({items.length})
      </div>
      <div className="w-full md:w-1/2">
        <input
          type="text"
          className="px-2 py-3 border w-full mt-3 md:mt-0"
          ref={searchField}
          onKeyUp={handleSearch}
          placeholder="Search item ..."
        />
      </div>
    </div>
  );
};

export default ItemSearch;
