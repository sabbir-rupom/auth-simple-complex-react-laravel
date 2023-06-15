'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { fetchItems, itemActions } from '@/redux/features/item.slice';

import ItemApi from '../services/ItemApi';
import simpleReportCSV from '../services/ReportExcel';
import simpleReportPdf from '../services/ReportPdf';
import { Button } from 'primereact/button';
import { toastActions } from '@/redux/features/toast.slice';

type Props = { heads: object[] };

const ItemTable = ({ heads }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Trigger item list fetch API from Redux thunk
    dispatch(fetchItems());
  }, [dispatch]);

  const [itemArray, setItemArray] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<number>(0);

  const items = useAppSelector((state) => state.item.items);

  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      tempArray.push({
        id: item.id,
        name: item.name,
        head: getHead(item.head),
        code: item.code,
        status: item.status ? (
          <small className="tw-bg-green-500 p-2 tw-rounded-2xl tw-text-white tw-inline-block">
            Active
          </small>
        ) : (
          <small className="tw-bg-red-500 p-2 tw-rounded-2xl tw-text-white tw-inline-block">
            In-active
          </small>
        ),
        action: true,
      });
    }
    setItemArray(tempArray);
  }, [items]);

  const getHead = (id: number) => {
    let head: any = heads.filter((obj: any) => {
      return obj.id === id;
    });

    return head[0] ? head[0].value : '';
  };

  const handleEditForm = async (id: number) => {
    const item: any = await ItemApi.get(id);

    if (item && !isLoading) {
      dispatch(
        itemActions.setItemForm({
          name: item.name,
          code: item.code,
          head: item.head,
          status: Boolean(item.status),
          id: item.id,
        }),
      );
    }
  };

  const openDelete = (id: number) => {
    setDeleteItem(id);

    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: handleDelete,
    });
  };

  const handleDelete = async () => {
    if (deleteItem > 0) {
      setLoading(false);
      const result: boolean = await ItemApi.delete(deleteItem);

      if (result) {
        dispatch(
          toastActions.showToast({
            type: 'success',
            summary: 'Successful',
            message: 'Item has been deleted',
          }),
        );

        setItemArray(itemArray.filter((data: any) => data.id !== deleteItem));
        setLoading(false);
      }
    }
  };

  const actionBodyTemplate = (item: any) => {
    return (
      <div className="action-button-container">
        <Button
          type="button"
          severity="info"
          icon="pi pi-pencil"
          rounded
          aria-label="Edit"
          style={{
            marginRight: '10px',
          }}
          onClick={(e) => handleEditForm(item.id)}
        />
        <Button
          type="button"
          aria-label="Delete"
          rounded
          severity="danger"
          icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-times'}
          onClick={(e) => openDelete(item.id)}
        />
      </div>
    );
  };

  return (
    <>
      <DataTable
        value={itemArray}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column
          field="name"
          header="Item Name"
          style={{ width: '30%' }}
        ></Column>
        <Column field="head" header="Head" style={{ width: '15%' }}></Column>
        <Column field="code" header="Code" style={{ width: '20%' }}></Column>
        <Column
          field="status"
          header="Status"
          style={{ width: '15%' }}
        ></Column>
        <Column
          align="center"
          field="action"
          header="Action"
          dataType="boolean"
          style={{ width: '20%' }}
          body={actionBodyTemplate}
        />
      </DataTable>

      {itemArray.length > 0 && (
        <div className="flex-button-container">
          <Button
            type="button"
            severity="secondary"
            label="Generate Excel"
            onClick={() => {
              simpleReportCSV(items, getHead);
            }}
          />
          <Button
            type="button"
            severity="help"
            label="Generate PDF"
            onClick={() => {
              simpleReportPdf(items, getHead);
            }}
          />
        </div>
      )}

      <ConfirmDialog />
    </>
  );
};

export default ItemTable;
