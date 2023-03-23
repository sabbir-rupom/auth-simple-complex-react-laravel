<?php

namespace Modules\Complex\Http\Controllers;

use App\Libraries\FileUpload\FileUpload;
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

    /**
     * Get order list
     *
     * @param Request $request
     * @return Responsable
     */
    public function index(Request $request)
    {
        $orders = (new OrderService())->filter($request)->getOrders($request->paginate_count ?? 3);

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

        return response()->json([
            'message' => $orderService->errors[0],
            'result' => false
        ], 400);
    }

    /**
     * Get specific order information
     *
     * @param Order $order
     * @return Responsable
     */
    public function show(Order $order)
    {
        return response()->json([
            'result' => true,
            'message' => 'Product list fetched successful',
            'data' => new OrderResource($order)
        ]);
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
            return response()->json([
                'result' => true,
                'message' => 'Order has been updated successfully',
                'data' => new OrderResource($orderService->orderModel)
            ]);
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

        return response()->json([
            'result' => true,
            'message' => 'Order information deleted successfully',
        ]);
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

        return response()->json([
            'result' => true,
            'message' => 'Order product has been removed',
        ]);
    }
}
