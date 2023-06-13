'use client';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemApi from '../services/ItemApi';
import { itemActions } from '@/redux/features/item.slice';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';

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
    <div className="justify-between md:flex tw-mb-3">
      <div className="mt-3 w-full md:w-1/2">
        Showing All Items ({items.length})
      </div>
      <div className="w-full md:w-1/2">
        <InputText
          ref={searchField}
          onKeyUp={handleSearch}
          placeholder="Search item ..."
          className='tw-w-full'
        />
      </div>
    </div>
  );
};

export default ItemSearch;
