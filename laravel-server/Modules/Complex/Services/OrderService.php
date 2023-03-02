<?php

namespace Modules\Complex\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Complex\Entities\Order;

class OrderService
{
    function __construct(public $orderModel = new Order())
    {
    }

    /**
     * Prepare filter parameter for order collection
     *
     * @param Request $request
     * @return self
     */
    public function filter(Request $request)
    {

        if ($request->customer && $request->customer > 0) {
            $this->orderModel = $this->orderModel->where('orders.customer_id', $request->customer);
        }
        if ($request->buyer && $request->buyer > 0) {
            $this->orderModel = $this->orderModel->where('orders.buyer_id', $request->buyer);
        }

        if ($request->order_number) {
            $this->orderModel = $this->orderModel->where('orders.order_number', 'like', "%{$request->order_number}%");
        }

        if ($request->start_date) {
            $this->orderModel = $this->orderModel->where('orders.order_date', '>=', $request->start_date);
        }

        if ($request->end_date) {
            $this->orderModel = $this->orderModel->where('orders.order_date', '<=', $request->end_date);
        }

        return $this;
    }

    /**
     * Get order colletion
     *
     * @return Collection
     */
    public function getOrders(int $paginationNumber = 5)
    {
        return $this->orderModel->select([
            'buyers.name as buyer_name', 'customers.name as customer_name', 'order_date', 'delivery_date', 'order_number',
            DB::raw('sum(order_products.total_price) as total_amount'), 'users.name as created_by', 'attachment',
            'orders.id'
        ])
            ->join('customers', 'customers.id', '=', 'orders.customer_id')
            ->join('buyers', 'buyers.id', '=', 'orders.buyer_id')
            ->leftJoin('order_products', 'order_products.order_id', '=', 'orders.id')
            ->leftJoin('users', 'users.id', '=', 'orders.user_id')
            ->groupBy('orders.id')
            ->latest('orders.id')
            ->paginate($paginationNumber);
    }
}
