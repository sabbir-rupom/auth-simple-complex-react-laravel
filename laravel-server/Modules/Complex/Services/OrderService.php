<?php

namespace Modules\Complex\Services;

use App\Libraries\FileUpload\FileUpload;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Modules\Complex\Entities\Order;
use Illuminate\Support\Str;
use Modules\Complex\Entities\OrderProduct;
use Modules\Complex\Entities\Product;

class OrderService
{
    function __construct(public $orderModel = new Order(), public array $errors = [])
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
     * Get order collection
     *
     * @return Collection
     */
    public function getOrders(int $paginationNumber = 5)
    {
        $url = url('/storage');
        return $this->orderModel->select([
            'buyers.name as buyer_name', 'customers.name as customer_name', 'order_date', 'delivery_date', 'order_number',
            DB::raw('sum(order_products.total_price) as total_amount'), 'users.name as created_by',
            DB::raw("(CASE WHEN (attachment is not null) THEN concat('$url/',attachment) ELSE null END) as attachment"), 'orders.id'
        ])
            ->join('customers', 'customers.id', '=', 'orders.customer_id')
            ->join('buyers', 'buyers.id', '=', 'orders.buyer_id')
            ->leftJoin('order_products', 'order_products.order_id', '=', 'orders.id')
            ->leftJoin('users', 'users.id', '=', 'orders.user_id')
            ->groupBy('orders.id')
            ->latest('orders.id')
            ->paginate($paginationNumber);
    }

    /**
     * Create or Update order request
     *
     * @param Request $request
     * @param Order|null $order
     * @return boolean
     * @throws HttpResponseException If order saving transaction failed
     */
    public function saveOrder(Request $request, Order $order = null): bool
    {
        if ($order && $order->id) {
            $this->orderModel = $order;
        }
        DB::beginTransaction();

        try {
            $this->orderModel->order_number = $request->order_number;
            $this->orderModel->buyer_id = $request->buyer;
            $this->orderModel->customer_id = $request->customer;
            $this->orderModel->customer_address = $request->customer_address;
            $this->orderModel->order_date = $request->order_date;
            $this->orderModel->delivery_date = $request->delivery_date;
            $this->orderModel->delivery_time = $request->delivery_time ?? '15:00';
            $this->orderModel->user_id = $request->user()->id;
            $this->orderModel->remark = $request->remark;

            if ($request->hasFile('attachment')) {
                $this->saveAttachment($request->attachment);
            }

            $this->orderModel->save();

            $this->saveOrderProducts(
                (is_string($request->order_products)
                    ? json_decode($request->order_products, true)
                    : $request->order_products),
                $this->orderModel
            );

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw new HttpResponseException(
                response()->json([
                    'error' => true,
                    'message' => $e->getMessage()
                ])
            );
        }

        return empty($this->errors);
    }

    /**
     * Save uploaded order attachment document
     *
     * @param UploadedFile $file
     * @return void
     * @throws HttpResponseException If order attachment upload failed
     */
    protected function saveAttachment(UploadedFile $file)
    {
        if ($this->orderModel->attachment) {
            FileUpload::remove($this->orderModel->attachment);
        }
        $fileUpload = FileUpload::instance()->upload($file);

        if (empty($fileUpload) || is_string($fileUpload)) {
            throw new HttpResponseException(
                response()->json([
                    'error' => true,
                    'message' => $fileUpload ? $fileUpload : 'Error! Failed to upload attachment'
                ], 400)
            );
        }

        $this->orderModel->attachment = $fileUpload['path'];
    }

    /**
     * Save order products
     *
     * @param array|null $orderProducts
     * @param Order $order
     * @return bool
     */
    protected function saveOrderProducts(array|null $orderProducts, Order $order)
    {
        if (empty($orderProducts)) {
            return false;
        }
        foreach ($orderProducts as $op) {
            $product = Product::find($op['product']);

            if ($product) {

                $orderProduct = null;
                if (isset($op['id']) && $op['id'] > 0) {
                    $orderProduct = OrderProduct::find($op['id']);
                }

                if (empty($orderProduct)) {
                    $orderProduct = new OrderProduct();
                } else {
                    $product->stock += $orderProduct->quantity;
                }

                if ($this->adjustProductStock($product, $op['quantity'])) {

                    $orderProduct->order_id = $order->id;
                    $orderProduct->product_id = $product->id;
                    $orderProduct->unit_id = $op['product_unit'];
                    $orderProduct->product_category_id = $op['product_category'];
                    $orderProduct->quantity = $op['quantity'];
                    $orderProduct->unit_price = $op['unit_price'];
                    $orderProduct->total_price = $op['unit_price'] * $op['quantity'];
                    $orderProduct->save();
                } else {
                    array_push($this->errors, 'Insufficient stock in product: ' . $product->name . '(stock-' . $product->stock . ')');
                }
            } else {
                array_push($this->errors, 'Product: ' . $product->name . ' is unavailable');
            }
        }

        return true;
    }

    /**
     * Update product stock if alright, otherwise return false
     *
     * @param Product $product
     * @param integer $quantity
     * @return bool
     */
    protected function adjustProductStock(Product $product, int $quantity): bool
    {

        if ($product->stock >= $quantity) {
            // Update product stock
            $product->stock -= $quantity;
            $product->save();
            return true;
        }

        // Insufficient product stock
        return false;
    }
}
