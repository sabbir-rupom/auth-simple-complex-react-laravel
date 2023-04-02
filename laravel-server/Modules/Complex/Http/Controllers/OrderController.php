<?php

namespace Modules\Complex\Http\Controllers;

use App\Libraries\FileUpload\FileUpload;
use App\Traits\ResponseJSON;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Complex\Entities\Order;
use Modules\Complex\Entities\OrderProduct;
use Modules\Complex\Http\Requests\OrderStoreRequest;
use Modules\Complex\Http\Requests\OrderUpdateRequest;
use Modules\Complex\Services\OrderService;
use Modules\Complex\Transformers\Order\OrderPaginationResource;
use Modules\Complex\Transformers\Order\OrderResource;

class OrderController extends Controller
{
    use ResponseJSON;

    /**
     * Get order list
     *
     * @param Request $request
     * @return Responsable
     */
    public function index(Request $request)
    {
        $orders = (new OrderService())->filter($request)->getOrders($request->paginate_count ?? 5);

        $resultData = OrderPaginationResource::collection($orders)->response()->getData();
        $resultData->message = 'Order data is fetched successfully';
        $resultData->result = true;

        return response()->json($resultData);
    }

    /**
     * Store new order request
     *
     * @param OrderStoreRequest $request
     * @return Responsable
     */
    public function store(OrderStoreRequest $request)
    {

        $orderService = new OrderService();
        if ($orderService->saveOrder($request)) {
            return response()->json([
                'result' => true,
                'message' => 'Order has been created successfully',
                'data' => new OrderResource($orderService->orderModel)
            ]);
        }

        return $this->setErrors($orderService->errors)->response([], 400);
    }

    /**
     * Get specific order information
     *
     * @param Order $order
     * @return Responsable
     */
    public function show(Order $order)
    {
        return $this->success()
            ->message('Product list fetched successful')
            ->response(new OrderResource($order));
    }


    /**
     * Update the specified order
     *
     * @param OrderUpdateRequest $request
     * @param Order $order
     * @return Responsable
     * @throws HttpResponseException If order saving process fails
     */
    public function update(OrderUpdateRequest $request, Order $order)
    {

        $orderService = new OrderService();
        if ($orderService->saveOrder($request, $order)) {
            return $this->success()
                ->message('Order has been updated successfully')
                ->response(new OrderResource($orderService->orderModel));
        }

        throw new HttpResponseException(
            response()->json([
                'result' => false,
                'message' => 'Failed to update order: ' . $orderService->errors[0] ?? 'error'
            ], 400)
        );
    }

    /**
     * Remove the specified order
     *
     * @param Order $order
     * @return Responsable
     */
    public function destroy(Order $order)
    {
        $order->orderProducts()->delete();
        FileUpload::remove($order->attachment);
        $order->delete();

        return $this->success()->message('Order information deleted successfully')->response();
    }


    /**
     * Remove an order product
     *
     * @param OrderProduct $orderProduct
     * @return Responsable
     */
    public function removeOrderProduct(OrderProduct $orderProduct)
    {
        $orderProduct->delete();

        return $this->success()->message('Order product has been removed')->response();
    }
}
