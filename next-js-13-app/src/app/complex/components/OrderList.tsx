'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import OrderApi from '../services/OrderApi';
import { FilterDTO, OrderSummaryDTO } from '../shared/data';
import { orderActions } from '@/redux/features/order.slice';
import { toastActions } from '@/redux/features/toast.slice';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const OrderList = () => {
  const [deleteOrder, setDeleteOrder] = useState<number>(0);
  const [orderData, setOrderData] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const openDelete = (id: number) => {
    setDeleteOrder(id);

    confirmDialog({
      message: 'Do you want to delete this order?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: handleDelete,
    });
  };

  useEffect(() => {
    async function fetchData() {
      let [orders, pagination] = await OrderApi.orders({});

      if (orders) {
        dispatch(orderActions.setOrders(orders));
        dispatch(orderActions.setOrderPagination(pagination));
      }
    }

    fetchData();
  }, []);

  const orders: OrderSummaryDTO[] = useAppSelector<OrderSummaryDTO[]>(
    (state: any) => state.order.orders,
  );

  useEffect(() => setOrderData(orders), [orders]);

  const pagination: any = useAppSelector<any>(
    (state: any) => state.order.orderPagination,
  );

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

  const filterParams: any = useAppSelector<FilterDTO>(
    (state: any) => state.order.filterParams,
  );

  /**
   * Process order delete operation
   */
  const handleDelete = async () => {
    if (deleteOrder > 0) {
      const [result, message] = await OrderApi.delete(deleteOrder);

      if (result) {
        dispatch(
          toastActions.showToast({
            type: 'success',
            summary: 'Delete Successful',
            message: String(message),
          }),
        );

        setOrderData(orders.filter((data: any) => data.id !== deleteOrder));
      } else {
        dispatch(
          toastActions.showToast({
            type: 'error',
            summary: 'Deletion Failed',
            message: String(message),
          }),
        );
      }
    }
  };

  const handlePageChange = async (event: PaginatorPageChangeEvent) => {
    const page = event.page + 1;

    let [orders, pagination] = await OrderApi.orders({
      ...filterParams,
      page: page,
      paginate_count: event.rows
    });


    if (orders) {
      dispatch(orderActions.setOrders(orders));
      dispatch(orderActions.setOrderPagination(pagination));
    }
    // if (pagination.meta.current_page !== page) {
    // }
  };

  const actionBodyTemplate = (order: any) => {
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
          onClick={(e) => handleEditForm(order.id)}
        />
        <Button
          type="button"
          aria-label="Delete"
          rounded
          severity="danger"
          icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-times'}
          onClick={(e) => openDelete(order.id)}
        />
      </div>
    );
  };

  const attachmentUrl = (order: any) => {
    return (
      <>
        {order.attachment ? (
          <Button
            type="button"
            severity="secondary"
            onClick={() => push(order.attachment)}
            label="Download"
          />
        ) : (
          'n/a'
        )}
      </>
    );
  };

  return (
    <>
      <DataTable value={orderData} tableStyle={{ width: '100%' }}>
        <Column field="order_number" header="Order Number"></Column>
        <Column field="customer_name" header="Customer"></Column>
        <Column field="buyer_name" header="Buyer"></Column>
        <Column field="order_date" header="Order Date"></Column>
        <Column field="delivery_date" header="Delivery Date"></Column>
        <Column field="total_amount" header="Total Price"></Column>
        <Column
          field="attachment"
          dataType="boolean"
          body={attachmentUrl}
          header="Attachment"
        ></Column>
        <Column
          align="center"
          field="action"
          header="Action"
          dataType="boolean"
          body={actionBodyTemplate}
        />
      </DataTable>

      {orders && (
        <Paginator
          first={pagination?.meta?.from ?? 0}
          rows={pagination?.meta?.per_page}
          totalRecords={pagination?.meta?.total}
          onPageChange={handlePageChange}
          // alwaysShow={false}
          rowsPerPageOptions={[5, 10, 20]}
        />
      )}

      <ConfirmDialog />
    </>
  );
};

export default OrderList;
