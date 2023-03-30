<?php

namespace Modules\Complex\Http\Controllers;

use App\Traits\ResponseJSON;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Complex\Entities\Customer;
use Modules\Complex\Entities\CustomerLocation;
use Modules\Complex\Http\Requests\CustomerSaveRequest;
use Modules\Complex\Transformers\CustomerResource;

class CustomerController extends Controller
{
    use ResponseJSON;

    /**
     * Get list of customers
     *
     * @return Responsable
     */
    public function index()
    {
        $customers = Customer::with('locations')->get();

        return $this->success()
            ->message($customers->count() <= 0 ? 'No customer available' : 'Customer list fetched successfully')
            ->response(CustomerResource::collection($customers));
    }

    /**
     * Store customer information
     *
     * @param Request $request
     * @return Responsable
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

        return $this->success()
            ->message('Customer information added successfully')
            ->response(new CustomerResource($customer));
    }

    /**
     * Get customer information
     *
     * @param Customer $customer
     * @return Responsable
     */
    public function show(Customer $customer)
    {
        return $this->success()
            ->message('Customer information fetched successfully')
            ->response(new CustomerResource($customer));
    }

    /**
     * Update customer information
     *
     * @param CustomerSaveRequest $request
     * @param Customer $customer
     * @return Responsable
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

        return $this->success()
            ->message('Customer information added successfully')
            ->response(new CustomerResource($customer));
    }

    /**
     * Remove customer information
     *
     * @param int Customer $customer
     * @return Responsable
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return $this->success()->message('Customer information deleted successfully')->response();
    }

    /**
     * Get customer address list
     *
     * @param int Customer $customer
     * @return Responsable
     */
    public function getAddress(Customer $customer)
    {
        $this->success()
            ->message('Customer address list fetched successfully')
            ->response($customer->locations->pluck('address'));
    }
}
