<?php

namespace Modules\Complex\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Complex\Entities\OrderProduct;
use Modules\Complex\Services\OrderService;

class OrderController extends Controller
{

    /**
     * Get order list
     *
     * @param Request $request
     * @return Renderable
     */
    public function index(Request $request)
    {
        $orders = (new OrderService())->filter($request)->getOrders(3);

        return response()->json([
            'message' => 'Order list fetched successful',
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('complex::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('complex::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('complex::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param OrderProduct $orderProduct
     * @return Renderable
     */
    public function removeOrderProduct(OrderProduct $orderProduct)
    {
        $orderProduct->delete();

        return response()->json([
            'message' => 'Order product has been removed',
        ]);
    }
}
