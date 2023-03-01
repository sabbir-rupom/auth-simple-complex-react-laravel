<?php

namespace Modules\Complex\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Complex\Entities\Customer;
use Modules\Complex\Entities\CustomerLocation;
use Modules\Complex\Http\Requests\CustomerSaveRequest;
use Modules\Complex\Transformers\CustomerResource;

class CustomerController extends Controller
{
    /**
     * Get list of customers
     *
     * @return Renderable
     */
    public function index()
    {
        $customers = Customer::with('locations')->get();

        return response()->json([
            'message' => $customers->count() <= 0 ? 'No customer available' : 'Customer list fetched successfully',
            'customers' => CustomerResource::collection($customers)
        ]);
    }

    /**
     * Store customer information
     *
     * @param Request $request
     * @return Renderable
     */
    public function store(CustomerSaveRequest $request)
    {
        $customer = Customer::create(['name' => $request->name]);

        $location = [];
        foreach ($request->location as $k => $address) {
            $location[] = [
                'customer_id' => $customer->id,
                'address' => $address
            ];
        }

        CustomerLocation::insert($location);

        return response()->json([
            'message' => 'Customer information added successfully',
            'customer' => $customer
        ]);
    }

    /**
     * Get customer information
     *
     * @param Customer $customer
     * @return Renderable
     */
    public function show(Customer $customer)
    {
        return response()->json([
            'message' => 'Customer information fetched successfully',
            'customer' => new CustomerResource($customer)
        ]);
    }

    /**
     * Update customer information
     *
     * @param CustomerSaveRequest $request
     * @param Customer $customer
     * @return Renderable
     */
    public function update(CustomerSaveRequest $request, Customer $customer)
    {
        $customer->name = $request->name;
        $customer->save();

        $customer->locations()->delete();

        $location = [];
        foreach ($request->location as $k => $address) {
            $location[] = [
                'customer_id' => $customer->id,
                'address' => $address
            ];
        }

        CustomerLocation::insert($location);

        return response()->json([
            'message' => 'Customer information added successfully',
            'customer' => new CustomerResource($customer)
        ]);
    }

    /**
     * Remove customer information
     *
     * @param int Customer $customer
     * @return Renderable
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json([
            'message' => 'Customer information deleted successfully',
        ]);
    }

    /**
     * Get customer address list
     *
     * @param int Customer $customer
     * @return Renderable
     */
    public function getAddress(Customer $customer) {
        return response()->json([
            'message' => 'Customer address list fetched successfully',
            'locations' => $customer->locations->pluck('address')
        ]);
    }
}
